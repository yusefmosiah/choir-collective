from qdrant_client import QdrantClient, models
from qdrant_client.http.exceptions import ApiException, UnexpectedResponse
from typing import List, Dict, Any, Optional
from datetime import datetime, UTC
import uuid
from .config import Config
from .utils import logger
from .models import User, Thread, Message

class DatabaseClient:
    def __init__(self, config: Config):
        self.config = config
        # Initialize with cloud configuration
        self.client = QdrantClient(
            url=config.QDRANT_URL,
            api_key=config.QDRANT_API_KEY,
            timeout=60  # Add timeout for cloud connection
        )
        self._ensure_collections()

    def _ensure_collections(self):
        """Ensure all required collections exist with proper configuration."""
        try:
            collections = [
                (self.config.MESSAGES_COLLECTION, 1536),  # For embeddings
                (self.config.CHAT_THREADS_COLLECTION, 1536),
                (self.config.USERS_COLLECTION, 1536)
            ]

            for collection_name, vector_size in collections:
                try:
                    if not self.client.collection_exists(collection_name):
                        logger.info(f"Creating collection {collection_name}")
                        self.client.create_collection(
                            collection_name=collection_name,
                            vectors_config=models.VectorParams(
                                size=vector_size,
                                distance=models.Distance.COSINE
                            )
                        )
                except Exception as e:
                    logger.error(f"Error checking/creating collection {collection_name}: {e}")
                    # Continue with other collections even if one fails
                    continue

        except Exception as e:
            logger.error(f"Error in _ensure_collections: {e}")
            # Don't raise the exception - allow the connection to proceed
            # The collections will be created when needed

    async def search_similar(self, collection: str, query_vector: List[float], limit: int = 10) -> List[Dict[str, Any]]:
        try:
            logger.info(f"Searching with query embedding of length {len(query_vector)}, limit={limit}, search_limit={self.config.SEARCH_LIMIT}")
            search_result = self.client.search(
                collection_name=collection,
                query_vector=query_vector,
                limit=self.config.SEARCH_LIMIT,
                with_payload=True,
                with_vectors=False
            )

            return [
                {
                    "id": str(result.id),
                    "content": result.payload.get('content', ''),
                    "thread_id": result.payload.get('thread_id', ''),
                    "created_at": result.payload.get('created_at', ''),
                    "role": result.payload.get('role', ''),
                    "token_value": result.payload.get('token_value', 0),
                    "step": result.payload.get('step', ''),
                    "similarity": result.score
                }
                for result in search_result
            ]
        except Exception as e:
            logger.error(f"Error during search operation: {e}")
            return []

    async def save_message(self, message: Message):
        """Save a message and update the thread's message list atomically."""
        try:
            # First, upsert the message
            self.client.upsert(
                collection_name=self.config.MESSAGES_COLLECTION,
                points=[
                    models.PointStruct(
                        id=message.id,
                        vector=message.vector,
                        payload={
                            "content": message.content,
                            "thread_id": message.thread_id,
                            "role": message.role,
                            "created_at": message.created_at,
                            "step": message.step,
                            "status": message.status
                        }
                    )
                ]
            )

            # Then, update the thread's message list using scroll and atomic update
            scroll_filter = models.Filter(
                must=[
                    models.FieldCondition(
                        key="id",
                        match=models.MatchValue(value=message.thread_id)
                    )
                ]
            )

            # Get current thread state
            scroll_result = self.client.scroll(
                collection_name=self.config.CHAT_THREADS_COLLECTION,
                scroll_filter=scroll_filter,
                limit=1
            )

            points, _ = scroll_result
            if not points:
                raise Exception(f"Thread not found: {message.thread_id}")

            # Update messages list
            current_messages = points[0].payload.get("messages", [])
            current_messages.append(message.id)

            # Atomic update
            self.client.update_payload(
                collection_name=self.config.CHAT_THREADS_COLLECTION,
                payload={"messages": current_messages},
                points=[message.thread_id],
                wait=True
            )

        except Exception as e:
            logger.error(f"Error saving message: {e}")
            raise

    # Add other methods from old database.py as needed...
