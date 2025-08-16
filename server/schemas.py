from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from uuid import UUID
from datetime import datetime

# Модель пользователя для ответов API
class User(BaseModel):
    id: UUID
    username: str
    full_name: Optional[str]

# Модель для создания пользователя (входные данные)
class InsertUser(BaseModel):
    username: str
    full_name: Optional[str]

# Модель достижения учителя
class Achievement(BaseModel):
    icon: str
    text: str

# Модель учителя
class Teacher(BaseModel):
    id: UUID
    name: str
    subject: str
    achievements: List[Achievement]
    quote: str
    image_url: Optional[str] = Field(None, alias="imageUrl")

# Модель курса
class Course(BaseModel):
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

# Модель заявки на курс (ответ)
class Application(BaseModel):
    id: UUID
    user_id: UUID
    course_id: UUID
    created_at: datetime

# Модель заявки на курс (входные данные)
class InsertApplication(BaseModel):
    user_id: UUID
    course_id: UUID

# Модель контактной формы (ответ)
class ContactForm(BaseModel):
    id: UUID
    full_name: str
    phone: str
    email: EmailStr
    agreed_to_terms: bool

# Модель контактной формы (входные данные)
class InsertContactForm(BaseModel):
    full_name: str
    phone: str
    email: EmailStr
    agreed_to_terms: bool