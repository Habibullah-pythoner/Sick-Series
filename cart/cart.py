from store.models import *
from decimal import Decimal

class Cart():
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get('cart')

        if 'cart' not in request.session:
            cart = self.session['cart'] = {}
        
        self.cart = cart

    def add(self, product, qty):
        product_id = product.id

        if product_id not in self.cart:
            self.cart[product_id] = {'price': str(product.price), 'qty':int(qty)}

        self.session.modified = True

    def get(self):
        return self.cart

    def __iter__(self):
        product_ids = self.cart.keys()
        products = Product.objects.filter(id__in=product_ids)
        cart = self.cart.copy()

        for product in products:
            cart[str(product.id)]['product'] = product

        for item in cart.values():
            item['price'] = Decimal(item['price'])
            item['total_price'] = item['price'] * item['qty']
            yield item

    def __len__(self):
        return len(self.cart)

    # def total_price(self):
    #     return sum(Decimal(item['price']) * item['qty'] for item in self.cart.values())