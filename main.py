from fastapi import FastAPI
from sqlmodel import SQLModel, Session, select
from models import Dog, BreathingSession
from database import create_db_and_tables, engine


app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
async def root():
    return {"message": "test test"}

@app.post("/dogs")
def create_dog(dog: Dog):
    with Session(engine) as session:
        session.add(dog)
        session.commit()
        session.refresh(dog)
        return dog

@app.get("/dogs")
def get_dogs():
    with Session(engine) as session:
        dogs = session.exec(select(Dog)).all()
        return dogs

@app.get("/dogs/{id}")
def get_dog(id):
    with Session(engine) as session:
        dog = session.exec(select(Dog).where(Dog.id==id)).one()
        if not dog:
            return {"error": "Dog not found"}
        return dog

@app.delete("/dogs/{id}")
def delete_dog(id):
    with Session(engine) as session:
        dog = session.exec(select(Dog).where(Dog.id==id)).one()
        if not dog:
            return {"error": "Dog not found"}
        session.delete(dog)
        session.commit()
        return {"Deleted dog": dog}
