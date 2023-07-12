from django.urls import path, include
from . import views

app_name = 'store'

urlpatterns = [
    path('', views.index, name='home'),
    path('product/<int:product_id>/', views.product_detail, name='product_detail'),
    path('youtube', views.channel),
]