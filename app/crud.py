from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from models import User
from schemas import UserCreate
import random


def generate_code(length=6):
    return ''.join(str(random.randint(0, 9)) for _ in range(length))

async def create_user(db: AsyncSession, user: UserCreate):
    new_user = User(
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        is_verified=False,
        verification_code=generate_code()
    )
    db.add(new_user)
    try:
        await db.commit()
        await db.refresh(new_user)
        return new_user
    except IntegrityError:
        await db.rollback()
        return None

async def get_user_by_email(db: AsyncSession, email: str):
    result = await db.execute(select(User).where(User.email == email))
    return result.scalars().first()

async def set_verification_code(db: AsyncSession, user: User):
    user.verification_code = generate_code()
    await db.commit()
    await db.refresh(user)
    return user.verification_code

async def verify_user(db: AsyncSession, email: str, code: str):
    user = await get_user_by_email(db, email)
    if user and user.verification_code == code:
        user.is_verified = True
        user.verification_code = None
        await db.commit()
        return True
    return False
