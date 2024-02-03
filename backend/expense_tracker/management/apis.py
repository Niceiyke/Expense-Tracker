from django.shortcuts import get_object_or_404
from ninja import Router

from account.models import CustomUser
from .models import Category
from .schema import CategorySchemaOut, CategorySchemaIn

router = Router()


@router.get("/categories", response=list[CategorySchemaOut])
def list_categories(request):
    return Category.objects.all()


@router.post("/add-category", response=CategorySchemaOut)
def add_category(request, data: CategorySchemaIn):
    user = get_object_or_404(CustomUser, id=data.user)
    data.user = user

    return Category.objects.create(**data.dict())
