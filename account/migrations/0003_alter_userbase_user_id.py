# Generated by Django 4.2 on 2023-08-04 05:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_alter_userbase_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userbase',
            name='user_id',
            field=models.CharField(default='SS-0374-14', max_length=20, unique=True),
        ),
    ]
