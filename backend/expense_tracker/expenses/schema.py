
from datetime import datetime
from uuid import UUID
from ninja import ModelSchema,Schema
from .models import Expenses
from account.schema import UserSchema
from management.schema import CategorySchema


class ExpenseSchema(Schema):
    id:UUID
    user:UserSchema
    amount:float
    description:str
    date:str
    created_at:datetime
    category:CategorySchema |None=None



class CreateExpensesSchema(Schema):
    user:str
    amount:float
    description:str
    date: str
    category:str|None=None

