from ninja import Router
from .models import Category
from .schema import CategorySchema

router = Router()


@router.get("/categories", response=list[CategorySchema])
def list_categories(request):
    return Category.objects.all()
