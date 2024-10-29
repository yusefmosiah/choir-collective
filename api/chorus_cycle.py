from typing import Tuple, List, Dict, Any
from .models import ConnectionState, ClientMessage, ServerMessage, Effect, ChorusState, StepEnum, Message
from .database import DatabaseClient
from .utils import chat_completion, get_embedding
from .config import Config

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
        response = await step_function(input, state.messages)
        effects.append(Effect(type="chorus_response", payload={"step": state.current_step.value, "content": response}))

        if state.current_step != StepEnum.YIELD:
            new_state.current_step = StepEnum(list(StepEnum)[list(StepEnum).index(state.current_step) + 1].value)

        return new_state, effects

    async def run_action(self, input: str, messages: List[Message]) -> str:
        messages = [{"role": "user", "content": input}]
        response = await chat_completion(messages, self.config.CHAT_MODEL, self.config.MAX_TOKENS, self.config.TEMPERATURE)
        return response

    async def run_experience(self, input: str, messages: List[Message]) -> str:
        embedding = await get_embedding(input, self.config.EMBEDDING_MODEL)
        sources = await self.database.search_similar(self.config.MESSAGES_COLLECTION, embedding, self.config.SEARCH_LIMIT)
        context = "\n".join([f"Source {i+1}: {source['content']}" for i, source in enumerate(sources)])
        messages = [
            {"role": "system", "content": "You are an AI assistant. Use the following sources to inform your response:"},
            {"role": "user", "content": f"Sources:\n{context}\n\nUser query: {input}"}
        ]
        response = await chat_completion(messages, self.config.CHAT_MODEL, self.config.MAX_TOKENS, self.config.TEMPERATURE)
        return response

    async def run_intention(self, input: str, messages: List[Message]) -> str:
        intention_prompt = f"Based on the user's input and previous messages, what is the user's intention? User input: {input}"
        messages = [{"role": "user", "content": intention_prompt}]
        response = await chat_completion(messages, self.config.CHAT_MODEL, self.config.MAX_TOKENS, self.config.TEMPERATURE)
        return response

    async def run_observation(self, input: str, messages: List[Message]) -> str:
        observation_prompt = f"Analyze the conversation so far and make observations about the user's needs and the context. User input: {input}"
        messages = [{"role": "user", "content": observation_prompt}]
        response = await chat_completion(messages, self.config.CHAT_MODEL, self.config.MAX_TOKENS, self.config.TEMPERATURE)
        return response

    async def run_update(self, input: str, messages: List[Message]) -> str:
        update_prompt = f"Based on the observations and intentions, how should we update our understanding of the user's needs? User input: {input}"
        messages = [{"role": "user", "content": update_prompt}]
        response = await chat_completion(messages, self.config.CHAT_MODEL, self.config.MAX_TOKENS, self.config.TEMPERATURE)
        return response

    async def run_yield(self, input: str, messages: List[Message]) -> str:
        yield_prompt = f"Provide a final response to the user based on all previous steps. User input: {input}"
        messages = [{"role": "user", "content": yield_prompt}]
        response = await chat_completion(messages, self.config.CHAT_MODEL, self.config.MAX_TOKENS, self.config.TEMPERATURE)
        return response

    async def handle_connection_error(self, error: Exception, state: ConnectionState) -> Tuple[ConnectionState, str]:
        new_state = state.copy(deep=True)
        new_state.error_state = {"message": str(error)}
        return new_state, f"An error occurred: {str(error)}"
