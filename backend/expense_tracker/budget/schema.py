from ninja import ModelSchema, Schema
from .models import Budget
from management.schema import CategorySchemaOut
from account.schema import UserSchema


class BudgetSchema(ModelSchema):
    user: UserSchema
    category: CategorySchemaOut

    class Meta:
        model = Budget
        fields = ("id", "user", "category", "amount", "start_date", "end_date")


class CreateBudgetSchema(Schema):
    user: str
    category: str
    amount: float
    start_date: str
    end_date: str


class UpdateBudgetSchema(Schema):
    amount: float
    start_date: str
    end_date: str
