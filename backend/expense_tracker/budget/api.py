from ninja import Router
from django.shortcuts import get_object_or_404
from account.models import CustomUser
from management.models import Category
from .models import Budget
from .schema import BudgetSchema, CreateBudgetSchema, UpdateBudgetSchema

router = Router()


@router.get("/budgets", response=list[BudgetSchema])
def list_budgets(request):
    return Budget.objects.all()


@router.get("/budget/{budget_id}", response=BudgetSchema)
def get_budget(request, budget_id: str):
    return get_object_or_404(Budget, id=budget_id)


@router.post("/create-budget", response=BudgetSchema)
def create_budget(request, data: CreateBudgetSchema):
    user_id = data.user
    category_id = data.category
    amount = data.amount
    start_date = data.start_date
    end_date = data.end_date

    user = CustomUser.objects.filter(id=user_id).first()
    category = Category.objects.filter(id=category_id).first()

    budget = Budget.objects.create(
        user=user,
        amount=amount,
        category=category,
        start_date=start_date,
        end_date=end_date,
    )

    return budget


@router.put("/budget/{budget_id}", response=BudgetSchema)
def update_budget(request, budget_id: str, data: UpdateBudgetSchema):
    amount = data.amount
    start_data = data.start_date
    end_date = data.end_date
    qs = get_object_or_404(Budget, id=budget_id)
    qs.amount = amount
    qs.end_date = end_date
    qs.start_date = start_data
    qs.save()
    return qs


@router.delete("/budget/{budget_id}")
def delete_budget(request, budget_id: str):
    qs = get_object_or_404(Budget, id=budget_id)
    qs.delete()

    return {"success": True}
