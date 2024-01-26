import uuid
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Category(models.Model):
    id =models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
