from django.urls import path, include
from . import views

app_name = 'cart'

urlpatterns = [
    path('add', views.cart_add, name='add_to_cart'),
    path('get', views.cart_get, name='get_cart'),
]