import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Config(BaseSettings):
    QDRANT_URL: str = os.getenv("QDRANT_URL", "http://localhost:6333")
    QDRANT_API_KEY: str = os.getenv("QDRANT_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    AZURE_API_KEY: str = os.getenv("AZURE_API_KEY", "")
    AZURE_API_BASE: str = os.getenv("AZURE_API_BASE", "")
    AZURE_API_VERSION: str = "2024-02-15-preview"
    EMBEDDING_MODEL: str = "choir-embeddings-ada-002"
    CHAT_MODEL: str = "azure/choir-gpt-4o"
    MAX_TOKENS: int = 4000
    TEMPERATURE: float = 0.7
    MESSAGES_COLLECTION: str = "choir"
    CHAT_THREADS_COLLECTION: str = "chat_threads"
    USERS_COLLECTION: str = "users"
    SEARCH_LIMIT: int = 80
    CHUNK_SIZE: int = 10000
    CHUNK_OVERLAP: int = 5000
    API_URL: str = os.getenv('API_URL', 'http://localhost:8000')

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
