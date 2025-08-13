from pydantic import BaseSettings

class Settings(BaseSettings):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str

    SMTP_HOST: str          # SMTP сервер для отправки почты
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASSWORD: str
    SMTP_FROM_EMAIL: str    # От кого отправлять почту

    # Пример: API ключ SMS сервиса (если будет)
    SMS_API_KEY: str = None

    class Config:
        env_file = ".env"

settings = Settings()
