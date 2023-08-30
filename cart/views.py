from django.shortcuts import render
from .cart import Cart
from django.shortcuts import get_object_or_404
from store.models import *
from django.http import JsonResponse
import json
from decimal import Decimal
from django.core.serializers.json import DjangoJSONEncoder
from store.serializers import ProductSerializer

# Create your views here.
def cart_add(request):
    cart = Cart(request)
    if(request.POST.get('action') == 'POST'):
        product_id = request.POST.get('productid')
        product_qty = request.POST.get('qty')
        product = get_object_or_404(Product, id=product_id)
        cart.add(product=product, qty = product_qty)
        cart_qty = cart.__len__()

        response = JsonResponse({'qty': cart_qty})
        return response

def cart_get(request):
    cart_instance = Cart(request)

    total_qty = cart_instance.__len__()  # Call the method to get the total quantity
    total_price = sum(item['product'].price * item['qty'] for item in cart_instance)

    cart_items = [{'total_qty': total_qty, 'total_price': total_price}]
    for item in cart_instance:
        product = item['product']
        product_image = product.product_images.first()  # Get the first image for simplicity
        
        if product_image:
            product_image_url = product_image.image.url
        else:
            product_image_url = ''
            
        cart_item = {
            'product_id': item['product'].id,
            'product_name': item['product'].name,
            'product_price': str(item['product'].price),
            'qty': item['qty'],
            'product_image_url': product_image_url,
            # Add other item details as needed
        }
        cart_items.append(cart_item)


    class DecimalEncoder(DjangoJSONEncoder):
        def default(self, o):
            if isinstance(o, Decimal):
                return str(o)  # Convert Decimal to string
            return super().default(o)

    cart_json = json.dumps(cart_items, cls=DecimalEncoder) 
        
    # serializer = ProductSerializer(product)
    return JsonResponse(cart_json, safe=False)
    # return JsonResponse({'cart':data})
