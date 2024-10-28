from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS
app.add_middleware(
      CORSMiddleware,
      allow_origins=[
          "https://choir-collective.onrender.com",
          "http://localhost:3000"  # For local development
      ],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
)

@app.post("/api/log-click")
async def log_click():
    logger.info("Button clicked!")
    return {"status": "success", "message": "Click logged"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}