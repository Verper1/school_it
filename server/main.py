from fastapi import FastAPI
from server.routes import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(router)

origins = [
    "http://localhost:5000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

