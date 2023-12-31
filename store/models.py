from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from imagekit.models import ImageSpecField, ProcessedImageField
from PIL import Image
import time
import uuid
import random
from io import BytesIO
from django.core.files.base import ContentFile
from django.utils import timezone
import os
from django.db.models.signals import post_save
from django.dispatch import receiver

def determine_if_landscape(image_path):
    img = Image.open(image_path)
    width, height = img.size
    return width > height

class Category(models.Model):
    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, unique=True)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


def image_upload_path(instance, filename):
    subdirectory = instance.uuid
    return f"product_images/{subdirectory}-{filename}"



class ProductImage(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='product_images')
    image = models.ImageField(upload_to=image_upload_path)  # Pass the callable, not the result
    
    


class Product(models.Model):
    category = models.ForeignKey(Category, related_name='product', on_delete=models.CASCADE)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='product_creator')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    slug = models.SlugField(max_length=255)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    in_stock = models.DecimalField(max_digits=9, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    orders = models.DecimalField(max_digits=9, decimal_places=0, default=0)

    # images = models.ManyToManyField(ProductImage, related_name='products')

    class Meta:
        verbose_name_plural = 'Products'
        ordering = ('-created',)
    
    def __str__(self):
        return self.name

class Lookbook_Image(models.Model):
    lookbook = models.ForeignKey('Lookbook', on_delete=models.CASCADE, related_name='lookbook_Image')
    image = models.ImageField(upload_to='lookbooks/images/')
    landscape = models.BooleanField()

    def save(self, *args, **kwargs):
        is_new_image = self.pk is None  # Check if it's a new image being saved

        super().save(*args, **kwargs)

        if is_new_image:
            image_path = self.image.path
            is_landscape = determine_if_landscape(image_path)
            print(is_landscape)
            self.landscape = is_landscape
            self.save()

class Lookbook(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField(auto_now_add=True)
