from django.conf import settings
from .models import *
import requests

def getStatics():
    subs = 0
    views = 0

    api_link = 'https://www.googleapis.com/youtube/v3/channels'
    parm = {
        'part': 'statistics',
        'id': 'UCPxy8EgTCarmXV7juQLhg0Q',
        'key': settings.YOUTUBE_API_KEY,
    }
    r = requests.get(api_link, params=parm)
    singleton = Youtube.get_singleton()
    try:
        subs = r.json()['items'][0]['statistics']['subscriberCount']
        views = r.json()['items'][0]['statistics']['viewCount']

        singleton.subs = subs
        singleton.view = views
        singleton.save()
    except:
        print("Getting from backup")
        subs = singleton.subs
        views = singleton.view

    return {'subs': subs, 'views': views}