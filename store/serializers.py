# serializers.py
from rest_framework import serializers
from .models import Product, ProductImage
from sorl.thumbnail import get_thumbnail

def get_thumbnail_shim(image, width):
    # This is in its own function because it'll make it easy to add support
    # for other thumbnailers in future. (easy_thumbnails should be easy,
    # and I had it written, but it refuses to work properly with anything that
    # is not an ImageField, i.e. in our test view in views.py.)
    engine = "sorl"

    if engine == "sorl":
        # Let's do a sorl!
        from sorl.thumbnail import get_thumbnail
        im = get_thumbnail(image, '{}'.format(width), upscale=False)
        return im

    # No thumbnailer. :(
    return image

class ProductImageSerializer(serializers.ModelSerializer):
    resized = serializers.SerializerMethodField()

    def get_resized(self, obj):
        # Assuming 'image' is a URL field on your model
        # Replace 'image' with your actual field name
        return get_thumbnail(obj.image, '600', crop='center', quality=99).url

    class Meta:
        model = ProductImage
        fields = ('image','resized')

    

class ProductSerializer(serializers.ModelSerializer):
    product_images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'product_images')
