# Generated by Django 5.0.1 on 2024-02-01 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0002_alter_category_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='type',
            field=models.CharField(choices=[('income', 'Income'), ('expenses', 'Expenses')], default='expenses', max_length=10),
        ),
    ]
