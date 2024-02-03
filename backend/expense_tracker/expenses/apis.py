from ninja import Router
from django.shortcuts import get_object_or_404

from account.models import CustomUser
from management.models import Category
from .schema import ExpenseSchema, CreateExpensesSchema
from .models import Expenses

router = Router()


@router.get("/list-expenses", response=list[ExpenseSchema])
def list_expenses(request):
    return Expenses.objects.all()


@router.get("get-expenses/{expenses_id}", response=ExpenseSchema)
def get_expenses(request, expenses_id: str):
    return get_object_or_404(Expenses, id=expenses_id)


@router.post("create-expenses", response=ExpenseSchema)
def create_expenses(request, data: CreateExpensesSchema):
    user = get_object_or_404(CustomUser, id=data.user)
    data.user = user

    if data.category is not None:
        category = get_object_or_404(Category, id=data.category)
        data.category = category
    return Expenses.objects.create(**data.dict())


@router.put("update-expenses/{expenses_id}", response=ExpenseSchema)
def update_expenses(request, expenses_id: str, data: CreateExpensesSchema):
    expenses = get_object_or_404(Expenses, id=expenses_id)

    for attr, value in data.dict().items():
        setattr(expenses, attr, value)

    expenses.save()

    return expenses


@router.delete("delete-expenses/{expenses_id}")
def delete_expenses(request, expenses_id: str):
    qs = get_object_or_404(Expenses, id=expenses_id)

    qs.delete()

    return {"success": True}
