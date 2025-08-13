import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.main import app
from app.database import get_db, engine, Base
from app.models import User
from sqlalchemy import select



@pytest.fixture(scope="module", autouse=True)
async def prepare_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest.fixture
async def async_client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.mark.asyncio
async def test_register_success(async_client: AsyncClient):
    response = await async_client.post("/register", data={
        "full_name": "Иванов Иван Иванович",
        "email": "ivanov@mail.ru",
        "phone": "+79999999999"
    })
    assert response.status_code == 200
    assert "Код подтверждения отправлен" in response.text

@pytest.mark.asyncio
async def test_register_duplicate(async_client: AsyncClient):
    # Сначала регистрируем
    await async_client.post("/register", data={
        "full_name": "Петров Петр",
        "email": "petrov@mail.ru",
        "phone": "+79998887766"
    })
    # Повторная регистрация с таким же email
    response = await async_client.post("/register", data={
        "full_name": "Петров Петр Второй",
        "email": "petrov@mail.ru",
        "phone": "+70001112233"
    })
    assert response.status_code == 200
    assert "Пользователь с такой почтой или телефоном уже существует" in response.text

@pytest.mark.asyncio
async def test_verification_success(async_client: AsyncClient, db: AsyncSession = pytest.lazy_fixture('get_db')):
    # Регистрируем пользователя
    response = await async_client.post("/register", data={
        "full_name": "Сидоров Сидор",
        "email": "sidor@mail.ru",
        "phone": "+79001112233"
    })
    # Получаем код из БД
    user = await db.execute(select(User).where(User.email == "sidor@mail.ru"))
    user_obj = user.scalars().first()
    code = user_obj.verification_code

    # Посылаем запрос подтверждения
    response_verify = await async_client.post("/verify", data={
        "email": "sidor@mail.ru",
        "code": code
    })
    assert response_verify.status_code == 200
    assert "успешно подтверждён" in response_verify.text

@pytest.mark.asyncio
async def test_verification_fail(async_client: AsyncClient):
    response = await async_client.post("/verify", data={
        "email": "nonexistent@mail.ru",
        "code": "000000"
    })
    assert response.status_code == 200
    assert "Неверный код подтверждения" in response.text
