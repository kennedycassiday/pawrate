from fastapi import FastAPI
from src.routers import dogs
from src.database import create_db_and_tables


app = FastAPI()
app.include_router(dogs.router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
async def root():
    return {"message": "test test"}

app.include_router(dogs.router)
