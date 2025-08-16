"""
Утилиты для отправки email в Backend онлайн школы S2S.

Этот модуль содержит функции для отправки email уведомлений
при получении контактных форм от пользователей.
"""

from fastapi_mail import FastMail, MessageSchema
from server.mail_config import conf
from server.schemas import InsertContactForm


async def send_contact_form_email(form_data: InsertContactForm):
    """
    Отправляет email уведомление о новой контактной форме.
    
    Функция создает и отправляет email с информацией о новой
    контактной форме, полученной от пользователя. Отправка
    происходит асинхронно и не блокирует основной поток.
    
    Args:
        form_data: Данные контактной формы для отправки
        
    Note:
        Функция обрабатывает ошибки отправки email и логирует их,
        но не прерывает выполнение основного приложения.
        
    Example:
        # Вызов в background task
        background_tasks.add_task(send_contact_form_email, form_data)
    """
    try:
        # Формируем тему письма
        subject = "Новая заявка на курс!"
        
        # Формируем тело письма с данными формы
        body = f"""
        Имя: {form_data.full_name}
        Телефон: {form_data.phone}
        Email: {form_data.email}
        """
        
        # Создаем объект сообщения
        message = MessageSchema(
            subject=subject,
            recipients=[conf.MAIL_FROM],  # Отправляем на адрес администратора
            body=body,
            subtype="plain"  # Текстовый формат письма
        )
        
        # Создаем экземпляр FastMail и отправляем письмо
        fm = FastMail(conf)
        await fm.send_message(message)
        
    except Exception as e:
        # Логируем ошибку, но не аварийно прерываем выполнение
        # Это позволяет приложению продолжать работать даже при проблемах с email
        print(f"Ошибка отправки почты: {e}")
