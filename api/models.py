from pydantic import BaseModel, validator
from typing import Set, List, Optional, Union, Dict, Any
from datetime import datetime
from enum import Enum

class StepEnum(str, Enum):
    ACTION = "action"
    EXPERIENCE = "experience"
    INTENTION = "intention"
    OBSERVATION = "observation"
    UPDATE = "update"
    YIELD = "yield"

class BaseState(BaseModel):
    id: str
    created_at: datetime
    updated_at: datetime
    version: int

    def validate_state(self):
        # Validation logic
        pass

    def transition_to(self, new_state: 'BaseState'):
        # Transition logic
        pass

class Thread(BaseState):
    co_authors: Set[str]
    messages: List['Message']
    token_balance: int
    status: 'ThreadStatus'

    @validator('co_authors')
    def validate_co_authors(cls, v):
        if not v:
            raise ValueError("Thread must have at least one co-author")
        return v

class Message(BaseState):
    content: str
    author: str
    approvals: Set['Approval']
    status: 'MessageStatus'
    thread_id: str

    @validator('content')
    def validate_content(cls, v):
        if not v.strip():
            raise ValueError("Content cannot be empty")
        if len(v) > 1000:  # Example max length
            raise ValueError("Content exceeds maximum length")
        return v

class ThreadStatus(str, Enum):
    ACTIVE = "active"
    CLOSED = "closed"

class MessageStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class Approval(BaseModel):
    co_author: str
    timestamp: datetime

class ConnectionState(BaseModel):
    client_id: str
    user: Optional[Dict[str, Any]]
    thread_id: Optional[str]
    status: str
    error_state: Optional[Dict[str, Any]]

class ClientMessage(BaseModel):
    type: str
    data: Dict[str, Any]

class ServerMessage(BaseModel):
    type: str
    data: Dict[str, Any]

class Effect(BaseModel):
    type: str
    payload: Dict[str, Any]

class ChorusState(BaseModel):
    messages: List[Message]
    current_step: StepEnum
    thread_id: str
    error_state: Optional[Dict[str, Any]]

class User(BaseModel):
    id: str
    public_key: str
    created_at: str
    chat_threads: List[str]

class ActionResponse(BaseModel):
    initial_thoughts: str
    proposed_response: str
    confidence: float

class ExperienceResponse(BaseModel):
    relevant_experiences: List[str]
    synthesis: str
    confidence: float

class IntentionResponse(BaseModel):
    explicit_intent: str
    implicit_intent: str
    confidence: float
    key_drivers: List[str]

class ObservationResponse(BaseModel):
    patterns: List[str]
    context_analysis: str
    user_state: str
    confidence: float

class UpdateResponse(BaseModel):
    understanding_delta: str
    key_insights: List[str]
    next_steps: List[str]
    confidence: float

class YieldResponse(BaseModel):
    final_response: str
    reasoning: str
    confidence: float
    sources_used: Optional[List[str]] = None
