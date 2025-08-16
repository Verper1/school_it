from sqlalchemy.orm import Session
from server.models import ContactFormDB
from server.schemas import InsertContactForm

def create_contact_form(db: Session, form_data: InsertContactForm) -> ContactFormDB:
    contact = ContactFormDB(
        full_name=form_data.full_name,
        phone=form_data.phone,
        email=form_data.email,
        agreed_to_terms=form_data.agreed_to_terms,
    )
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact

