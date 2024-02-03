import datetime
from ninja import ModelSchema, Schema
from management.schema import CategorySchemaOut
from .models import Income


class IncomeSchemaOut(ModelSchema):
    category: CategorySchemaOut | None = None

    class Meta:
        model = Income
        fields = (
            "id",
            "user",
            "amount",
            "description",
            "category",
            "date",
            "created_at",
        )


class IncomeSchemaIn(Schema):
    user: str
    amount: float
    description: str
    date: datetime.datetime
    category: str | None = None
