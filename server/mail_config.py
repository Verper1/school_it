"""
Конфигурация email сервера для Backend онлайн школы S2S.

Этот модуль содержит настройки для подключения к SMTP серверу
и отправки email уведомлений через FastAPI Mail.
"""

from fastapi_mail import ConnectionConfig
from pydantic_settings import BaseSettings, SettingsConfigDict


class MailSettings(BaseSettings):
    """
    Настройки email сервера.
    
    Класс для загрузки настроек email из переменных окружения
    или .env файла. Все поля обязательны для корректной работы.
    
    Attributes:
        MAIL_USERNAME: Имя пользователя для SMTP аутентификации
        MAIL_PASSWORD: Пароль для SMTP аутентификации
        MAIL_FROM: Email адрес отправителя
        MAIL_SERVER: SMTP сервер для отправки писем
        MAIL_PORT: Порт SMTP сервера
        MAIL_STARTTLS: Использовать STARTTLS (по умолчанию False)
        MAIL_SSL_TLS: Использовать SSL/TLS (по умолчанию True)
    """
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_SERVER: str
    MAIL_PORT: int
    MAIL_STARTTLS: bool = False
    MAIL_SSL_TLS: bool = True

    # Конфигурация для загрузки настроек из .env файла
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


# Создаем экземпляр настроек email
mail_settings = MailSettings()

# Создаем конфигурацию подключения для FastAPI Mail
conf = ConnectionConfig(
    MAIL_USERNAME=mail_settings.MAIL_USERNAME,
    MAIL_PASSWORD=mail_settings.MAIL_PASSWORD,
    MAIL_FROM=mail_settings.MAIL_FROM,
    MAIL_SERVER=mail_settings.MAIL_SERVER,
    MAIL_PORT=mail_settings.MAIL_PORT,
    MAIL_STARTTLS=mail_settings.MAIL_STARTTLS,
    MAIL_SSL_TLS=mail_settings.MAIL_SSL_TLS,
    USE_CREDENTIALS=True,  # Использовать аутентификацию
)
