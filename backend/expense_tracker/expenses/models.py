import uuid
from django.db import models
from django.contrib.auth import get_user_model

from management.models import Category

User = get_user_model()


# Create your models here.
class Expenses(models.Model):
    id =models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="expenses_user"
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE,null=True,blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.amount} on {self.date}"
