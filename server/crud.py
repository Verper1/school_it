"""
CRUD операции для базы данных Backend онлайн школы S2S.

Этот модуль содержит функции для создания, чтения, обновления
и удаления записей в базе данных. В текущей версии используется
только для работы с контактными формами.
"""

from sqlalchemy.orm import Session
from server.models import ContactFormDB
from server.schemas import InsertContactForm


def create_contact_form(db: Session, form_data: InsertContactForm) -> ContactFormDB:
    """
    Создает новую запись контактной формы в базе данных.
    
    Args:
        db: SQLAlchemy сессия базы данных
        form_data: Данные контактной формы из Pydantic модели
        
    Returns:
        ContactFormDB: Созданная запись в базе данных
        
    Raises:
        SQLAlchemyError: При ошибках работы с базой данных
        
    Example:
        contact = create_contact_form(db, form_data)
        print(f"Создана контактная форма с ID: {contact.id}")
    """
    # Создаем новый объект ContactFormDB из данных формы
    contact = ContactFormDB(
        full_name=form_data.full_name,
        phone=form_data.phone,
        email=form_data.email,
        agreed_to_terms=form_data.agreed_to_terms,
    )
    
    # Добавляем запись в сессию и сохраняем в базе данных
    db.add(contact)
    db.commit()
    
    # Обновляем объект для получения сгенерированных полей (например, id)
    db.refresh(contact)
    
    return contact

