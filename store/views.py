from django.shortcuts import render, get_object_or_404
from .models import *
import re
import stripe
import json
# from cities_light.models import City, Country
from user_agents import parse
from django.conf import settings
from django_countries.data import COUNTRIES
import requests
from django.http import HttpResponse
from youtube.getdata import *
import locale
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .serializers import ProductSerializer
from django.core.serializers import serialize
from django.views.decorators.clickjacking import xframe_options_exempt
from cart.cart import Cart

def format_number_with_commas(number):
    locale.setlocale(locale.LC_ALL, '')  # Set the locale to the default for your system
    formatted_number = locale.format_string('%d', number, grouping=True)
    return formatted_number

def format_number(number):
    units = ['', 'k', 'M', 'B', 'T']  # Add more as needed for larger numbers
    magnitude = 0

    while number >= 1000 and magnitude + 1 < len(units):
        number /= 1000
        magnitude += 1

    if magnitude > 0 and number.is_integer():
        formatted_number = "{}{}".format(int(number), units[magnitude])
    else:
        formatted_number = "{:.1f}{}".format(number, units[magnitude])

    return formatted_number


# @xframe_options_exempt
@api_view(['GET'])
def product_detail(request, product_id):
    try:
        product = Product.objects.prefetch_related('product_images').get(pk=product_id)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'}, status=404)

    serializer = ProductSerializer(product)
    return JsonResponse(serializer.data)

def shuffle(cards):
    deck = [[],[],[],[]]
    for card in cards:
        deck[0].append(card[0])
        deck[1].append(card[1])
        deck[2].append(card[2])
        deck[3].append(card[3])
    
    return deck

def underwork(request, exception):
    return render(request, 'user/underwork.html', {})

def checkout(request):
    countries = COUNTRIES.items()
    cart = Cart(request)
    category = Category.objects.all()

    date = {
        'cart': cart,
        'countries': countries,
        'category': category,
    }
    return render(request, 'user/checkout.html', date)





def get_cities_by_country(request):
    # if request.method == 'GET':
    #     country_name = request.GET.get('country_name', '')

    #     try:
    #         # Use case-insensitive search for country name
    #         City.objects.filter(country__name="United States", subregion__name="Orange County")
    #         cities = City.objects.filter(country=country_name)
    #         city_list = [city.name for city in cities]

    #         return JsonResponse({'cities': city_list})

    #     except Country.DoesNotExist:
    return JsonResponse({'error': 'Country not found'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
def products(request):
    portal_product = request.GET.get('product', None)

    try:
        product = get_object_or_404(Product, pk=portal_product)
        portal_open = True
    except:
        product = False
        portal_open = False

    search = request.GET.get('s')
    cat = request.GET.get('c')
    category = Category.objects.all()

    if search is not None:
        searched_products = Product.objects.filter(name__contains = search)
        result = False
        if searched_products.exists():
            result = True
        data = {
            'searched_for': search,
            'searched': True,
            'result': result,
            'products': searched_products,
            'category': category,
        }
        return render(request, 'user/products.html', data)
    elif cat is not None:
        products = Product.objects.filter(category = cat)
        result = False
        if products.exists():
            result = True
        data = {
            'searched': False,
            'result': result,
            'products': products,
            'category': category,
        }
        return render(request, 'user/products.html', data)
    else:
        products = Product.objects.all()
        result = False
        if products.exists():
            result = True
        data = {
            'searched': False,
            'result': result,
            'product': product,
            'portal_open': portal_open,
            'products': products,
            'category': category,
        }
        return render(request, 'user/products.html', data)

def highlight(str, searched):
    start = str.lower().find(searched.lower())
    end = start + len(searched)

    substring_to_insert = "<span>"

    new_string = str[:start] + substring_to_insert + str[start:end] + "</span>" + str[end:]
    return new_string

def autocompelete(request):
    search = request.GET.get('s')

    if search is not None:
        result = Product.objects.filter(name__icontains=search)
        names = list()
        thumbnails = list()
        for product in result:
            names.append(highlight(str(product.name), search))
        return JsonResponse([names[:5], thumbnails], safe=False)
    else:
        return JsonResponse({'error':'nothing recieved'})

def index(request):
    portal_product = request.GET.get('product', None)

    try:
        product = get_object_or_404(Product, pk=portal_product)
        portal_open = True
    except:
        product = False
        portal_open = False

    user_agent = parse(request.META.get('HTTP_USER_AGENT', ''))
    category = Category.objects.all()

    cart = Cart(request)

    mobile = False
    if user_agent.is_mobile:
        mobile = True

    if request.user.is_authenticated:
        logged = True
    else:
        logged = False
    
    products = Product.objects.all().order_by('-orders')[:15]
    extra_products = Product.objects.all().order_by('-orders')[15:22]

    lookbooks = Lookbook.objects.all()

    # Create an empty list to store all image URLs
    lookbook_images = []

    # Loop through all the lookbooks
    for lookbook in lookbooks:
        # Get all Lookbook_Image objects associated with the current lookbook
        images = lookbook.lookbook_Image.all()

        images_array = []
        # Append the image URLs to the list
        for image in images:
            images_array.append(image.image.url)
        
        lookbook_images.append(images_array)
    
    lookbook_images = shuffle(lookbook_images)

    youtube = getStatics()

    subs = format_number(int(youtube['subs']))
    views = format_number_with_commas(int(youtube['views']))

    data = {
        'products': products,
        'extra_products': extra_products,
        'lookbooks': lookbooks,
        'lookbook_images': lookbook_images,
        'mobile': mobile,
        'subs': subs,
        'views': views,
        'logged': True,
        'cart': cart,
        'category': category,
        'product': product,
        'portal_open': portal_open,
    }
    return render(request, 'user/index.html', data)

def channel(request):
    api_link = 'https://www.googleapis.com/youtube/v3/channels'

    parm = {
        'part': 'statistics',
        'id': 'UCPxy8EgTCarmXV7juQLhg0Q',
        'key': settings.YOUTUBE_API_KEY,
    }

    r = requests.get(api_link, params=parm)

    try:
        subs = r.text
    except:
        subs = "Sadly, ye"

    # Create the HttpResponse object with plain text content
    response = HttpResponse(subs, content_type='text/plain')

    return response
