from django.urls import path, include
from . import views

app_name = 'store'

urlpatterns = [
    path('', views.index, name='home'),
    path('products/', views.products, name='products'),
    path('product/<int:product_id>/', views.product_detail, name='product_detail'),
    path('autocomplete/', views.autocompelete, name='autocompelete'),
    path('youtube', views.channel),
    path('account/', include('account.urls', namespace='account')),
    path('cart/', include('cart.urls', namespace='cart')),
]

handler404 = 'store.views.underwork'