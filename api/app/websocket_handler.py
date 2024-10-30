from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from .chorus_cycle import ChorusCycle
from .models import ConnectionState, ClientMessage, ServerMessage
from .database import DatabaseClient
from .config import Config
import logging

# Configure logging
logger = logging.getLogger(__name__)

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    logger.info("New WebSocket connection attempt")
    await websocket.accept()
    logger.info("WebSocket connection accepted")

    config = Config.from_env()
    db = DatabaseClient(config)
    chorus = ChorusCycle(db, config)
    state = ConnectionState(client_id="", user=None, thread_id=None, status="connected", error_state=None)
    logger.info("Initial connection state established")

    try:
        while True:
            data = await websocket.receive_json()
            logger.info(f"Received message type: {data.get('type')}")
            logger.debug(f"Message data: {data}")

            client_message = ClientMessage(type=data.get('type'), data=data.get('data', {}))
            logger.info(f"Processing client message type: {client_message.type}")

            new_state, effects = await chorus.handle_client_message(state, client_message)
            logger.debug(f"Generated {len(effects)} effects")

            for effect in effects:
                logger.debug(f"Processing effect type: {effect.type}")
                if effect.type == "send_messages":
                    await websocket.send_json(ServerMessage(type="thread_messages", data=effect.payload).dict())
                    logger.info(f"Sent thread messages")
                elif effect.type == "new_thread":
                    await websocket.send_json(ServerMessage(type="new_thread", data=effect.payload).dict())
                    logger.info(f"Sent new thread notification")
                elif effect.type == "chorus_response":
                    await websocket.send_json(ServerMessage(type="chorus_response", data=effect.payload).dict())
                    logger.info(f"Sent chorus response for step: {effect.payload.get('step')}")

            state = new_state
            logger.debug("State updated successfully")

    except WebSocketDisconnect:
        logger.info("WebSocket disconnected normally")
    except Exception as e:
        logger.error(f"WebSocket error: {str(e)}", exc_info=True)
        try:
            new_state, error_msg = await chorus.handle_connection_error(e, state)
            await websocket.send_json(ServerMessage(type="error", data={"message": error_msg}).dict())
            logger.info("Error message sent to client")
        except Exception as send_error:
            logger.error(f"Failed to send error message to client: {str(send_error)}")
    finally:
        logger.info("WebSocket connection closed")
