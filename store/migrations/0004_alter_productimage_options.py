# Generated by Django 4.2 on 2023-07-18 07:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_alter_lookbook_image_landscape'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='productimage',
            options={'verbose_name_plural': 'Product_Images'},
        ),
    ]