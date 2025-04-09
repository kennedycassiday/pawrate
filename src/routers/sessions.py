from fastapi import APIRouter
from sqlmodel import Session, select
from src.models import BreathingSession
from src.database import engine
from datetime import datetime

router = APIRouter(
    prefix="/sessions",
    tags=["sessions"]
)

@router.post("")
def create_session(breathing_session: BreathingSession):
    if isinstance(breathing_session.timestamp, str):
        breathing_session.timestamp = datetime.fromisoformat(breathing_session.timestamp.replace('Z', '+00:00'))
    with Session(engine) as session:
        session.add(breathing_session)
        session.commit()
        session.refresh(breathing_session)
        return breathing_session
