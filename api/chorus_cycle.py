from typing import Dict, Any, List
from .models import Message, Thread
from .database import DatabaseClient
from .utils import get_embedding, chat_completion
import logging

logger = logging.getLogger(__name__)

class ChorusCycle:
    def __init__(self, db_client: DatabaseClient):
        self.steps = ['action', 'experience', 'intention', 'observation', 'update', 'yield']
        self.current_step = 'action'
        self.db_client = db_client

    async def process_step(self, message: Message, thread: Thread) -> Dict[str, Any]:
        try:
            result = {}
            if self.current_step == 'action':
                result = await self.process_action(message, thread)
            elif self.current_step == 'experience':
                result = await self.process_experience(message, thread)
            elif self.current_step == 'intention':
                result = await self.process_intention(message, thread)
            elif self.current_step == 'observation':
                result = await self.process_observation(message, thread)
            elif self.current_step == 'update':
                result = await self.process_update(message, thread)
            elif self.current_step == 'yield':
                result = await self.process_yield(message, thread)

            self.move_to_next_step()
            return result
        except Exception as e:
            logger.error(f"Error processing step {self.current_step}: {e}")
            return {"error": str(e)}

    def move_to_next_step(self):
        current_index = self.steps.index(self.current_step)
        next_index = (current_index + 1) % len(self.steps)
        self.current_step = self.steps[next_index]

    async def process_action(self, message: Message, thread: Thread) -> Dict[str, Any]:
        try:
            # Generate an initial response based on the user's message
            response = await chat_completion(
                messages=[{"role": "user", "content": message.content}],
                model="gpt-4",
                max_tokens=150,
                temperature=0.7
            )
            return {"step": "action", "response": response}
        except Exception as e:
            logger.error(f"Error in action step: {e}")
            return {"error": str(e)}

    async def process_experience(self, message: Message, thread: Thread) -> Dict[str, Any]:
        try:
            # Get embedding for the message
            embedding = await get_embedding(message.content, "text-embedding-ada-002")

            # Search for similar messages
            similar_messages = await self.db_client.search_similar("messages", embedding, limit=5)
            context = [msg["content"] for msg in similar_messages]
            return {"step": "experience", "context": context}
        except Exception as e:
            logger.error(f"Error in experience step: {e}")
            return {"error": str(e)}

    async def process_intention(self, message: Message, thread: Thread) -> Dict[str, Any]:
        try:
            # Analyze the intention of the message and formulate a response strategy
            intention_prompt = f"Analyze the intention of this message: {message.content}"
            intention = await chat_completion(
                messages=[{"role": "user", "content": intention_prompt}],
                model="gpt-4",
                max_tokens=50,
                temperature=0.5
            )
            strategy = "Provide informative response based on context and intention"
            return {"step": "intention", "intention": intention, "strategy": strategy}
        except Exception as e:
            logger.error(f"Error in intention step: {e}")
            return {"error": str(e)}

    async def process_observation(self, message: Message, thread: Thread) -> Dict[str, Any]:
        try:
            # Analyze the current state of the conversation and any patterns
            thread_messages = await self.db_client.get_messages(thread.id)
            observation = f"Conversation has {len(thread_messages)} messages"
            return {"step": "observation", "observation": observation}
        except Exception as e:
            logger.error(f"Error in observation step: {e}")
            return {"error": str(e)}

    async def process_update(self, message: Message, thread: Thread) -> Dict[str, Any]:
        try:
            # Update the response based on all previous steps
            update_prompt = f"Update the response considering: {message.content}"
            updated_response = await chat_completion(
                messages=[{"role": "user", "content": update_prompt}],
                model="gpt-4",
                max_tokens=200,
                temperature=0.7
            )
            return {"step": "update", "updated_response": updated_response}
        except Exception as e:
            logger.error(f"Error in update step: {e}")
            return {"error": str(e)}

    async def process_yield(self, message: Message, thread: Thread) -> Dict[str, Any]:
        try:
            # Finalize the response and prepare it for sending
            yield_prompt = f"Finalize this response: {message.content}"
            final_response = await chat_completion(
                messages=[{"role": "user", "content": yield_prompt}],
                model="gpt-4",
                max_tokens=250,
                temperature=0.7
            )
            return {"step": "yield", "final_response": final_response}
        except Exception as e:
            logger.error(f"Error in yield step: {e}")
            return {"error": str(e)}
