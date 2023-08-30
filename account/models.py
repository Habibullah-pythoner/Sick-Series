from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)
from django_countries.fields import CountryField
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
import os
from PIL import Image
import datetime
import io
from django.core.files.base import ContentFile
import webp

class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if (other_fields.get('is_staff') is not True):
            raise ValueError("SuperUser must be assigned to is_staff=True")

        if (other_fields.get('is_superuser') is not True):
            raise ValueError("SuperUser must be assigned to is_superuser=True")

        # Add the 'user_name' argument here
        return self.create_user(email, password, **other_fields)

    def create_user(self, email, password, **other_fields):
        if not email:
            raise ValueError(_("You must provide an Email"))

        email = self.normalize_email(email)
        user = self.model(email=email, **other_fields)  # Fix 'user_name' assignment
        user.set_password(password)
        user.save()
        return user

def upload_to(instance, filename):
    timestamp = str(int(timezone.now().timestamp()))
    ext = os.path.splitext(filename)[1]
    new_filename = f"{timestamp}{ext}"
    return 'profile_pics/{0}'.format(new_filename)

# Create your models here.
class UserBase(AbstractBaseUser, PermissionsMixin):
    def generate_user_id():
        d=datetime.datetime.now()
        ms = str(round(d.timestamp()))
        return f"SS-{ms[:4]}-{ms[4:]}"

    user_id = models.CharField(max_length=20, unique=True, default=generate_user_id())

    email = models.EmailField(_('email-address'), unique=True)
    first_name = models.CharField(max_length=150, unique=False)
    last_name = models.CharField(max_length=150, unique=False)

    # Profile Image
    profile_picture = models.ImageField(upload_to=upload_to, blank=True, null=True)

    # Dilevery Information
    country = CountryField()
    phone_number = models.CharField(max_length=15, unique=True, blank=True)
    postcode = models.CharField(max_length=12, blank=True)
    address_line_1 = models.CharField(max_length=150, blank=True)
    address_line_2 = models.CharField(max_length=150, blank=True)
    town_city = models.CharField(max_length=150, blank=True)

    # User status
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    

    class Meta:
        verbose_name = "Accounts"
        verbose_name_plural = "Accounts"

    def __str__(self):
        return self.first_name

    def save(self, *args, **kwargs):
        if self.profile_picture:
            img = Image.open(self.profile_picture)

            # Calculate the aspect ratio
            aspect_ratio = img.width / img.height

            # Resize the image to a maximum of 300x300 while preserving the aspect ratio
            img.thumbnail((300, 300))

            # Check if the image is smaller than 300x300, and if so, create a square (1x1) image
            if img.width < 300 or img.height < 300:
                # Calculate the center coordinates
                center_x = img.width // 2
                center_y = img.height // 2

                # Calculate the crop dimensions to create a square (1x1) image
                crop_size = min(img.width, img.height)
                left = center_x - crop_size // 2
                top = center_y - crop_size // 2
                right = center_x + crop_size // 2
                bottom = center_y + crop_size // 2

                # Crop the image to a square (1x1) aspect ratio
                img = img.crop((left, top, right, bottom))

            # Convert the image to WebP format
            output_io = io.BytesIO()
            img.save(output_io, format='WebP', quality=80)

            # Save the WebP image back to the ImageField
            self.profile_picture.save(os.path.basename(self.profile_picture.name), ContentFile(output_io.getvalue()), save=False)

        super().save(*args, **kwargs)