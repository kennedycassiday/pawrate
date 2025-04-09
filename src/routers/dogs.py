from fastapi import APIRouter
from sqlmodel import Session, select
from src.models import Dog
from src.database import engine

router = APIRouter(
    prefix="/dogs",
    tags=["dogs"],
)

@router.post("")
def create_dog(dog: Dog):
    with Session(engine) as session:
        session.add(dog)
        session.commit()
        session.refresh(dog)
        return dog

@router.get("")
def get_dogs():
    with Session(engine) as session:
        dogs = session.exec(select(Dog)).all()
        return dogs

@router.get("/{id}")
def get_dog(id):
    with Session(engine) as session:
        dog = session.get(Dog, id)
        if not dog:
            return {"error": "Dog not found"}
        return dog

@router.delete("/{id}")
def delete_dog(id):
    with Session(engine) as session:
        dog = session.get(Dog, id)
        if not dog:
            return {"error": "Dog not found"}
        session.delete(dog)
        session.commit()
        return {"Deleted dog": dog}
