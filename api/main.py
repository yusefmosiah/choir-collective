from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.websocket_handler import router as websocket_router
from app.config import Config

app = FastAPI()

config = Config.from_env()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include WebSocket router
app.include_router(websocket_router)

@app.get("/")
async def root():
    return {"message": "Choir Collective API"}
