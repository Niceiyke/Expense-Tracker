# Generated by Django 5.0.1 on 2024-02-02 18:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('income', '0001_initial'),
        ('management', '0003_category_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='income',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='management.category'),
        ),
    ]
