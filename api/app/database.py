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
            timeout=60,  # Add timeout for cloud connection
            https=True  # Force HTTPS for cloud connection
        )
        # Verify collections exist
        for collection in [self.config.MESSAGES_COLLECTION, self.config.CHAT_THREADS_COLLECTION, self.config.USERS_COLLECTION]:
            if not self.client.collection_exists(collection):
                raise RuntimeError(f"Required collection {collection} does not exist")

    async def search_similar(self, collection: str, query_vector: List[float], limit: int = 10) -> List[Dict[str, Any]]:
        try:
            # Validate vector size
            if len(query_vector) != self.config.VECTOR_SIZE:
                logger.error(f"Invalid vector size: got {len(query_vector)}, expected {self.config.VECTOR_SIZE}")
                return []

            logger.info(f"Searching with query embedding of length {len(query_vector)}, limit={limit}, collection={collection}")
            search_result = self.client.search(
                collection_name=collection,
                query_vector=query_vector,
                limit=self.config.SEARCH_LIMIT,
                with_payload=True,
                with_vectors=False
            )
            logger.info(f"Search returned {len(search_result)} results")

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
            logger.error(f"Error during search operation: {e}", exc_info=True)
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
