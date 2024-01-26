from django.db import models
from django.contrib.auth import get_user_model

from management.models import Category

User = get_user_model()


# Create your models here.
class Expense(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="expenses_user"
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.amount} on {self.date}"