from app.core.config import settings
import asyncio
import aiosmtplib
from email.message import EmailMessage

# Пример функции отправки SMS
async def send_sms(phone: str, code: str):
    # Здесь должна быть ваша реализация по отправке SMS через API провайдера
    # Пример заглушки (симуляция успешной отправки):
    await asyncio.sleep(0.5)
    return True

async def send_email(to_email: str, code: str):
    message = EmailMessage()
    message["From"] = settings.SMTP_FROM_EMAIL
    message["To"] = to_email
    message["Subject"] = "Код подтверждения для регистрации"
    message.set_content(f"Ваш код подтверждения: {code}")

    await aiosmtplib.send(
        message,
        hostname=settings.SMTP_HOST,
        port=settings.SMTP_PORT,
        username=settings.SMTP_USER,
        password=settings.SMTP_PASSWORD,
        start_tls=True,
    )

async def send_verification_code(phone: str, email: str, code: str):
    try:
        await send_sms(phone, code)
        return "sms"
    except Exception:
        # Если отправка SMS не удалась, шлём email
        await send_email(email, code)
        return "email"
