from typing import List, Optional, Dict
from uuid import UUID, uuid4
from datetime import datetime, timezone
import json
from pathlib import Path

from server.shemas import (
    User, InsertUser,
    Teacher, Course,
    Application, InsertApplication,
    ContactForm, InsertContactForm
)

DATA_DIR = Path(__file__).parent
COURSES_FILE = DATA_DIR / "courses.json"
TEACHERS_FILE = DATA_DIR / "teachers.json"

class MemStorage:
    def __init__(self):
        # Словари для хранения в памяти
        self.users: Dict[UUID, User] = {}
        self.applications: Dict[UUID, Application] = {}
        self.courses: List[Course] = []
        self.teachers: List[Teacher] = []
        self.contact_forms: Dict[UUID, ContactForm] = {}
        self._load_data()

    def _load_data(self):
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
        try:
            uid = UUID(user_id)
        except Exception:
            return None
        return self.users.get(uid)

    async def getUserByUsername(self, username: str) -> Optional[User]:
        return next((u for u in self.users.values() if u.username == username), None)

    async def createUser(self, insert_user: InsertUser) -> User:
        user_id = uuid4()
        user = User(id=user_id, **insert_user.model_dump())
        self.users[user_id] = user
        return user

    # Методы курсов
    async def getCourses(self) -> List[Course]:
        return self.courses

    async def getCourse(self, course_id: str) -> Optional[Course]:
        try:
            cid = UUID(course_id)
        except Exception:
            return None
        return next((c for c in self.courses if c.id == cid), None)

    async def getCoursesByCategory(self, category: str) -> List[Course]:
        return [c for c in self.courses if c.category == category]

    async def getCoursesBySubject(self, subject: str) -> List[Course]:
        return [c for c in self.courses if c.subject == subject]

    # Методы учителей
    async def getTeachers(self) -> List[Teacher]:
        return self.teachers

    async def getTeacher(self, teacher_id: str) -> Optional[Teacher]:
        try:
            tid = UUID(teacher_id)
        except Exception:
            return None
        return next((t for t in self.teachers if t.id == tid), None)

    # Методы заявок
    async def createApplication(self, insert_application: InsertApplication) -> Application:
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
        return list(self.applications.values())

    async def getApplication(self, application_id: str) -> Optional[Application]:
        try:
            aid = UUID(application_id)
        except Exception:
            return None
        return self.applications.get(aid)

    # Методы контактной формы
    async def createContactForm(self, insert_contact_form: InsertContactForm) -> ContactForm:
        form_id = uuid4()
        form_obj = ContactForm(id=form_id, **insert_contact_form.model_dump())
        self.contact_forms[form_id] = form_obj
        return form_obj

    async def getContactForms(self) -> List[ContactForm]:
        return list(self.contact_forms.values())

# Создаем единственный экземпляр хранилища
storage = MemStorage()
