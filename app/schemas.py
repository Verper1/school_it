from pydantic import BaseModel, EmailStr, constr

class UserCreate(BaseModel):
    full_name: constr(min_length=3, max_length=100)
    email: EmailStr
    phone: constr(min_length=10, max_length=20)

class UserOut(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str
    is_verified: bool

    class Config:
        orm_mode = True

class VerifyCode(BaseModel):
    email: EmailStr
    code: constr(min_length=6, max_length=6)
