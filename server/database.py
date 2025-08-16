"""
Конфигурация базы данных для Backend онлайн школы S2S.

Этот модуль содержит настройки подключения к PostgreSQL базе данных
и создает SQLAlchemy engine и session factory.
"""

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os


# Загружаем переменные окружения из .env файла
load_dotenv()

# Получаем URL базы данных из переменных окружения
DATABASE_URL = os.getenv("DATABASE_URL")

# Создаем SQLAlchemy engine для подключения к базе данных
engine = create_engine(DATABASE_URL)

# Создаем фабрику сессий для работы с базой данных
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс для всех моделей SQLAlchemy
Base = declarative_base()


def get_db():
    """
    Генератор для получения сессии базы данных.
    
    Создает новую сессию базы данных и автоматически закрывает её
    после использования. Используется как dependency в FastAPI.
    
    Yields:
        Session: SQLAlchemy сессия для работы с базой данных
        
    Example:
        @app.post("/items/")
        def create_item(db: Session = Depends(get_db)):
            # Использование сессии базы данных
            pass
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
