from typing import Optional
from datetime import datetime, UTC
from sqlmodel import Field, SQLModel

class Dog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    breed: Optional[str] = None

class BreathingSession(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    dog_id: int = Field(foreign_key="dog.id")
    timestamp: datetime = Field(default_factory=lambda: datetime.now(UTC))
    breath_count: int
    duration_secs: int
    rate_bpm: int
