from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from .models import User, Thread, Message
from .database import DatabaseClient
from .chorus_cycle import ChorusCycle
from typing import Dict, Any
from .config import Config
import json
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        config = Config()
        self.db_client = DatabaseClient(config)
        self.chorus_cycle = ChorusCycle(self.db_client)

    async def connect(self, client_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[client_id] = websocket
        logger.info(f"Client {client_id} connected")

    def disconnect(self, client_id: str):
        del self.active_connections[client_id]
        logger.info(f"Client {client_id} disconnected")

    async def send_personal_message(self, message: Dict[str, Any], client_id: str):
        if client_id in self.active_connections:
            await self.active_connections[client_id].send_json(message)
        else:
            logger.warning(f"Attempted to send message to non-existent client {client_id}")

    async def process_message(self, data: Dict[str, Any], client_id: str):
        try:
            message_type = data.get('type')
            payload = data.get('payload', {})

            if message_type == 'connect':
                return await self.handle_connect(payload, client_id)
            elif message_type == 'get_thread':
                return await self.handle_get_thread(payload)
            elif message_type == 'send_message':
                return await self.handle_send_message(payload, client_id)
            elif message_type == 'create_thread':
                return await self.handle_create_thread(payload)
            else:
                logger.warning(f"Unknown message type received: {message_type}")
                return {'type': 'error', 'payload': {'message': 'Unknown message type'}}
        except Exception as e:
            logger.error(f"Error processing message: {e}")
            return {'type': 'error', 'payload': {'message': str(e)}}

    async def handle_connect(self, payload: Dict[str, Any], client_id: str):
        try:
            user = await self.db_client.get_user(payload['public_key'])
            if not user:
                user = await self.db_client.create_user(payload['public_key'])
            threads = await self.db_client.get_threads(user.id)
            logger.info(f"User {user.id} connected")
            return {'type': 'init', 'payload': {'user': user.dict(), 'threads': [t.dict() for t in threads]}}
        except Exception as e:
            logger.error(f"Error handling connect for client {client_id}: {e}")
            return {'type': 'error', 'payload': {'message': 'Failed to initialize user session'}}

    async def handle_get_thread(self, payload: Dict[str, Any]):
        try:
            thread = await self.db_client.get_thread(payload['thread_id'])
            messages = await self.db_client.get_messages(payload['thread_id'])
            return {'type': 'thread_messages', 'payload': {'thread': thread.dict(), 'messages': [m.dict() for m in messages]}}
        except Exception as e:
            logger.error(f"Error getting thread {payload['thread_id']}: {e}")
            return {'type': 'error', 'payload': {'message': 'Failed to retrieve thread'}}

    async def handle_send_message(self, payload: Dict[str, Any], client_id: str):
        try:
            thread = await self.db_client.get_thread(payload['thread_id'])
            message = Message(
                id=self.db_client.generate_unique_id(),
                content=payload['content'],
                author=payload['author'],
                thread_id=payload['thread_id'],
                created_at=datetime.utcnow().isoformat()
            )
            await self.db_client.store_message(message)

            for step in self.chorus_cycle.steps:
                step_result = await self.chorus_cycle.process_step(message, thread)
                await self.send_personal_message({'type': 'chorus_response', 'payload': step_result}, client_id)

            return {'type': 'message_sent', 'payload': {'message': message.dict()}}
        except Exception as e:
            logger.error(f"Error sending message: {e}")
            return {'type': 'error', 'payload': {'message': 'Failed to send message'}}

    async def handle_create_thread(self, payload: Dict[str, Any]):
        try:
            thread = Thread(
                id=self.db_client.generate_unique_id(),
                name=payload['name'],
                user_id=payload['user_id'],
                created_at=datetime.utcnow().isoformat()
            )
            thread_id = await self.db_client.store_thread(thread)
            logger.info(f"Created new thread: {thread_id}")
            return {'type': 'thread_created', 'payload': {'thread_id': thread_id}}
        except Exception as e:
            logger.error(f"Error creating thread: {e}")
            return {'type': 'error', 'payload': {'message': 'Failed to create thread'}}

manager = ConnectionManager()

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(client_id, websocket)
    try:
        while True:
            data = await websocket.receive_json()
            response = await manager.process_message(data, client_id)
            await manager.send_personal_message(response, client_id)
    except WebSocketDisconnect:
        manager.disconnect(client_id)
    except Exception as e:
        logger.error(f"Error in WebSocket connection: {e}")
        await manager.send_personal_message({'type': 'error', 'payload': {'message': 'An unexpected error occurred'}}, client_id)
