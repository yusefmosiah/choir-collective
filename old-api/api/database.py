from qdrant_client import QdrantClient, models
from qdrant_client.http.exceptions import ApiException, UnexpectedResponse
from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid
from config import Config
from utils import logger
import json
from models import User, ChatThread, Message
from itertools import groupby
from operator import itemgetter

class DatabaseClient:
    def __init__(self, config: Config):
        self.config = config
        self.client = QdrantClient(url=config.QDRANT_URL, api_key=config.QDRANT_API_KEY)

    def generate_unique_id(self) -> str:
        return str(uuid.uuid4())

    async def search(self, query_embedding: List[float]) -> List[Dict[str, Any]]:
        try:
            logger.info(f"Searching with query embedding of length {len(query_embedding)}, limit={self.config.SEARCH_LIMIT}")
            results = self.client.search(
                collection_name=self.config.MESSAGES_COLLECTION,
                query_vector=query_embedding,
                limit=self.config.SEARCH_LIMIT
            )
            logger.info(f"Search returned {len(results)} results")

            search_results = []
            for result in results:
                try:
                    search_result = {
                        "id": str(result.id),
                        "thread_id": result.payload.get('thread_id', ''),
                        "content": result.payload.get('content', ''),
                        "created_at": result.payload.get('created_at', ''),
                        "role": result.payload.get('role', ''),
                        "token_value": result.payload.get('token_value', 0),
                        "step": result.payload.get('step', ''),
                        "similarity": result.score
                    }
                    search_results.append(search_result)
                except Exception as e:
                    logger.error(f"Error processing search result: {e}")
                    continue

            logger.info(f"Processed {len(search_results)} search results")

            # Deduplicate search results
            deduplicated_results = self._deduplicate_search_results(search_results)
            logger.info(f"Deduplicated to {len(deduplicated_results)} results")

            return deduplicated_results
        except Exception as e:
            logger.error(f"Error during search operation: {e}")
            return []

    def _deduplicate_search_results(self, search_results: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        # Sort the results by content and created_at
        sorted_results = sorted(search_results, key=lambda x: (x['content'], x['created_at']))

        # Group by content
        grouped = groupby(sorted_results, key=itemgetter('content'))

        # Keep the earliest result for each unique content
        deduplicated = [next(group) for _, group in grouped]

        return deduplicated

    async def upsert(self, content: str, embedding: List[float], is_human_generated: bool) -> None:
        try:
            self.client.upsert(
                collection_name=self.config.MESSAGES_COLLECTION,
                points=[
                    models.PointStruct(
                        id=str(uuid.uuid4()),
                        payload={
                            "content": content,
                            "created_at": datetime.now().isoformat(),
                            "agent": "human" if is_human_generated else "ai",
                            "token_value": 0  # Initialize with 0, update later as needed
                        },
                        vector=embedding,
                    )
                ],
            )
            logger.info(f"Successfully upserted content: {content[:50]}...")
        except (ApiException, UnexpectedResponse) as e:
            logger.error(f"Error during upsert operation: {e}")

    # New methods for 'users' collection
    async def create_user(self, public_key: str) -> User:
        user_id = self.generate_unique_id()
        default_vector = [0.0] * 1536  # Adjust dimension if needed
        user = User(
            id=user_id,
            public_key=public_key,
            created_at=datetime.utcnow().isoformat(),
            vector=default_vector,
            chat_threads=[]  # Initialize as an empty list
        )
        try:
            self.client.upsert(
                collection_name=self.config.USERS_COLLECTION,
                points=[
                    models.PointStruct(
                        id=user.id,
                        vector=user.vector,
                        payload=user.dict(exclude={'vector'})
                    )
                ]
            )
            return user
        except (ApiException, UnexpectedResponse) as e:
            logger.error(f"Error creating user: {e}")
            raise

    async def get_user(self, public_key: str) -> Optional[User]:
        try:
            scroll_result = self.client.scroll(
                collection_name=self.config.USERS_COLLECTION,
                scroll_filter=models.Filter(
                    must=[
                        models.FieldCondition(
                            key="public_key",
                            match=models.MatchValue(value=public_key)
                        )
                    ]
                ),
                limit=1  # We only need one user
            )
            users, _ = scroll_result
            if users:
                return User(**users[0].payload)
            return None
        except Exception as e:
            logger.error(f"Error getting user: {e}")
            return None

    async def get_chat_threads(self, user_id: str) -> List[ChatThread]:
        try:
            logger.info(f"Retrieving chat threads for user {user_id}")

            # Retrieve the user to get their chat thread IDs
            user_records = self.client.retrieve(
                collection_name=self.config.USERS_COLLECTION,
                ids=[user_id]
            )

            if not user_records:
                logger.error(f"User not found: {user_id}")
                return []

            user_payload = user_records[0].payload
            thread_ids = user_payload.get('chat_threads', [])

            if not thread_ids:
                logger.info(f"No chat threads found for user {user_id}")
                return []

            # Retrieve the chat threads using the thread IDs
            thread_records = self.client.retrieve(
                collection_name=self.config.CHAT_THREADS_COLLECTION,
                ids=thread_ids
            )

            chat_threads = [ChatThread(**thread.payload) for thread in thread_records]
            logger.info(f"Retrieved {len(chat_threads)} chat threads for user {user_id}")
            return chat_threads
        except Exception as e:
            logger.error(f"Error getting chat threads for user {user_id}: {e}")
            return []

    async def create_chat_thread(self, user_id: str, name: str) -> ChatThread:
        thread_id = self.generate_unique_id()
        default_vector = [0.0] * 1536  # Adjust dimension if needed
        thread = ChatThread(
            id=thread_id,
            user_id=user_id,
            name=name,
            created_at=datetime.utcnow().isoformat(),
            vector=default_vector,
            messages=[]
        )
        try:
            # Upsert the new chat thread
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

            # Retrieve the existing user payload
            user_points = self.client.retrieve(
                collection_name=self.config.USERS_COLLECTION,
                ids=[user_id]
            )

            if not user_points:
                logger.error(f"User not found: {user_id}")
                raise Exception(f"User not found: {user_id}")

            user_payload = user_points[0].payload
            chat_threads = user_payload.get('chat_threads', [])
            chat_threads.append(thread_id)

            # Update the user's payload with the new chat_threads list
            self.client.set_payload(
                collection_name=self.config.USERS_COLLECTION,
                payload={"chat_threads": chat_threads},
                points=[user_id]
            )

            logger.info(f"Successfully created new thread: {thread.id}")
            return thread
        except (ApiException, UnexpectedResponse) as e:
            logger.error(f"Error creating chat thread: {e}")
            raise

    async def save_message(self, message: Message):
        try:
            logger.info(f"Saving message {message.id} to thread {message.thread_id}")
            # First, upsert the message into the messages collection
            self.client.upsert(
                collection_name=self.config.MESSAGES_COLLECTION,
                points=[
                    models.PointStruct(
                        id=message.id,
                        vector=message.vector,
                        payload=message.dict(exclude={"vector"})
                    )
                ]
            )

            # Retrieve the existing thread payload
            thread_records = self.client.retrieve(
                collection_name=self.config.CHAT_THREADS_COLLECTION,
                ids=[message.thread_id]
            )

            if not thread_records:
                logger.error(f"Thread not found: {message.thread_id}")
                raise Exception(f"Thread not found: {message.thread_id}")

            thread_payload = thread_records[0].payload
            messages_list = thread_payload.get('messages', [])
            messages_list.append(message.id)

            # Update the thread's payload with the new messages list
            self.client.set_payload(
                collection_name=self.config.CHAT_THREADS_COLLECTION,
                payload={"messages": messages_list},
                points=[message.thread_id]
            )

            logger.info(f"Successfully saved message: {message.id} to thread: {message.thread_id}")
        except Exception as e:
            logger.error(f"Error saving message: {e}")
            raise

    async def get_messages_for_thread(self, thread_id: str) -> List[Message]:
        try:
            logger.info(f"Retrieving messages for thread {thread_id}")
            thread_records = self.client.retrieve(
                collection_name=self.config.CHAT_THREADS_COLLECTION,
                ids=[thread_id]
            )

            if not thread_records:
                logger.error(f"Thread not found: {thread_id}")
                return []

            thread_payload = thread_records[0].payload
            message_ids = thread_payload.get('messages', [])
            logger.info(f"Found message IDs: {message_ids}")

            if not message_ids:
                logger.info(f"No messages in thread {thread_id}")
                return []

            messages = self.client.retrieve(
                collection_name=self.config.MESSAGES_COLLECTION,
                ids=message_ids
            )

            logger.info(f"Retrieved {len(messages)} messages from collection")
            return [Message(**msg.payload) for msg in messages]
        except Exception as e:
            logger.error(f"Error getting messages for thread {thread_id}: {e}")
            return []
