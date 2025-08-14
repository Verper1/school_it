from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List
from uuid import UUID

from server.models import InsertContactForm, Course
from server.storage import storage

router = APIRouter()

class InsertApplicationSchema(BaseModel):
    user_id: UUID
    course_id: UUID

# Работа с пользователями
@router.post("/users/", response_model=dict)
async def create_user(user: dict):
    # Валидацию и типизацию лучше здесь делать с Pydantic-BaseModel,
    # но для примера можно так:
    insert_user = user
    # Проверяем уникальность username
    all_users = storage.users.values()
    if any(u.username == insert_user.get("username") for u in all_users):
        raise HTTPException(status_code=400, detail="Username already taken")

    new_user = await storage.createUser(insert_user)
    return new_user

@router.get("/users/{user_id}", response_model=dict)
async def get_user(user_id: UUID):
    user = await storage.getUser(str(user_id))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/users", response_model=List[dict])
async def list_users():
    return list(storage.users.values())

# Курсы
@router.get("/api/courses", response_model=List[Course])
async def get_courses():
    courses = await storage.getCoursesDict()
    return courses

@router.get("/api/courses/{course_id}", response_model=dict)
async def get_course(course_id: UUID):
    course = await storage.getCourse(str(course_id))
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course.model_dump()


@router.get("/courses/category/{category}", response_model=List[dict])
async def get_courses_by_category(category: str):
    return await storage.getCoursesByCategory(category)

@router.get("/courses/subject/{subject}", response_model=List[dict])
async def get_courses_by_subject(subject: str):
    return await storage.getCoursesBySubject(subject)

# Учителя
@router.get("/api/teachers", response_model=List[dict])
async def get_teachers():
    return await storage.getTeachersDict()

@router.get("/api/teachers/{teacher_id}", response_model=dict)
async def get_teacher(teacher_id: UUID):
    teachers = await storage.getTeachersDict()
    t = next((t for t in teachers if t['id'] == str(teacher_id)), None)
    if not t:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return t

# Заявки
@router.post("/applications/", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_application(application_data: InsertApplicationSchema):
    user = await storage.getUser(str(application_data.user_id))
    if not user:
        raise HTTPException(status_code=400, detail="User does not exist")

    course = await storage.getCourse(str(application_data.course_id))
    if not course:
        raise HTTPException(status_code=400, detail="Course does not exist")

    new_app = await storage.createApplication(application_data.model_dump())
    return new_app

@router.get("/applications/", response_model=List[dict])
async def get_applications():
    return await storage.getApplications()

@router.get("/applications/{application_id}", response_model=dict)
async def get_application(application_id: UUID):
    app = await storage.getApplication(str(application_id))
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app

@router.post("/contact_form", response_model=dict, status_code=201)
async def create_contact_form(form_data: InsertContactForm):
    new_form = await storage.createContactForm(form_data)
    return new_form
