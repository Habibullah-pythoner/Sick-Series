# Generated by Django 4.2 on 2023-09-08 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0013_alter_userbase_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userbase',
            name='user_id',
            field=models.CharField(default='SS-1694-180240', max_length=20, unique=True),
        ),
    ]
