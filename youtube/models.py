from django.db import models

class Youtube(models.Model):
    subs = models.DecimalField(max_digits=12, decimal_places=0, default=0)
    view = models.DecimalField(max_digits=12, decimal_places=0, default=0)

    @classmethod
    def get_singleton(cls):
        instance, created = cls.objects.get_or_create(id=1)
        return instance

    def save(self, *args, **kwargs):
        self.id = 1  # Set the ID to 1 to ensure there's only one row
        super().save(*args, **kwargs)