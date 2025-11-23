from datetime import datetime
from enum import Enum
from typing import Optional

from sqlmodel import Field, SQLModel


class TransactionType(str, Enum):
    INCOME = "income"
    EXPENSE = "expense"


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, max_length=255)
    email: str = Field(unique=True, index=True, max_length=255)
    avatar: Optional[str] = Field(default=None, description="Optional avatar URL")


class Category(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, max_length=100)
    tone: str = Field(default="#7c3aed", description="Hex color used in the UI")
    type: TransactionType = Field(default=TransactionType.EXPENSE, index=True)


class TransactionBase(SQLModel):
    title: str = Field(max_length=255)
    amount: float = Field(gt=0)
    occurred_at: datetime = Field(default_factory=datetime.utcnow)
    note: Optional[str] = Field(default=None, max_length=500)
    category_id: Optional[int] = Field(default=None, foreign_key="category.id")
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")


class Transaction(TransactionBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    type: TransactionType = Field(index=True)


class TransactionCreate(TransactionBase):
    type: TransactionType


class Summary(SQLModel):
    balance: float
    total_income: float
    total_expenses: float
