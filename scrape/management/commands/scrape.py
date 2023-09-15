from django.core.management.base import BaseCommand
from store.models import Product, Category, ProductImage
from django.contrib.auth import get_user_model
from selenium import webdriver
from selenium.webdriver.common.by import By
import uuid
import requests
from django.core.files import File
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support import expected_conditions as EC

url = 'https://sick-series.com/collections/schuhe'
category = ['Shoes', 'schuhe']

page = 1
product = 1

product_links = []

def add_product(name, description, slug, price, images):
    User = get_user_model()
    # Get the first user from the database
    try:
        user = User.objects.first()
    except User.DoesNotExist:
        print("No users found in the database. Please create a user first.")
        return

    # Create categories
    category1, created = Category.objects.get_or_create(name=category[0], slug=category[1])

    # Create products
    product = Product.objects.create(
        category=category1,
        created_by=user,
        name=name,
        description=description,
        slug=slug,
        price=price,
        in_stock=69,
    )

    try:
        product = Product.objects.get(id=product.id)  # Replace 1 with the actual product ID
    except Product.DoesNotExist:
        print("Product not found.")
        return
    

    for i in images:
        product_images = ProductImage()
        file_name = str(uuid.uuid4())
        src = i.get_attribute('data-photoswipe-src').split(',')[-1].replace('//', 'https://')

        response = requests.get(src)

        if response.status_code == 200:
            # If the request is successful, save the image to a local file
            with open('scrape_media/'+file_name+'.webp', 'wb') as file:
                file.write(response.content)
            print("Image saved successfully")
        else:
            print(f"Failed to download image. Status code: {response.status_code}")

        product_images.product = product

        with open('scrape_media/'+file_name+'.webp', 'rb') as img_file:
            # Create a Django File object from the image file
            product_images.image.save(file_name+'.webp', File(img_file), save=True)
        
        # Save the ProductImage instance to the database
        product_images.save()

            
        

    

def collect_links(driver):
    box = driver.find_elements(By.CLASS_NAME, "grid-product__link")
    for b in box:
        product_links.append(b.get_attribute('href'))

    try:
        next = driver.find_element(By.CLASS_NAME, "next")
        next_a = next.find_element(By.TAG_NAME, "a")
        driver.get(next_a.get_attribute('href'))
        collect_links(driver)
    except NoSuchElementException:
        print("Colling data is done, collected about" + str(len(product_links)))

# Selenium
def sel():
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    driver = webdriver.Chrome()
    driver.get(url)
    
    collect_links(driver)

    for p in product_links:
        driver.get(p)
        
        name = driver.find_element(By.CLASS_NAME, "product-single__title").text
        description = driver.find_element(By.CLASS_NAME, "product-single__description").text
        slug = "https://sick-series.com/collections/herren/products/sick-longsleeve-ying-yang".split('/')[-1]
        price = float(driver.find_elements(By.CLASS_NAME, 'dualPrice')[0].text.replace('€', ''))
        images = driver.find_elements(By.CLASS_NAME, "photoswipe__image")

        add_product(name, description, slug, price, images)

class Command(BaseCommand):
    help = 'Your custom command description here'

    def handle(self, *args, **options):
        print("Scrapping has started")
        sel()
        # add_product(name, description, slug, price)