from ninja import Router
from django.shortcuts import get_object_or_404
from .models import Income
from .schema import IncomeSchemaOut,IncomeSchemaIn

router=Router()

@router.get('/list-incomes',response=list[IncomeSchemaOut])
def list_income(request):
    return Income.objects.all()

@router.get('/get-income/{id}',response=IncomeSchemaOut)
def get_income(request,income_id:str):
    return get_object_or_404(Income,id=income_id)

@router.post('/create-income',response=IncomeSchemaOut)
def create_income(request,data:IncomeSchemaIn):

    return Income.objects.create(**data.dict())

@router.put('/update-income/{id}',response=IncomeSchemaOut)
def update_income(request,income_id:str,data:IncomeSchemaIn):
    income=get_object_or_404(Income,id=income_id)

    for attr, value in data.dict().items():
        setattr(income,attr,value)

    income.save()

    return income

@router.delete('/delete-income/{id}')
def delete_income(request,income_id:str):
    qs =get_object_or_404(Income,id=income_id)

    qs.delete()

    return {"success":True}