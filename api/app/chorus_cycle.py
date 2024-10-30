from typing import Tuple, List, Optional, Dict, Any
from .models import (
    ConnectionState,
    ClientMessage,
    Effect,
    ChorusState,
    StepEnum,
    Message,
    ActionResponse,
    ExperienceResponse,
    IntentionResponse,
    ObservationResponse,
    UpdateResponse,
    YieldResponse
)
from .database import DatabaseClient
from .utils import chat_completion, get_embedding, structured_chat_completion
from .config import Config
import uuid
from datetime import datetime, UTC
import logging

logger = logging.getLogger(__name__)

class ChorusCycle:
    def __init__(self, database: DatabaseClient, config: Config):
        self.database = database
        self.config = config

    async def handle_client_message(
        self, state: ConnectionState, message: ClientMessage
    ) -> Tuple[ConnectionState, List[Effect]]:
        effects = []
        new_state = state.copy(deep=True)

        if message.type == "get_thread_messages":
            thread_id = message.data.get("thread_id")
            messages = await self.database.get_messages(thread_id)
            effects.append(Effect(type="send_messages", payload={"messages": messages}))

        elif message.type == "create_thread":
            user_id = message.data.get("user_id")
            thread_name = message.data.get("name")
            new_thread = await self.database.create_chat_thread(user_id, thread_name)
            effects.append(Effect(type="new_thread", payload={"thread": new_thread}))

        elif message.type == "submit_prompt":
            thread_id = message.data.get("thread_id")
            prompt = message.data.get("prompt")
            chorus_state = ChorusState(messages=[], current_step=StepEnum.ACTION, thread_id=thread_id)
            effects, new_chorus_state = await self.run_chorus_cycle(chorus_state, prompt)

        return new_state, effects

    async def run_chorus_cycle(self, state: ChorusState, input: str) -> Tuple[List[Effect], ChorusState]:
        effects = []
        new_state = state.copy(deep=True)

        while new_state.current_step != StepEnum.YIELD:
            new_state, step_effects = await self.run_step(new_state, input)
            effects.extend(step_effects)

        return effects, new_state

    async def run_step(self, state: ChorusState, input: str) -> Tuple[ChorusState, List[Effect]]:
        effects = []
        new_state = state.copy(deep=True)

        step_function = getattr(self, f"run_{state.current_step.value}")
        response, priors = await step_function(input, state.messages, state.priors)

        # Update state with response and priors
        new_state.current_response = response
        if priors is not None:
            new_state.priors = priors

        effects.append(Effect(
            type="chorus_response",
            payload={
                "step": state.current_step.value,
                "content": response,
                "priors": state.priors if state.priors else []
            }
        ))

        # Special handling for UPDATE step
        if state.current_step == StepEnum.UPDATE:
            if isinstance(response, dict) and response.get("loop"):
                new_state.current_step = StepEnum.ACTION  # Loop back to start
            else:
                new_state.current_step = StepEnum.YIELD  # Move to final step
        elif state.current_step != StepEnum.YIELD:
            # Normal progression for other steps
            new_state.current_step = StepEnum(list(StepEnum)[list(StepEnum).index(state.current_step) + 1].value)

        return new_state, effects

    async def run_action(self, input: str, messages: List[Message]) -> str:
        action_prompt = """
        This is the Chorus Loop, a decision-making model that turns the OODA loop on its head.
        Rather than accumulating data before acting, you act with "beginner's mind"/emptiness,
        then reflect on your "System 1" action.
        This is step 1, Action: Provide an initial response to the user's prompt to the best of your ability.
        Return your response.
        """
        messages = [
            {"role": "system", "content": action_prompt},
            {"role": "user", "content": input}
        ]
        result = await structured_chat_completion(
            messages,
            self.config,
            response_format=ActionResponse
        )
        if result["status"] == "success":
            response = result["content"]
            return response.proposed_response
        return "Error generating initial response"

    async def run_experience(self, input: str, messages: List[Message], priors: Optional[List[Dict[str, Any]]] = None) -> Tuple[str, List[Dict[str, Any]]]:
        experience_prompt = """
        This is step 2 of the Chorus Loop, Experience: Search your memory for relevant context that could help refine the response from step 1.
        Return your response containing your refined response.
        """
        embedding = await get_embedding(input, self.config.EMBEDDING_MODEL)
        retrieved_priors = await self.database.search_similar(
            self.config.MESSAGES_COLLECTION,
            embedding,
            self.config.SEARCH_LIMIT
        )

        # Format priors for context
        context = "\n".join([f"Source {i+1}: {prior['content']}" for i, prior in enumerate(retrieved_priors)])

        messages = [
            {"role": "system", "content": experience_prompt},
            {"role": "user", "content": f"Sources:\n{context}\n\nUser query: {input}"}
        ]
        result = await structured_chat_completion(
            messages,
            self.config,
            response_format=ExperienceResponse
        )

        if result["status"] == "success":
            response = result["content"]
            return response.synthesis, retrieved_priors
        return "Error processing experience step", []

    async def run_intention(self, input: str, messages: List[Message]) -> str:
        intention_prompt = """
        This is step 3 of the Chorus Loop, Intention: Analyze your planned actions and consider potential consequences.
        Return your response containing your analysis and intentions.
        """
        messages = [
            {"role": "system", "content": intention_prompt},
            {"role": "user", "content": input}
        ]
        result = await structured_chat_completion(
            messages,
            self.config,
            response_format=IntentionResponse
        )
        if result["status"] == "success":
            response = result["content"]
            return f"Explicit: {response.explicit_intent}\nImplicit: {response.implicit_intent}"
        return "Error analyzing intention"

    async def run_observation(self, input: str, messages: List[Message]) -> str:
        observation_prompt = """
        This is step 4 of the Chorus Loop, Observation: Reflect on your analysis and intentions.
        Identify any gaps in your knowledge or potential biases.
        Return your response containing your observations and reflections.
        """
        messages = [
            {"role": "system", "content": observation_prompt},
            {"role": "user", "content": input}
        ]
        result = await structured_chat_completion(
            messages,
            self.config,
            response_format=ObservationResponse
        )
        if result["status"] == "success":
            response = result["content"]
            # Commit the observation to the database
            await self._commit_message(
                role="assistant",
                content=response.context_analysis,
                step=StepEnum.OBSERVATION.value
            )
            return response.context_analysis
        return "Error making observations"

    async def run_update(self, input: str, messages: List[Message]) -> str:
        update_prompt = """
        This is step 5 of the Chorus Loop, Update: Based on your observations,
        decide whether to proceed with your current plan or loop back for further refinement.
        You must make a binary choice:
        - Return loop: true if you need another iteration through the cycle
        - Return loop: false if you're ready to yield the final response
        Explain your reasoning for this decision.
        """
        messages = [
            {"role": "system", "content": update_prompt},
            {"role": "user", "content": input}
        ]
        result = await structured_chat_completion(
            messages,
            self.config,
            response_format=UpdateResponse
        )
        if result["status"] == "success":
            response = result["content"]
            return {
                "loop": response.loop,
                "reasoning": response.reasoning,
                "insights": response.key_insights,
                "confidence": response.confidence
            }
        return {"loop": False, "reasoning": "Error in update step"}

    async def run_yield(self, input: str, messages: List[Message]) -> str:
        yield_prompt = """
        This is the final step of the Chorus Loop, Yield: Synthesize the accumulated context
        from all iterations and provide a final response that comprehensively addresses
        the user's original prompt. Return your response containing your synthesized response.
        """
        messages = [
            {"role": "system", "content": yield_prompt},
            {"role": "user", "content": "Write a final response to the user's prompt:"}
        ]
        result = await structured_chat_completion(
            messages,
            self.config,
            response_format=YieldResponse
        )
        if result["status"] == "success":
            response = result["content"]
            return response.final_response
        return "Error generating final response"

    async def handle_connection_error(self, error: Exception, state: ConnectionState) -> Tuple[ConnectionState, str]:
        new_state = state.copy(deep=True)
        new_state.error_state = {"message": str(error)}
        return new_state, f"An error occurred: {str(error)}"

    async def _commit_message(self, role: str, content: str, step: str, embedding: Optional[List[float]] = None):
        """Record a message in the database with the given role, content, and step."""
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
            created_at=datetime.now(UTC).isoformat(),
            vector=embedding,
            step=step
        )
        await self.database.save_message(message)
