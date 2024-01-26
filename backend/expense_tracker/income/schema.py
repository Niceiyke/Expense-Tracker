from ninja import ModelSchema,Schema
from .models import Income


class IncomeSchemaOut(ModelSchema):
    class Meta:
        model=Income
        fields =("id","user","amount","description","date","created_at")


class IncomeSchemaIn(Schema):
    user:str
    amount:float
    description:str
    date:str
