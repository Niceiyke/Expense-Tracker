from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Income
from management.models import Transactions


@receiver(post_save, sender=Income)
def your_model_saved(sender, instance, created, **kwargs):
    print(f"{instance} has been saved!")

    if created:
        user = instance.user
        type = instance.category.type
        amount = instance.amount
        description = instance.description
        Transactions.objects.create(
            user=user, type=type, amount=amount, description=description
        )

        print("transaction created")

    # You can perform additional actions here
