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

@router.get("/dog/{dog_id}")
def get_sessions(dog_id):
    with Session(engine) as session:
        breathing_sessions = session.exec(select(BreathingSession).where(BreathingSession.dog_id == dog_id)).all()
        if not breathing_sessions:
            return {"error": "Session not found"}
        return breathing_sessions

@router.get("/{id}")
def get_session(id):
    with Session(engine) as session:
        breathing_session = session.get(BreathingSession, id)
        if not breathing_session:
            return {"error": "Session not found"}
        return breathing_session

@router.put("/{id}")
def update_session(breathing_session: BreathingSession, id):
    with Session(engine) as session:
        db_session = session.get(BreathingSession, id)
        if not db_session:
            return {"error": "Session not found"}
    if isinstance(breathing_session.timestamp, str):
        breathing_session.timestamp = timestamp_conversion(breathing_session.timestamp)
        session_data = breathing_session.model_dump(exclude_unset=True)
        db_session.sqlmodel_update(session_data)
        session.add(db_session)
        session.commit()
        session.refresh(db_session)
        return db_session


@router.delete("/{id}")
def delete_session(id):
    with Session(engine) as session:
        breathing_session = session.get(BreathingSession, id)
        if not breathing_session:
            return {"error": "Session not found"}
        session.delete(breathing_session)
        session.commit()
        return {"Deleted session": breathing_session}
