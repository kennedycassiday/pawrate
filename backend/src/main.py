from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import dogs, sessions
from src.database import create_db_and_tables


app = FastAPI()
app.include_router(dogs.router)
app.include_router(sessions.router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
async def root():
    return {"message": "test test"}
