from django.shortcuts import render
from .models import *
from user_agents import parse

def index(request):
    user_agent = parse(request.META.get('HTTP_USER_AGENT', ''))

    mobile = False
    if user_agent.is_mobile:
        mobile = True
    
    products = Product.objects.all()
    lookbooks = Lookbook.objects.all()

    data = {
        'products': products,
        'lookbooks': lookbooks,
        'mobile': mobile
    }
    return render(request, 'user/index.html', data)
