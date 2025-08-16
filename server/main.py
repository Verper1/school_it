"""
FastAPI приложение для Backend онлайн школы S2S.

Этот модуль содержит основное FastAPI приложение с настройкой CORS
и подключением всех API маршрутов.
"""

from fastapi import FastAPI

from server.database import Base, engine
from server.routes import router
from fastapi.middleware.cors import CORSMiddleware

# Создание экземпляра FastAPI приложения
app = FastAPI(
    title="Backend онлайн школы S2S",
    description="API для управления курсами, преподавателями и пользователями",
    version="1.0.0"
)

# Создаёт все модели
Base.metadata.create_all(bind=engine)

# Подключение API маршрутов
app.include_router(router)

# Настройка CORS для разрешения запросов с клиентского приложения
origins = [
    "http://localhost:5000",  # Основной порт приложения
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все HTTP методы
    allow_headers=["*"],  # Разрешаем все заголовки
)

