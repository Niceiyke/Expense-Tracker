from ninja import ModelSchema
from .models import Category


class CategorySchemaOut(ModelSchema):
    class Meta:
        model = Category
        fields = ("id", "user", "name", "type")


class CategorySchemaIn(ModelSchema):
    class Meta:
        model = Category
        fields = ("user", "name", "type")
