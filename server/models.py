from sqlalchemy import Column, String, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime
import uuid
from server.database import Base


class ContactFormDB(Base):
    __tablename__ = "contact_forms"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    agreed_to_terms = Column(Boolean, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
