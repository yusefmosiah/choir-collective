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
import json

logger = logging.getLogger(__name__)

class ChorusCycle:
    def __init__(self, database: DatabaseClient, config: Config):
        self.database = database
        self.config = config

    async def handle_client_message(
        self, state: ConnectionState, message: ClientMessage
    ) -> Tuple[ConnectionState, List[Effect]]:
        logger.info(f"Handling client message: {message.type}")
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
            logger.info("Processing submit_prompt")
            thread_id = message.data.get("thread_id", "default")
            prompt = message.data.get("content")
            logger.info(f"Thread ID: {thread_id}, Prompt: {prompt}")

            # Validate prompt
            if not prompt:
                logger.error("No prompt content provided")
                effects.append(Effect(
                    type="error",
                    payload={"message": "No prompt content provided"}
                ))
                return new_state, effects

            chorus_state = ChorusState(
                messages=[],
                current_step=StepEnum.ACTION,
                thread_id=thread_id,
                error_state=None,
                priors=None,
                current_response=None
            )
            effects, new_chorus_state = await self.run_chorus_cycle(chorus_state, prompt)

        return new_state, effects

    async def run_chorus_cycle(self, state: ChorusState, input: str) -> Tuple[List[Effect], ChorusState]:
        logger.info(f"Starting chorus cycle with input: {input}")
        effects = []
        new_state = state.copy(deep=True)

        while new_state.current_step != StepEnum.YIELD:
            logger.info(f"Running step: {new_state.current_step}")
            new_state, step_effects = await self.run_step(new_state, input)
            effects.extend(step_effects)

        return effects, new_state

    async def run_step(self, state: ChorusState, input: str) -> Tuple[ChorusState, List[Effect]]:
        logger.info(f"Running step {state.current_step} with input: {input}")
        effects = []
        new_state = state.copy(deep=True)

        step_function = getattr(self, f"run_{state.current_step.value}")
        logger.info(f"Calling step function: {step_function.__name__}")

        # Call step function with correct arguments
        if state.current_step == StepEnum.EXPERIENCE:
            response, priors = await step_function(input, state.messages, state.priors)
            logger.info(f"Experience step response: {response}, priors: {len(priors) if priors else 0}")
        else:
            response = await step_function(input, state.messages)
            priors = None
            logger.info(f"Step response: {response}")

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
                logger.info("Looping back to ACTION step")
            else:
                new_state.current_step = StepEnum.YIELD  # Move to final step
                logger.info("Moving to YIELD step")
        elif state.current_step != StepEnum.YIELD:
            # Normal progression for other steps
            new_state.current_step = StepEnum(list(StepEnum)[list(StepEnum).index(state.current_step) + 1].value)
            logger.info(f"Moving to next step: {new_state.current_step}")

        return new_state, effects

    async def run_action(self, input: str, messages: List[Message]) -> str:
        logger.info("Running ACTION step")
        action_prompt = """
        This is the Chorus Loop, a decision-making model that turns the OODA loop on its head.
        Rather than accumulating data before acting, you act with "beginner's mind"/emptiness,
        then reflect on your "System 1" action.
        This is step 1, Action: Provide an initial response to the user's prompt to the best of your ability.

        Respond in this JSON format:
        {
            "proposed_response": "Your initial response here",
            "confidence": 0.8,  // A number between 0 and 1
            "reasoning": "Brief explanation of your response"
        }
        """
        messages = [
            {"role": "system", "content": action_prompt},
            {"role": "user", "content": input}
        ]
        logger.info(f"Action messages: {messages}")
        result = await structured_chat_completion(
            messages,
            self.config,
            response_format={"type": "json_object"}
        )
        logger.info(f"Action result: {result}")
        try:
            content = json.loads(result["content"])
            return content.get("proposed_response", result["content"])
        except:
            return result["content"]

    async def run_experience(self, input: str, messages: List[Message], priors: Optional[List[Dict[str, Any]]] = None) -> Tuple[str, List[Dict[str, Any]]]:
        logger.info("Running EXPERIENCE step")
        experience_prompt = """
        This is step 2 of the Chorus Loop, Experience: Search your memory for relevant context that could help refine the response from step 1.

        Respond in this JSON format:
        {
            "synthesis": "Your refined response incorporating the context",
            "key_insights": ["List of key insights from the sources"],
            "source_relevance": {
                "most_relevant": ["Source numbers of most relevant sources"],
                "reasoning": "Why these sources were most relevant"
            }
        }
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
            response_format={"type": "json_object"}
        )
        try:
            content = json.loads(result["content"])
            return content.get("synthesis", result["content"]), retrieved_priors
        except:
            return result["content"], retrieved_priors

    async def run_intention(self, input: str, messages: List[Message]) -> str:
        logger.info("Running INTENTION step")
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
        logger.info("Running OBSERVATION step")
        observation_prompt = """
        This is step 4 of the Chorus Loop, Observation: Reflect on your analysis and intentions.
        Identify any gaps in your knowledge or potential biases.
        Return your response containing your observations and reflections.

        Respond in this JSON format:
        {
            "patterns": ["List of observed patterns"],
            "context_analysis": "Your analysis of the context",
            "user_state": "Your assessment of user state",
            "confidence": 0.8  // A number between 0 and 1
        }
        """
        messages = [
            {"role": "system", "content": observation_prompt},
            {"role": "user", "content": input}
        ]
        result = await structured_chat_completion(
            messages,
            self.config,
            response_format={"type": "json_object"}
        )
        try:
            content = json.loads(result["content"])
            return content["context_analysis"]
        except Exception as e:
            logger.error(f"Error parsing observation response: {e}")
            return "Error making observations"

    async def run_update(self, input: str, messages: List[Message]) -> Dict[str, Any]:
        logger.info("Running UPDATE step")
        update_prompt = """
        This is step 5 of the Chorus Loop, Update: Based on your observations,
        decide whether to proceed with your current plan or loop back for further refinement.
        You must make a binary choice:
        - Return loop: true if you need another iteration through the cycle
        - Return loop: false if you're ready to yield the final response
        Explain your reasoning for this decision.

        Respond in this JSON format:
        {
            "loop": true,  // or false
            "reasoning": "Explanation for the decision",
            "confidence": 0.8,  // A number between 0 and 1
            "key_insights": ["List of key insights that led to this decision"]
        }
        """
        messages = [
            {"role": "system", "content": update_prompt},
            {"role": "user", "content": input}
        ]
        result = await structured_chat_completion(
            messages,
            self.config,
            response_format={"type": "json_object"}
        )
        try:
            content = json.loads(result["content"])
            return {
                "loop": content["loop"],
                "reasoning": content["reasoning"],
                "insights": content.get("key_insights", []),
                "confidence": content.get("confidence", 0.5)
            }
        except Exception as e:
            logger.error(f"Error parsing update response: {e}")
            return {"loop": False, "reasoning": "Error in update step"}

    async def run_yield(self, input: str, messages: List[Message]) -> str:
        logger.info("Running YIELD step")
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

    async def _commit_message(self, role: str, content: str, step: str, thread_id: str, embedding: Optional[List[float]] = None):
        """Record a message in the database with the given role, content, and step."""
        if embedding is None:
            embedding = await get_embedding(content, self.config.EMBEDDING_MODEL)

        if not embedding:
            logger.error("Failed to generate embedding for the message.")
            return

        message = Message(
            id=str(uuid.uuid4()),
            thread_id=thread_id,
            role=role,
            content=content,
            created_at=datetime.now(UTC).isoformat(),
            vector=embedding,
            step=step
        )
        await self.database.save_message(message)
