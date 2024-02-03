import uuid
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

Category_Type = (("income", "Income"), ("expenses", "Expenses"))


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True)
    type = models.CharField(max_length=10, choices=Category_Type, default="expenses")

    def __str__(self):
        return f"created by {self.user.email}. {self.type} type category"


class Transactions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=12, choices=Category_Type)
    description = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} recorded an {self.type} transaction of #{self.amount} at {self.created_at}"
