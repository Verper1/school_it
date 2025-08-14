from typing import List, Optional, Dict
from uuid import UUID, uuid4
from datetime import datetime, timezone
import json
from pathlib import Path
from server.models import User, InsertUser, Teacher, Course, Application, ContactForm, InsertContactForm

DATA_DIR = Path(__file__).parent
COURSES_FILE = DATA_DIR / "courses.json"
TEACHERS_FILE = DATA_DIR / "teachers.json"


class MemStorage:
    def __init__(self):
        self.users: Dict[UUID, User] = {}
        self.applications: Dict[UUID, Application] = {}
        self.courses: List[Course] = []
        self.teachers: List[Teacher] = []
        self.contact_forms: Dict[UUID, ContactForm] = {}
        self._load_data()

    def _load_data(self):
        with open(COURSES_FILE, encoding='utf-8') as f:
            courses_raw = json.load(f)
        self.courses = [Course.model_validate(c) for c in courses_raw]

        with open(TEACHERS_FILE, encoding='utf-8') as f:
            teachers_raw = json.load(f)
        self.teachers = [Teacher.model_validate(t) for t in teachers_raw]

    async def getCoursesDict(self) -> List[dict]:
        return [c.model_dump() for c in self.courses]

    async def getUser(self, user_id: str) -> Optional[User]:
        # user_id приходит как строка, конвертируем для ключа
        try:
            uid = UUID(user_id)
        except:
            return None
        return self.users.get(uid)

    async def getUserByUsername(self, username: str) -> Optional[User]:
        for user in self.users.values():
            if user.username == username:
                return user
        return None

    async def createUser(self, insert_user: InsertUser) -> User:
        # Проверка уникальности username должна происходить на уровне апи
        user_id = uuid4()
        user = User(id=user_id, **insert_user.model_dump())
        self.users[user_id] = user
        return user

    async def getCourses(self) -> List[Course]:
        return self.courses

    async def getCourse(self, course_id: str) -> Optional[Course]:
        try:
            cid = UUID(course_id)
        except:
            return None
        for c in self.courses:
            if c.id == cid:
                return c
        return None

    async def getCoursesByCategory(self, category: str) -> List[Course]:
        return [c for c in self.courses if c.category == category]

    async def getCoursesBySubject(self, subject: str) -> List[Course]:
        return [c for c in self.courses if c.subject == subject]

    async def createCourse(self, insert_course: dict) -> Course:
        # Генерируем уникальный UUID
        course_id = uuid4()
        # Допустим insert_course это словарь с нужными полями
        course = Course(id=course_id, **insert_course)
        self.courses.append(course)
        return course

    async def getTeacher(self, teacher_id: str) -> Optional[Teacher]:
        try:
            tid = UUID(teacher_id)
        except Exception:
            return None
        for teacher in self.teachers:
            if teacher.id == tid:
                return teacher
        return None

    async def createTeacher(self, insert_teacher: dict) -> Teacher:
        teacher_id = uuid4()
        teacher = Teacher(id=teacher_id, **insert_teacher)
        self.teachers.append(teacher)
        return teacher

    async def getTeachersDict(self) -> List[dict]:
        return [teacher.model_dump() for teacher in self.teachers]

    async def createApplication(self, insert_application: dict) -> Application:
        user_id = insert_application.get('user_id')
        course_id = insert_application.get('course_id')
        application_id = uuid4()
        now = datetime.now(timezone.utc)

        app_obj = Application(
            id=application_id,
            user_id=user_id,
            course_id=course_id,
            created_at=now
        )
        self.applications[application_id] = app_obj
        return app_obj

    async def getApplications(self) -> List[Application]:
        return list(self.applications.values())

    async def getApplication(self, application_id: str) -> Optional[Application]:
        try:
            aid = UUID(application_id)
        except:
            return None
        return self.applications.get(aid)

    async def createContactForm(self, form_data: InsertContactForm) -> ContactForm:
        form_id = uuid4()
        form_obj = ContactForm(
            id=form_id,
            full_name=form_data.full_name,
            phone=form_data.phone,
            email=form_data.email
        )
        self.contact_forms[form_id] = form_obj
        return form_obj

storage = MemStorage()
