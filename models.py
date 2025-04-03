from typing import Optional
from sqlmodel import Field, SQLModel

class Dog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    breed: Optional[str]

class BreathingSession(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    dog_id: int = Field(foreign_key="dog.id")
    timestamp: str
    breath_count: int
    duration_secs: int
    rate_bpm: int
