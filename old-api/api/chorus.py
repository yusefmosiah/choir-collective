import asyncio
from enum import Enum
from typing import List, Dict, Any, Optional, Callable
from starlette.websockets import WebSocket, WebSocketState
from config import Config
from database import DatabaseClient
from models import Message, ChorusState, ChorusStepEnum, ChorusResponse, Source
from utils import logger, get_embedding, chat_completion, chunk_text
from litellm import completion
from pydantic import BaseModel, ValidationError
import json
import uuid
from datetime import datetime, timezone
import traceback

class Chorus:
    """
    The Chorus class implements the Chorus Loop, a decision-making model.
    It processes user prompts through a series of steps to generate refined responses.
    """

    def __init__(self, config: Config, db_client: DatabaseClient):
        """
        Initialize the Chorus instance.

        Args:
            config (Config): Configuration settings.
            db_client (DatabaseClient): Database client for storing and retrieving messages.
        """
        self.config = config
        self.db_client = db_client
        self.state = ChorusState()
        self.step_functions: List[Callable[[], asyncio.coroutine[ChorusResponse]]] = [
            self._action,
            self._experience,
            self._intention,
            self._observation,
            self._update,
        ]

    async def run(self, user_prompt: str, websocket: WebSocket, chat_history: List[Dict[str, str]], thread_id: str) -> List[Dict[str, str]]:
        self.state.reset()
        self.state.messages = chat_history + [{"role": "user", "content": user_prompt}]
        self.state.thread_id = thread_id

        # Save the user prompt
        await self._commit_message("user", user_prompt, step=ChorusStepEnum.ACTION.value)

        try:
            for step_function in self.step_functions:
                if websocket.client_state != WebSocketState.CONNECTED:
                    logger.warning("WebSocket disconnected. Stopping Chorus loop.")
                    break
                result = await step_function()
                await self._send_result(websocket, result)
                await asyncio.sleep(0.1)  # Prevent steps from bunching together

                if step_function == self._update:
                    if result.content.lower() == "return":
                        final_response = await self._yield()
                        await self._send_result(websocket, final_response)
                        await asyncio.sleep(0.1)
                        self.state.complete()
                    elif result.content.lower() == "loop":
                        self.state.loop()
                    else:
                        logger.error(f"Unexpected result from update step: {result.content}")
                        final_response = await self._yield()
                        await self._send_result(websocket, final_response)
                        await asyncio.sleep(0.1)
                        self.state.complete()
        except Exception as e:
            error_msg = f"Error in Chorus run: {str(e)}\n{traceback.format_exc()}"
            logger.error(error_msg)
            if websocket.client_state == WebSocketState.CONNECTED:
                error_response = ChorusResponse(step=ChorusStepEnum.ERROR, content=f"An error occurred: {str(e)}")
                await self._send_result(websocket, error_response)

        return self.state.messages

    async def _action(self) -> ChorusResponse:
        action_prompt = """
        This is the Chorus Loop, a decision-making model that turns the OODA loop on its head.
        Rather than accumulating data before acting, you act with "beginner's mind"/emptiness,
        then reflect on your "System 1" action.
        This is step 1, Action: Provide an initial response to the user's prompt to the best of your ability.
        Return your response.
        """
        result = await self._structured_chat_completion(self.state.messages + [{"role": "system", "content": action_prompt}])
        logger.info(f"Action step result: {result}")

        # Save the assistant's response
        await self._commit_message("assistant", result.content, step=ChorusStepEnum.ACTION.value)

        return ChorusResponse(step=ChorusStepEnum.ACTION, content=result.content)

    async def _experience(self) -> ChorusResponse:
        experience_prompt = """
        This is step 2 of the Chorus Loop, Experience: Search your memory for relevant context that could help refine the response from step 1.
        Return your response containing your refined response.
        """
        prompt = self.state.messages[-1]["content"]
        embedding = await get_embedding(prompt, self.config.EMBEDDING_MODEL)
        search_results = await self.db_client.search(embedding)
        search_results_str = "\n".join([result['content'] for result in search_results])

        sources = []
        for result in search_results:
            try:
                source = Source(
                    id=result['id'],
                    thread_id=result.get('thread_id', self.state.thread_id),  # Use current thread_id if not provided
                    content=result['content'],
                    created_at=result.get('created_at'),
                    role=result.get('role'),
                    token_value=result.get('token_value', 0),
                    similarity=result.get('similarity', 0.0)
                )
                sources.append(source)
            except ValidationError as e:
                logger.error(f"Error creating Source from search result: {e}")
                continue  # Skip this result and continue with the next one

        logger.info(f"sources: {sources}")
        reranked_prompt = f"{prompt}\n\nSearch Results:\n{search_results_str}\n\nRefined Response:"

        result = await self._structured_chat_completion(self.state.messages + [
            {"role": "system", "content": experience_prompt},
            {"role": "user", "content": reranked_prompt}
        ])

        # Save the assistant's response
        await self._commit_message("assistant", result.content, step=ChorusStepEnum.EXPERIENCE.value)

        return ChorusResponse(step=ChorusStepEnum.EXPERIENCE, content=result.content, sources=sources)

    async def _intention(self) -> ChorusResponse:
        intention_prompt = """
        This is step 3 of the Chorus Loop, Intention: Analyze your planned actions and consider potential consequences.
        Return your response containing your analysis and intentions.
        """
        result = await self._structured_chat_completion(self.state.messages + [{"role": "system", "content": intention_prompt}])
        logger.info(f"Intention step result: {result}")

        # Save the assistant's response
        await self._commit_message("assistant", result.content, step=ChorusStepEnum.INTENTION.value)

        return ChorusResponse(step=ChorusStepEnum.INTENTION, content=result.content)

    async def _observation(self) -> ChorusResponse:
        observation_prompt = """
        This is step 4 of the Chorus Loop, Observation: Reflect on your analysis and intentions.
        Identify any gaps in your knowledge or potential biases.
        Return your response containing your observations and reflections.
        """
        result = await self._structured_chat_completion(self.state.messages + [{"role": "system", "content": observation_prompt}])
        logger.info(f"Observation step result: {result}")

        # Save the assistant's response
        await self._commit_message("assistant", result.content, step=ChorusStepEnum.OBSERVATION.value)

        return ChorusResponse(step=ChorusStepEnum.OBSERVATION, content=result.content)

    async def _update(self) -> ChorusResponse:
        update_prompt = """
        This is step 5 of the Chorus Loop, Update: Based on your observations,
        decide whether to proceed with your current plan or loop back for further refinement.
        If you believe your response is ready, return "RETURN". If you need another iteration, return "LOOP".
        """
        result = await self._structured_chat_completion(self.state.messages + [{"role": "system", "content": update_prompt}])
        logger.info(f"Update step result: {result}")

        # Save the assistant's response
        await self._commit_message("assistant", result.content, step=ChorusStepEnum.UPDATE.value)

        return ChorusResponse(step=ChorusStepEnum.UPDATE, content=result.content)

    async def _yield(self) -> ChorusResponse:
        yield_prompt = """
        This is the final step of the Chorus Loop, Yield: Synthesize the accumulated context
        from all iterations and provide a final response that comprehensively addresses
        the user's original prompt. Return your response containing your synthesized response.
        """
        result = await self._structured_chat_completion(self.state.messages + [
            {"role": "system", "content": yield_prompt},
            {"role": "user", "content": "Write a final response to the user's prompt:"}
        ])
        logger.info(f"Yield step result: {result}")

        # Save the assistant's final response
        await self._commit_message("assistant", result.content, step=ChorusStepEnum.FINAL.value)

        return ChorusResponse(step=ChorusStepEnum.FINAL, content=result.content)

    async def _commit_message(self, role: str, content: str, step: str, embedding: Optional[List[float]] = None):
        if embedding is None:
            embedding = await get_embedding(content, self.config.EMBEDDING_MODEL)

        if not embedding:
            logger.error("Failed to generate embedding for the message.")
            return

        message = Message(
            id=str(uuid.uuid4()),
            thread_id=self.state.thread_id,
            role=role,
            content=content,
            created_at=datetime.utcnow().isoformat(),
            vector=embedding,
            step=step
        )
        self.state.messages.append({"role": role, "content": content, "step": step})
        await self.db_client.save_message(message)

    async def _send_result(self, websocket: WebSocket, response: ChorusResponse):
        if websocket.client_state == WebSocketState.CONNECTED:
            try:
                response_data = json.loads(response.to_json())
                response_data['isStreaming'] = self.state.current_step != ChorusStepEnum.FINAL
                await websocket.send_json(response_data)
                logger.info(f"Sent {response.step} result to client.")
            except Exception as e:
                logger.error(f"Error sending result to client: {e}")
        else:
            logger.warning("WebSocket is not connected. Skipping message send.")

    async def _structured_chat_completion(self, messages: List[Dict[str, str]], response_format: BaseModel = None) -> ChorusResponse:
        try:
            response = completion(
                model=self.config.CHAT_MODEL,
                messages=messages,
                max_tokens=self.config.MAX_TOKENS,
                temperature=self.config.TEMPERATURE
            )
            content = response.choices[0].message.content
            try:
                parsed_content = json.loads(content)
                if isinstance(parsed_content, dict) and 'content' in parsed_content:
                    content = parsed_content['content']
            except json.JSONDecodeError:
                pass  # Content is not JSON, use as is
            return ChorusResponse(step=self.state.current_step.value, content=content)
        except Exception as e:
            logger.error(f"Error in structured chat completion: {str(e)}")
            return ChorusResponse(step=ChorusStepEnum.ERROR.value, content=f"An error occurred: {str(e)}")
