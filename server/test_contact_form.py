from uuid import UUID
from fastapi.testclient import TestClient
from main import app  # импорт вашего FastAPI приложения

client = TestClient(app)

def test_create_contact_form():
    response = client.post(
        "/api/contact_form",
        json={
            "full_name": "Иван Иванов",
            "phone": "+79001234567",
            "email": "ivan@example.com",
            "agreed_to_terms": True
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["full_name"] == "Иван Иванов"
    assert data["email"] == "ivan@example.com"

def test_get_teachers():
    response = client.get("/api/teachers")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        # Проверяем структуру первого преподавателя
        teacher = data[0]
        assert "id" in teacher
        assert UUID(teacher["id"])  # проверяем, что id - валидный UUID
        assert "name" in teacher
        assert "subject" in teacher
        assert "achievements" in teacher
        assert isinstance(teacher["achievements"], list)

def test_get_teacher_by_id():
    # Сначала получаем список учителей, чтобы взять валидный id
    response = client.get("/api/teachers")
    assert response.status_code == 200
    teachers = response.json()
    if teachers:
        teacher_id = teachers[0]["id"]
        response = client.get(f"/api/teachers/{teacher_id}")
        assert response.status_code == 200
        teacher = response.json()
        assert teacher["id"] == teacher_id
        assert "name" in teacher

def test_get_teacher_not_found():
    invalid_id = "00000000-0000-0000-0000-000000000000"
    response = client.get(f"/api/teachers/{invalid_id}")
    assert response.status_code == 404

def test_get_courses():
    response = client.get("/api/courses")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        course = data[0]
        assert "id" in course
        assert UUID(course["id"])
        assert "title" in course
        assert "subject" in course
        assert "category" in course

def test_get_course_by_id():
    response = client.get("/api/courses")
    assert response.status_code == 200
    courses = response.json()
    if courses:
        course_id = courses[0]["id"]
        response = client.get(f"/api/courses/{course_id}")
        assert response.status_code == 200
        course = response.json()
        assert course["id"] == course_id
        assert "title" in course

def test_get_course_not_found():
    invalid_id = "00000000-0000-0000-0000-000000000000"
    response = client.get(f"/api/courses/{invalid_id}")
    assert response.status_code == 404

def test_get_courses_by_category():
    # Здесь вы можете указать категорию, которая точно есть в данных, например "Олимпиады"
    category = "Олимпиада"
    response = client.get(f"/api/courses/category/{category}")
    assert response.status_code == 200
    courses = response.json()
    # Все возвращенные курсы должны иметь указанную категорию
    for course in courses:
        assert course["category"] == category

def test_get_courses_by_subject():
    # Укажите предмет, который гарантированно есть в данных, например "Физика"
    subject = "Физика"
    response = client.get(f"/api/courses/subject/{subject}")
    assert response.status_code == 200
    courses = response.json()
    for course in courses:
        assert course["subject"] == subject
