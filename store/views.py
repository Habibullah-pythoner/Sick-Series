from django.shortcuts import render, get_object_or_404
from .models import *
from user_agents import parse
from django.conf import settings
import requests
from django.http import HttpResponse
from youtube.getdata import *
import locale
from django.views.decorators.clickjacking import xframe_options_exempt


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


@xframe_options_exempt
def product_detail(request, product_id):
    # Retrieve the product from the database using the product_id
    product = get_object_or_404(Product, id=product_id)

    # Pass the product to the template
    context = {
        'product': product
    }

    return render(request, 'product.html', context)

def index(request):
    user_agent = parse(request.META.get('HTTP_USER_AGENT', ''))

    mobile = False
    if user_agent.is_mobile:
        mobile = True
    
    products = Product.objects.all()
    lookbooks = Lookbook.objects.all()

    youtube = getStatics()

    subs = format_number(int(youtube['subs']))
    views = format_number_with_commas(int(youtube['views']))

    data = {
        'products': products,
        'lookbooks': lookbooks,
        'mobile': mobile,
        'subs': subs,
        'views': views,
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
