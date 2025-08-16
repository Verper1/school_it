from fastapi import APIRouter, HTTPException, status, BackgroundTasks
from typing import List
from uuid import UUID

from server.email_utils import send_contact_form_email
from server.shemas import (
    InsertUser, User,
    Course,
    InsertApplication, Application,
    Teacher,
    InsertContactForm, ContactForm,
)
from server.storage import storage

router = APIRouter()

# Пользователи
@router.post("/api/users", response_model=User)
async def create_user(user: InsertUser):
    existing = await storage.getUserByUsername(user.username)
    if existing:
        raise HTTPException(status_code=400, detail="Username already taken")
    new_user = await storage.createUser(user)
    return new_user

@router.get("/api/users/{user_id}", response_model=User)
async def get_user(user_id: UUID):
    user = await storage.getUser(str(user_id))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/api/users", response_model=List[User])
async def list_users():
    return list(storage.users.values())

# Курсы
@router.get("/api/courses", response_model=List[Course])
async def get_courses():
    return await storage.getCourses()

@router.get("/api/courses/{course_id}", response_model=Course)
async def get_course(course_id: UUID):
    course = await storage.getCourse(str(course_id))
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.get("/api/courses/category/{category}", response_model=List[Course])
async def get_courses_by_category(category: str):
    return await storage.getCoursesByCategory(category)

@router.get("/api/courses/subject/{subject}", response_model=List[Course])
async def get_courses_by_subject(subject: str):
    return await storage.getCoursesBySubject(subject)

# Учителя
@router.get("/api/teachers", response_model=List[Teacher])
async def get_teachers():
    return await storage.getTeachers()

@router.get("/api/teachers/{teacher_id}", response_model=Teacher)
async def get_teacher(teacher_id: UUID):
    teacher = await storage.getTeacher(str(teacher_id))
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return teacher

# Заявки
@router.post("/api/applications", response_model=Application, status_code=status.HTTP_201_CREATED)
async def create_application(application: InsertApplication):
    user = await storage.getUser(str(application.user_id))
    if not user:
        raise HTTPException(status_code=400, detail="User does not exist")

    course = await storage.getCourse(str(application.course_id))
    if not course:
        raise HTTPException(status_code=400, detail="Course does not exist")

    new_app = await storage.createApplication(application)
    return new_app

@router.get("/api/applications", response_model=List[Application])
async def get_applications():
    return await storage.getApplications()

@router.get("/api/applications/{application_id}", response_model=Application)
async def get_application(application_id: UUID):
    app = await storage.getApplication(str(application_id))
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app

# Контактная форма
@router.post("/contact_form", response_model=ContactForm, status_code=201)
async def create_contact_form(form_data: InsertContactForm, background_tasks: BackgroundTasks):
    new_form = await storage.createContactForm(form_data)
    # Запускаем отправку письма в фоне
    background_tasks.add_task(send_contact_form_email, form_data)
    return new_form
