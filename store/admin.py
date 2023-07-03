from django.contrib import admin
from .models import *

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductAdmin(admin.ModelAdmin):
    inlines = (ProductImageInline,)


class LookbookImageInline(admin.TabularInline):
    model = Lookbook_Image
    extra = 1

class LookbookAdmin(admin.ModelAdmin):
    inlines = (LookbookImageInline,)

admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(ProductImage)
admin.site.register(Lookbook, LookbookAdmin)
