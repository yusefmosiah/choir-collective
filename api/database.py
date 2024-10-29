from qdrant_client import QdrantClient, models
from qdrant_client.http.exceptions import ApiException, UnexpectedResponse
from typing import List, Dict, Any, Optional
from datetime import datetime, UTC
import uuid
from .config import Config
from .utils import logger
from .models import User, Thread, Message, ChatThread

class DatabaseClient:
    def __init__(self, config: Config):
        self.config = config
        self.client = QdrantClient(url=config.QDRANT_URL, api_key=config.QDRANT_API_KEY)

    def generate_unique_id(self) -> str:
        return str(uuid.uuid4())

    async def search_similar(self, collection: str, query_vector: List[float], limit: int = 10) -> List[Dict[str, Any]]:
        try:
            results = self.client.search(
                collection_name=collection,
                query_vector=query_vector,
                limit=limit
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
                for result in results
            ]
        except Exception as e:
            logger.error(f"Error during search operation: {e}")
            return []

    async def create_user(self, public_key: str) -> User:
        user_id = self.generate_unique_id()
        user = User(
            id=user_id,
            public_key=public_key,
            created_at=datetime.now(UTC).isoformat(),
            chat_threads=[]
        )
        try:
            self.client.upsert(
                collection_name=self.config.USERS_COLLECTION,
                points=[
                    models.PointStruct(
                        id=user.id,
                        vector=[0] * 1536,  # Placeholder vector
                        payload=user.dict()
                    )
                ]
            )
            return user
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            raise

    async def get_user(self, public_key: str) -> Optional[User]:
        try:
            results = self.client.scroll(
                collection_name=self.config.USERS_COLLECTION,
                scroll_filter=models.Filter(
                    must=[
                        models.FieldCondition(
                            key="public_key",
                            match=models.MatchValue(value=public_key)
                        )
                    ]
                ),
                limit=1
            )
            users, _ = results
            if users:
                return User(**users[0].payload)
            return None
        except Exception as e:
            logger.error(f"Error getting user: {e}")
            return None

    async def get_chat_threads(self, user_id: str) -> List[Thread]:
        try:
            user = await self.get_user(user_id)
            if user and user.chat_threads:
                threads = self.client.retrieve(
                    collection_name=self.config.CHAT_THREADS_COLLECTION,
                    ids=user.chat_threads
                )
                return [Thread(**thread.payload) for thread in threads]
            return []
        except Exception as e:
            logger.error(f"Error getting threads: {e}")
            return []

    async def create_chat_thread(self, user_id: str, name: str) -> Thread:
        thread_id = self.generate_unique_id()
        thread = Thread(
            id=thread_id,
            co_authors={user_id},
            messages=[],
            token_balance=0,
            status="active",
            created_at=datetime.now(UTC),
            updated_at=datetime.now(UTC),
            version=1
        )
        try:
            self.client.upsert(
                collection_name=self.config.CHAT_THREADS_COLLECTION,
                points=[
                    models.PointStruct(
                        id=thread.id,
                        vector=[0] * 1536,  # Placeholder vector
                        payload=thread.dict()
                    )
                ]
            )

            # Update user's chat_threads
            user = await self.get_user(user_id)
            if user:
                user.chat_threads.append(thread_id)
                self.client.upsert(
                    collection_name=self.config.USERS_COLLECTION,
                    points=[
                        models.PointStruct(
                            id=user.id,
                            vector=[0] * 1536,  # Placeholder vector
                            payload=user.dict()
                        )
                    ]
                )

            return thread
        except Exception as e:
            logger.error(f"Error creating chat thread: {e}")
            raise

    async def save_message(self, message: Message):
        try:
            self.client.upsert(
                collection_name=self.config.MESSAGES_COLLECTION,
                points=[
                    models.PointStruct(
                        id=message.id,
                        vector=[0] * 1536,  # Placeholder vector
                        payload=message.dict()
                    )
                ]
            )

            # Update thread's messages
            thread = await self.get_thread(message.thread_id)
            if thread:
                thread.messages.append(message.id)
                thread.updated_at = datetime.now(UTC)
                thread.version += 1
                self.client.upsert(
                    collection_name=self.config.CHAT_THREADS_COLLECTION,
                    points=[
                        models.PointStruct(
                            id=thread.id,
                            vector=[0] * 1536,  # Placeholder vector
                            payload=thread.dict()
                        )
                    ]
                )
        except Exception as e:
            logger.error(f"Error saving message: {e}")
            raise

    async def get_messages(self, thread_id: str) -> List[Message]:
        try:
            thread = await self.get_thread(thread_id)
            if thread and thread.messages:
                messages = self.client.retrieve(
                    collection_name=self.config.MESSAGES_COLLECTION,
                    ids=thread.messages
                )
                return [Message(**msg.payload) for msg in messages]
            return []
        except Exception as e:
            logger.error(f"Error getting messages: {e}")
            return []

    async def get_thread(self, thread_id: str) -> Optional[Thread]:
        try:
            results = self.client.retrieve(
                collection_name=self.config.CHAT_THREADS_COLLECTION,
                ids=[thread_id]
            )
            if results:
                return Thread(**results[0].payload)
            return None
        except Exception as e:
            logger.error(f"Error getting thread: {e}")
            return None
