"""
SQLAlchemy модели базы данных для Backend онлайн школы S2S.

Этот модуль содержит SQLAlchemy модели для работы с базой данных.
В текущей версии используется только модель ContactFormDB для контактных форм.
"""

from sqlalchemy import Column, String, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime
import uuid
from server.database import Base


class ContactFormDB(Base):
    """
    Модель базы данных для контактных форм.
    
    Эта таблица хранит все отправленные контактные формы
    с информацией об отправителе и согласии с условиями.
    
    Attributes:
        id: Уникальный идентификатор контактной формы (UUID)
        full_name: Полное имя отправителя
        phone: Номер телефона отправителя
        email: Email адрес отправителя
        agreed_to_terms: Согласие с условиями использования
        created_at: Дата и время создания записи (автоматически)
    """
    __tablename__ = "contact_forms"

    # Уникальный идентификатор записи
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Данные отправителя
    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    
    # Согласие с условиями
    agreed_to_terms = Column(Boolean, nullable=False)
    
    # Временная метка создания записи
    created_at = Column(DateTime(timezone=True), server_default=func.now())
