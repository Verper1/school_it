"""
Хранилище данных в памяти для Backend онлайн школы S2S.

Этот модуль предоставляет класс MemStorage для хранения данных в памяти
с загрузкой курсов и преподавателей из JSON файлов.
"""

from typing import List, Optional, Dict
from uuid import UUID, uuid4
from datetime import datetime, timezone
import json
from pathlib import Path

from server.schemas import (
    User, InsertUser,
    Teacher, Course,
    Application, InsertApplication,
    ContactForm, InsertContactForm
)


# Константы для путей к файлам данных
DATA_DIR = Path(__file__).parent
COURSES_FILE = DATA_DIR / "courses.json"
TEACHERS_FILE = DATA_DIR / "teachers.json"


class MemStorage:
    """
    Хранилище данных в памяти для быстрого доступа к данным.
    
    Загружает курсы и преподавателей из JSON файлов при инициализации
    и хранит пользователей, заявки и контактные формы в памяти.
    """
    
    def __init__(self):
        """
        Инициализирует хранилище и загружает данные из JSON файлов.
        
        Создает словари для хранения данных в памяти и загружает
        курсы и преподавателей из соответствующих JSON файлов.
        """
        # Словари для хранения в памяти
        self.users: Dict[UUID, User] = {}
        self.applications: Dict[UUID, Application] = {}
        self.courses: List[Course] = []
        self.teachers: List[Teacher] = []
        self.contact_forms: Dict[UUID, ContactForm] = {}
        self._load_data()

    def _load_data(self):
        """
        Загружает данные курсов и преподавателей из JSON файлов.
        
        Читает файлы courses.json и teachers.json, парсит JSON
        и создает объекты Pydantic моделей для валидации данных.
        """
        # Загрузка курсов из JSON
        with open(COURSES_FILE, encoding="utf-8") as f:
            courses_raw = json.load(f)
        self.courses = [Course.model_validate(c) for c in courses_raw]

        # Загрузка учителей из JSON
        with open(TEACHERS_FILE, encoding="utf-8") as f:
            teachers_raw = json.load(f)
        self.teachers = [Teacher.model_validate(t) for t in teachers_raw]

    # Методы пользователей
    async def getUser(self, user_id: str) -> Optional[User]:
        """
        Получает пользователя по ID.
        
        Args:
            user_id: Строковый ID пользователя
            
        Returns:
            Optional[User]: Пользователь или None, если не найден
        """
        try:
            uid = UUID(user_id)
        except Exception:
            return None
        return self.users.get(uid)

    async def getUserByUsername(self, username: str) -> Optional[User]:
        """
        Получает пользователя по имени пользователя.
        
        Args:
            username: Имя пользователя для поиска
            
        Returns:
            Optional[User]: Пользователь или None, если не найден
        """
        return next((u for u in self.users.values() if u.username == username), None)

    async def createUser(self, insert_user: InsertUser) -> User:
        """
        Создает нового пользователя.
        
        Args:
            insert_user: Данные для создания пользователя
            
        Returns:
            User: Созданный пользователь с новым UUID
        """
        user_id = uuid4()
        user = User(id=user_id, **insert_user.model_dump())
        self.users[user_id] = user
        return user

    # Методы курсов
    async def getCourses(self) -> List[Course]:
        """
        Получает список всех курсов.
        
        Returns:
            List[Course]: Список всех курсов
        """
        return self.courses

    async def getCourse(self, course_id: str) -> Optional[Course]:
        """
        Получает курс по ID.
        
        Args:
            course_id: Строковый ID курса
            
        Returns:
            Optional[Course]: Курс или None, если не найден
        """
        try:
            cid = UUID(course_id)
        except Exception:
            return None
        return next((c for c in self.courses if c.id == cid), None)

    async def getCoursesByCategory(self, category: str) -> List[Course]:
        """
        Получает курсы по категории.
        
        Args:
            category: Категория курсов для фильтрации
            
        Returns:
            List[Course]: Список курсов указанной категории
        """
        return [c for c in self.courses if c.category == category]

    async def getCoursesBySubject(self, subject: str) -> List[Course]:
        """
        Получает курсы по предмету.
        
        Args:
            subject: Предмет курсов для фильтрации
            
        Returns:
            List[Course]: Список курсов указанного предмета
        """
        return [c for c in self.courses if c.subject == subject]

    # Методы учителей
    async def getTeachers(self) -> List[Teacher]:
        """
        Получает список всех преподавателей.
        
        Returns:
            List[Teacher]: Список всех преподавателей
        """
        return self.teachers

    async def getTeacher(self, teacher_id: str) -> Optional[Teacher]:
        """
        Получает преподавателя по ID.
        
        Args:
            teacher_id: Строковый ID преподавателя
            
        Returns:
            Optional[Teacher]: Преподаватель или None, если не найден
        """
        try:
            tid = UUID(teacher_id)
        except Exception:
            return None
        return next((t for t in self.teachers if t.id == tid), None)

    # Методы заявок
    async def createApplication(self, insert_application: InsertApplication) -> Application:
        """
        Создает новую заявку на курс.
        
        Args:
            insert_application: Данные для создания заявки
            
        Returns:
            Application: Созданная заявка с новым UUID и временной меткой
        """
        application_id = uuid4()
        now = datetime.now(timezone.utc)
        app_obj = Application(
            id=application_id,
            user_id=insert_application.user_id,
            course_id=insert_application.course_id,
            created_at=now,
        )
        self.applications[application_id] = app_obj
        return app_obj

    async def getApplications(self) -> List[Application]:
        """
        Получает список всех заявок.
        
        Returns:
            List[Application]: Список всех заявок
        """
        return list(self.applications.values())

    async def getApplication(self, application_id: str) -> Optional[Application]:
        """
        Получает заявку по ID.
        
        Args:
            application_id: Строковый ID заявки
            
        Returns:
            Optional[Application]: Заявка или None, если не найдена
        """
        try:
            aid = UUID(application_id)
        except Exception:
            return None
        return self.applications.get(aid)

    # Методы контактной формы
    async def createContactForm(self, insert_contact_form: InsertContactForm) -> ContactForm:
        """
        Создает новую контактную форму.
        
        Args:
            insert_contact_form: Данные контактной формы
            
        Returns:
            ContactForm: Созданная контактная форма с новым UUID
        """
        form_id = uuid4()
        form_obj = ContactForm(id=form_id, **insert_contact_form.model_dump())
        self.contact_forms[form_id] = form_obj
        return form_obj

    async def getContactForms(self) -> List[ContactForm]:
        """
        Получает список всех контактных форм.
        
        Returns:
            List[ContactForm]: Список всех контактных форм
        """
        return list(self.contact_forms.values())


# Создаем единственный экземпляр хранилища для использования во всем приложении
storage = MemStorage()
