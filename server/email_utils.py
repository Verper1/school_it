from fastapi_mail import FastMail, MessageSchema
from server.mail_config import conf
from server.schemas import InsertContactForm


async def send_contact_form_email(form_data: InsertContactForm):
    try:
        subject = "Новая заявка на курс!"
        body = f"""
        Имя: {form_data.full_name}
        Телефон: {form_data.phone}
        Email: {form_data.email}
        """
        message = MessageSchema(
            subject=subject,
            recipients=[conf.MAIL_FROM],
            body=body,
            subtype="plain"
        )
        fm = FastMail(conf)
        await fm.send_message(message)
    except Exception as e:
        # Логируем ошибку, но не аварийно прерываем выполнение
        print(f"Ошибка отправки почты: {e}")
