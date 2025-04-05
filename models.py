from typing import Optional
from datetime import datetime, timezone
from sqlmodel import Field, SQLModel

class Dog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    breed: Optional[str] = None

class BreathingSession(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    dog_id: int = Field(foreign_key="dog.id")
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    breath_count: int
    duration_secs: int
    rate_bpm: int
