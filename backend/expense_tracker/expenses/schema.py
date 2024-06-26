from datetime import datetime
from uuid import UUID
from ninja import ModelSchema, Schema
from .models import Expenses
from account.schema import UserSchema
from management.schema import CategorySchemaOut


class ExpenseSchema(Schema):
    id: UUID
    user: UserSchema
    amount: float
    description: str
    date: datetime
    created_at: datetime
    category: CategorySchemaOut | None = None


class CreateExpensesSchema(Schema):
    user: str
    amount: float
    description: str
    date: datetime
    category: str | None = None
