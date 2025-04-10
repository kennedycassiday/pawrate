from fastapi import APIRouter
from sqlmodel import Session, select
from src.models import BreathingSession
from src.database import engine
from datetime import datetime

router = APIRouter(
    prefix="/sessions",
    tags=["sessions"]
)

def timestamp_conversion(timestamp):
    return datetime.fromisoformat(timestamp.replace('Z', '+00:00'))

@router.post("")
def create_session(breathing_session: BreathingSession):
    if isinstance(breathing_session.timestamp, str):
        breathing_session.timestamp = timestamp_conversion(breathing_session.timestamp)
    with Session(engine) as session:
        session.add(breathing_session)
        session.commit()
        session.refresh(breathing_session)
        return breathing_session

@router.get("{dog_id}")
def get_sessions(dog_id):
    with Session(engine) as session:
        breathing_sessions = session.exec(select(BreathingSession).where(BreathingSession.dog_id == dog_id)).all()
        if not breathing_sessions:
            return {"error": "Session not found"}
        return breathing_sessions

@router.get("{dog_ig}/{id}")
def get_session(id):
    with Session(engine) as session:
        breathing_session = session.get(BreathingSession, id)
        if not breathing_session:
            return {"error": "Session not found"}
        return breathing_session
