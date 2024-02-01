import uuid
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

Category_Type=(
    ('income','Income'),("expenses","Expenses")
)

class Category(models.Model):
    id =models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True)
    type =models.CharField(max_length=10,choices=Category_Type,default='expenses')
    def __str__(self):
        return self.name
