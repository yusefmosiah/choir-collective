from qdrant_client import QdrantClient
from qdrant_client.http import models
from .models import Thread, Message, User
from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid
from .config import Config

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
                    "similarity": result.score
                }
                for result in results
            ]
        except Exception as e:
            print(f"Error during search operation: {e}")
            return []

    async def store_thread(self, thread: Thread) -> str:
        try:
            self.client.upsert(
                collection_name=self.config.CHAT_THREADS_COLLECTION,
                points=[
                    models.PointStruct(
                        id=thread.id,
                        vector=thread.vector,
                        payload=thread.dict(exclude={'vector'})
                    )
                ]
            )
            return thread.id
        except Exception as e:
            print(f"Error storing thread: {e}")
            raise

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
            print(f"Error getting thread: {e}")
            return None

    async def store_message(self, message: Message) -> str:
        try:
            self.client.upsert(
                collection_name=self.config.MESSAGES_COLLECTION,
                points=[
                    models.PointStruct(
                        id=message.id,
                        vector=message.vector,
                        payload=message.dict(exclude={'vector'})
                    )
                ]
            )
            return message.id
        except Exception as e:
            print(f"Error storing message: {e}")
            raise

    async def get_messages(self, thread_id: str) -> List[Message]:
        try:
            results = self.client.scroll(
                collection_name=self.config.MESSAGES_COLLECTION,
                scroll_filter=models.Filter(
                    must=[
                        models.FieldCondition(
                            key="thread_id",
                            match=models.MatchValue(value=thread_id)
                        )
                    ]
                ),
                limit=100  # Adjust as needed
            )
            messages, _ = results
            return [Message(**msg.payload) for msg in messages]
        except Exception as e:
            print(f"Error getting messages: {e}")
            return []

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
            print(f"Error getting user: {e}")
            return None

    async def create_user(self, public_key: str) -> User:
        user = User(
            id=self.generate_unique_id(),
            public_key=public_key,
            created_at=datetime.utcnow().isoformat(),
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
            print(f"Error creating user: {e}")
            raise

    async def get_threads(self, user_id: str) -> List[Thread]:
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
            print(f"Error getting threads: {e}")
            return []
