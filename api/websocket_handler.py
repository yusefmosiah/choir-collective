from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from .chorus_cycle import ChorusCycle
from .models import ConnectionState, ClientMessage, ServerMessage
from .database import DatabaseClient
from .config import Config

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    config = Config.from_env()
    db = DatabaseClient(config)
    chorus = ChorusCycle(db, config)
    state = ConnectionState(client_id="", user=None, thread_id=None, status="connected", error_state=None)

    try:
        while True:
            data = await websocket.receive_json()
            client_message = ClientMessage(type=data.get('type'), data=data.get('data', {}))

            new_state, effects = await chorus.handle_client_message(state, client_message)

            for effect in effects:
                if effect.type == "send_messages":
                    await websocket.send_json(ServerMessage(type="thread_messages", data=effect.payload).dict())
                elif effect.type == "new_thread":
                    await websocket.send_json(ServerMessage(type="new_thread", data=effect.payload).dict())
                elif effect.type == "chorus_response":
                    await websocket.send_json(ServerMessage(type="chorus_response", data=effect.payload).dict())

            state = new_state

    except WebSocketDisconnect:
        # Handle disconnect
        pass
    except Exception as e:
        new_state, error_msg = await chorus.handle_connection_error(e, state)
        await websocket.send_json(ServerMessage(type="error", data={"message": error_msg}).dict())
