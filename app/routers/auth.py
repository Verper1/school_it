from fastapi import APIRouter, Request, Form, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas import UserCreate
from app.crud import create_user, verify_user, get_user_by_email, set_verification_code
from app.services.notifications import send_verification_code

router = APIRouter()
templates = Jinja2Templates(directory="templates")

@router.get("/register", response_class=HTMLResponse)
async def register_form(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})

@router.post("/register", response_class=HTMLResponse)
async def register(
    request: Request,
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    db: AsyncSession = Depends(get_db),
):
    user_in = UserCreate(full_name=full_name, email=email, phone=phone)
    user = await create_user(db, user_in)
    if user:
        # Отправляем код подтверждения (сначала SMS, если не удастся — email)
        method = await send_verification_code(user.phone, user.email, user.verification_code)
        message = f"Регистрация прошла успешно для {full_name}! Код подтверждения отправлен по {method.upper()}."
        # Перенаправим на страницу ввода кода подтверждения
        response = templates.TemplateResponse("verify.html", {"request": request, "email": email, "message": message})
        return response
    else:
        message = "Пользователь с такой почтой или телефоном уже существует."
        return templates.TemplateResponse("register.html", {"request": request, "message": message})

@router.get("/verify", response_class=HTMLResponse)
async def verify_form(request: Request, email: str):
    return templates.TemplateResponse("verify.html", {"request": request, "email": email})

@router.post("/verify", response_class=HTMLResponse)
async def verify(
    request: Request,
    email: str = Form(...),
    code: str = Form(...),
    db: AsyncSession = Depends(get_db),
):
    success = await verify_user(db, email, code)
    if success:
        message = "Пользователь успешно подтверждён! Теперь вы можете войти или использовать сервис."
        return templates.TemplateResponse("index.html", {"request": request, "message": message})
    else:
        message = "Неверный код подтверждения. Попробуйте снова."
        return templates.TemplateResponse("verify.html", {"request": request, "email": email, "message": message})
