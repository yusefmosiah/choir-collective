from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class User(BaseModel):
    id: str
    public_key: str
    created_at: str
    chat_threads: List[str] = Field(default_factory=list)

class Message(BaseModel):
    id: str
    thread_id: str
    content: str
    author: str
    created_at: str
    vector: List[float] = Field(default_factory=list)

class Thread(BaseModel):
    id: str
    name: str
    created_at: str
    user_id: str
    messages: List[str] = Field(default_factory=list)
    vector: List[float] = Field(default_factory=list)

class ChorusStep(BaseModel):
    step: str
    content: str
