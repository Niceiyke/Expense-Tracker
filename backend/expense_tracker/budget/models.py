import uuid
from django.db import models
from django.contrib.auth import get_user_model
from management.models import Category

User = get_user_model()


class Budget(models.Model):
    id =models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bugets_user")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.user.email} - {self.category.name} Budget"
