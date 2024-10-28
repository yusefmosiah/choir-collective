from typing import List, Dict, Any, Optional
from enum import Enum
from pydantic import BaseModel, Field, field_validator
from datetime import datetime
import json

class ChorusStepEnum(str, Enum):
    ACTION = "action"
    EXPERIENCE = "experience"
    INTENTION = "intention"
    OBSERVATION = "observation"
    UPDATE = "update"
    FINAL = "final"
    ERROR = "error"
class User(BaseModel):
    id: str
    public_key: str
    created_at: str
    vector: Optional[List[float]] = Field(default_factory=list)
    chat_threads: List[str] = Field(default_factory=list)

class ChatThread(BaseModel):
    id: str
    user_id: str
    name: str
    created_at: str
    messages: List[str] = Field(default_factory=list)
    vector: Optional[List[float]] = Field(default=None)

class Message(BaseModel):
    id: str                   # Changed from message_id to id
    thread_id: str
    role: str                 # 'user', 'assistant', or 'system'
    content: str
    created_at: str
    step: Optional[str] = None
    token_value: Optional[float] = None
    vector: Optional[List[float]] = None  # Include if you're storing vectors

class ChorusState:
    def __init__(self):
        self.messages: List[Message] = []
        self.current_step: ChorusStepEnum = ChorusStepEnum.ACTION
        self.is_complete: bool = False
        self.is_interrupted: bool = False

    def reset(self):
        self.__init__()

    def complete(self):
        self.is_complete = True

    def interrupt(self):
        self.is_interrupted = True

    def clear_interrupt(self):
        self.is_interrupted = False

    def loop(self):
        self.current_step = ChorusStepEnum.ACTION

class Source(BaseModel):
    id: str
    thread_id: Optional[str] = None  # Make thread_id optional
    content: str
    created_at: Optional[str] = None
    role: Optional[str] = None
    token_value: Optional[float] = None
    similarity: float

    model_config = {
        "json_encoders": {
            datetime: lambda v: v.isoformat() if v else None
        }
    }

class ChorusResponse(BaseModel):
    step: str
    content: str
    sources: Optional[List[Source]] = None

    model_config = {
        "json_encoders": {
            datetime: lambda v: v.isoformat() if v else None
        }
    }

    def to_json(self):
        return json.dumps(self.dict(), default=str)
