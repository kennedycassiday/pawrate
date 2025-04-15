from fastapi import APIRouter, HTTPException
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
            raise HTTPException(status_code=404, detail="Dog not found")
        return dog

@router.put("/{id}")
def update_dog(dog: Dog, id):
    with Session(engine) as session:
        db_dog = session.get(Dog, id)
        if not db_dog:
            raise HTTPException(status_code=404, detail="Dog not found")
        dog_data = dog.model_dump(exclude_unset=True)
        db_dog.sqlmodel_update(dog_data)
        session.add(db_dog)
        session.commit()
        session.refresh(db_dog)
        return db_dog


@router.delete("/{id}")
def delete_dog(id):
    with Session(engine) as session:
        dog = session.get(Dog, id)
        if not dog:
            raise HTTPException(status_code=404, detail="Dog not found")
        session.delete(dog)
        session.commit()
        return {"Deleted dog": dog}
