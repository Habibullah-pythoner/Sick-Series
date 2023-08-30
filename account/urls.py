from django.urls import path, include
from . import views

app_name = 'account'

urlpatterns = [
    path('', views.account, name='home'),
    path('logout', views.sign_out, name='logout'),
    path('signup', views.underwork, name='home'),
    path('login', views.custom_login, name='home'),
]