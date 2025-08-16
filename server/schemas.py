"""
Pydantic модели данных для Backend онлайн школы S2S.

Этот модуль содержит все Pydantic модели для валидации входящих
и исходящих данных API endpoints.
"""

from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from uuid import UUID
from datetime import datetime


class User(BaseModel):
    """
    Модель пользователя для ответов API.
    
    Attributes:
        id: Уникальный идентификатор пользователя
        username: Имя пользователя (уникальное)
        full_name: Полное имя пользователя (опционально)
    """
    id: UUID
    username: str
    full_name: Optional[str]


class InsertUser(BaseModel):
    """
    Модель для создания пользователя (входные данные).
    
    Attributes:
        username: Имя пользователя (уникальное)
        full_name: Полное имя пользователя (опционально)
    """
    username: str
    full_name: Optional[str]


class Achievement(BaseModel):
    """
    Модель достижения учителя.
    
    Attributes:
        icon: Эмодзи или символ для отображения
        text: Текстовое описание достижения
    """
    icon: str
    text: str


class Teacher(BaseModel):
    """
    Модель учителя.
    
    Attributes:
        id: Уникальный идентификатор преподавателя
        name: Имя преподавателя
        subject: Предмет, который преподает
        achievements: Список достижений преподавателя
        quote: Мотивирующая цитата преподавателя
        image_url: URL фотографии преподавателя (опционально)
    """
    id: UUID
    name: str
    subject: str
    achievements: List[Achievement]
    quote: str
    image_url: Optional[str] = Field(None, alias="imageUrl")


class Course(BaseModel):
    """
    Модель курса.
    
    Attributes:
        id: Уникальный идентификатор курса
        title: Название курса
        description: Подробное описание курса
        subject: Предмет курса (Математика, Физика, Информатика, Астрономия)
        category: Категория курса (ЕГЭ, ОГЭ, Олимпиада, ВСОШ, Школьная программа)
        duration: Длительность курса (например: "9 месяцев")
        lessons: Количество уроков в курсе
        grades: Классы, для которых предназначен курс (например: "9–11 класс")
        features: Список особенностей и преимуществ курса
        original_price: Исходная цена курса
        current_price: Текущая цена курса (может быть со скидкой)
        is_popular: Флаг популярности курса
    """
    id: UUID
    title: str
    description: str
    subject: str
    category: str
    duration: str
    lessons: int
    grades: str
    features: List[str]
    original_price: float = Field(..., alias="original_price")
    current_price: float = Field(..., alias="current_price")
    is_popular: bool


class Application(BaseModel):
    """
    Модель заявки на курс (ответ).
    
    Attributes:
        id: Уникальный идентификатор заявки
        user_id: ID пользователя, подавшего заявку
        course_id: ID курса, на который подана заявка
        created_at: Дата и время создания заявки
    """
    id: UUID
    user_id: UUID
    course_id: UUID
    created_at: datetime


class InsertApplication(BaseModel):
    """
    Модель заявки на курс (входные данные).
    
    Attributes:
        user_id: ID пользователя, подающего заявку
        course_id: ID курса, на который подается заявка
    """
    user_id: UUID
    course_id: UUID


class ContactForm(BaseModel):
    """
    Модель контактной формы (ответ).
    
    Attributes:
        id: Уникальный идентификатор контактной формы
        full_name: Полное имя отправителя
        phone: Номер телефона отправителя
        email: Email адрес отправителя
        agreed_to_terms: Согласие с условиями использования
    """
    id: UUID
    full_name: str
    phone: str
    email: EmailStr
    agreed_to_terms: bool


class InsertContactForm(BaseModel):
    """
    Модель контактной формы (входные данные).
    
    Attributes:
        full_name: Полное имя отправителя
        phone: Номер телефона отправителя
        email: Email адрес отправителя
        agreed_to_terms: Согласие с условиями использования
    """
    full_name: str
    phone: str
    email: EmailStr
    agreed_to_terms: bool