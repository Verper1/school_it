from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID
from datetime import datetime

class User(BaseModel):
    id: UUID
    username: str
    full_name: Optional[str] = None

class InsertUser(BaseModel):
    username: str
    full_name: Optional[str] = None

class Achievement(BaseModel):
    icon: str
    text: str

class Teacher(BaseModel):
    id: UUID
    name: str
    subject: str
    achievements: List[Achievement]
    quote: str
    image_url: Optional[str] = Field(None, alias="imageUrl")

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

class InsertApplication(BaseModel):
    user_id: UUID
    course_id: UUID

class Application(BaseModel):
    id: UUID
    user_id: UUID
    course_id: UUID
    created_at: datetime
