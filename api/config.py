import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    QDRANT_URL: str = os.getenv("QDRANT_URL", "http://localhost:6333")
    QDRANT_API_KEY: str = os.getenv("QDRANT_API_KEY", "")
    MESSAGES_COLLECTION: str = "messages"
    CHAT_THREADS_COLLECTION: str = "chat_threads"
    USERS_COLLECTION: str = "users"
    SEARCH_LIMIT: int = 80
