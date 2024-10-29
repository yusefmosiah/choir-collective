from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .websocket_handler import router as websocket_router

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include WebSocket router
app.include_router(websocket_router)

@app.get("/")
async def root():
    return {"message": "Choir Collective API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
