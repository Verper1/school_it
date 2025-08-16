"""
API маршруты для Backend онлайн школы S2S.

Этот модуль содержит все API endpoints для управления:
- Пользователями
- Курсами
- Преподавателями
- Заявками на курсы
- Контактными формами
"""

from fastapi import APIRouter, HTTPException, status, BackgroundTasks, Depends
from typing import List
from uuid import UUID

from sqlalchemy.orm import Session

from server.crud import create_contact_form
from server.database import get_db
from server.email_utils import send_contact_form_email
from server.schemas import (
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
    """
    Создает нового пользователя.
    
    Args:
        user: Данные для создания пользователя
        
    Returns:
        User: Созданный пользователь
        
    Raises:
        HTTPException: Если имя пользователя уже занято
    """
    existing = await storage.getUserByUsername(user.username)
    if existing:
        raise HTTPException(status_code=400, detail="Username already taken")
    new_user = await storage.createUser(user)
    return new_user

@router.get("/api/users/{user_id}", response_model=User)
async def get_user(user_id: UUID):
    """
    Получает информацию о пользователе по ID.
    
    Args:
        user_id: UUID пользователя
        
    Returns:
        User: Информация о пользователе
        
    Raises:
        HTTPException: Если пользователь не найден
    """
    user = await storage.getUser(str(user_id))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/api/users", response_model=List[User])
async def list_users():
    """
    Получает список всех пользователей.
    
    Returns:
        List[User]: Список всех пользователей
    """
    return list(storage.users.values())

# Курсы
@router.get("/api/courses", response_model=List[Course])
async def get_courses():
    """
    Получает список всех курсов.
    
    Returns:
        List[Course]: Список всех курсов
    """
    return await storage.getCourses()

@router.get("/api/courses/{course_id}", response_model=Course)
async def get_course(course_id: UUID):
    """
    Получает информацию о курсе по ID.
    
    Args:
        course_id: UUID курса
        
    Returns:
        Course: Информация о курсе
        
    Raises:
        HTTPException: Если курс не найден
    """
    course = await storage.getCourse(str(course_id))
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.get("/api/courses/category/{category}", response_model=List[Course])
async def get_courses_by_category(category: str):
    """
    Получает список курсов по категории.
    
    Args:
        category: Категория курсов (например: "ЕГЭ", "ОГЭ", "Олимпиада")
        
    Returns:
        List[Course]: Список курсов указанной категории
    """
    return await storage.getCoursesByCategory(category)

@router.get("/api/courses/subject/{subject}", response_model=List[Course])
async def get_courses_by_subject(subject: str):
    """
    Получает список курсов по предмету.
    
    Args:
        subject: Предмет курсов (например: "Математика", "Физика")
        
    Returns:
        List[Course]: Список курсов указанного предмета
    """
    return await storage.getCoursesBySubject(subject)

# Учителя
@router.get("/api/teachers", response_model=List[Teacher])
async def get_teachers():
    """
    Получает список всех преподавателей.
    
    Returns:
        List[Teacher]: Список всех преподавателей
    """
    return await storage.getTeachers()

@router.get("/api/teachers/{teacher_id}", response_model=Teacher)
async def get_teacher(teacher_id: UUID):
    """
    Получает информацию о преподавателе по ID.
    
    Args:
        teacher_id: UUID преподавателя
        
    Returns:
        Teacher: Информация о преподавателе
        
    Raises:
        HTTPException: Если преподаватель не найден
    """
    teacher = await storage.getTeacher(str(teacher_id))
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return teacher

# Заявки
@router.post("/api/applications", response_model=Application, status_code=status.HTTP_201_CREATED)
async def create_application(application: InsertApplication):
    """
    Создает новую заявку на курс.
    
    Args:
        application: Данные для создания заявки
        
    Returns:
        Application: Созданная заявка
        
    Raises:
        HTTPException: Если пользователь или курс не существуют
    """
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
    """
    Получает список всех заявок на курсы.
    
    Returns:
        List[Application]: Список всех заявок
    """
    return await storage.getApplications()

@router.get("/api/applications/{application_id}", response_model=Application)
async def get_application(application_id: UUID):
    """
    Получает информацию о заявке по ID.
    
    Args:
        application_id: UUID заявки
        
    Returns:
        Application: Информация о заявке
        
    Raises:
        HTTPException: Если заявка не найдена
    """
    app = await storage.getApplication(str(application_id))
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app

# Контактная форма
@router.post("/api/contact_form", response_model=ContactForm, status_code=status.HTTP_201_CREATED)
async def create_contact_form_endpoint(
    form_data: InsertContactForm,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Создает новую контактную форму и отправляет email уведомление.

    Args:
        form_data: Данные контактной формы
        background_tasks: FastAPI background tasks для асинхронной отправки email
        db: Сессия базы данных

    Returns:
        ContactForm: Созданная контактная форма

    Raises:
        HTTPException: При ошибке сохранения в базу данных
    """
    try:
        contact_record = create_contact_form(db, form_data)
        # print('Пенис')
    except Exception as e:
        # Логируем ошибку подключения/записи, но не даём падать приложению
        print(f"Ошибка при сохранении контактной формы в БД: {e}")
        # Можем вернуть минимальный ответ или ошибку, но сайт продолжит работу
        raise HTTPException(status_code=500, detail="Ошибка сервера при сохранении данных")

    # Отправка письма в фоне с обработкой ошибок внутри самой фоновой задачи
    background_tasks.add_task(send_contact_form_email, form_data)

    return contact_record
