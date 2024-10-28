from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import logging

# Configure logging with more detail
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()

# Log all requests middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Outgoing response: {response.status_code}")
    return response

# Configure CORS - update with your actual frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://choir-collective.onrender.com",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/log-click")
async def log_click():
    return {"status": "success", "message": "Click logged"}

@app.get("/health")
async def health_check():
    logger.info("Health check called")
    return {"status": "healthy"}
# Add a root endpoint to help with debugging
@app.get("/")
async def root():
    logger.info("Root endpoint called")
    return {"message": "API is running"}
