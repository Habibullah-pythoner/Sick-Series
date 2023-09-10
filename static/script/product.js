let thumbnail = document.querySelectorAll('#slider #border')
let active = document.querySelectorAll('#slider #border.active')
const portal = document.getElementById('portal')

var last_portal_product = 0

var portal_open = false

// Elements
const pname = document.querySelector('#portal h1')
const price = document.querySelector('#portal #price span')
const des = document.querySelector('#portal #des')
const size = document.querySelector('#portal #size')
const add_to_cart = document.querySelector('#main_add_to_cart.pc_only')
const fixed_box = document.querySelector('#fixed_box.pc_only')

add_to_cart_btns = document.querySelectorAll('#main_add_to_cart')

thumbnail.forEach(thumb => {
    thumb.addEventListener('click', function() {
        if(active.length > 0) {
            active[0].classList.remove('active')
        }

        this.classList.add('active')
        document.getElementById('featured').src = this.querySelector('.image img').src
        active = [this]
    })
});

async function getJSONData(url) {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }
  
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching JSON data:", error);
      return null;
    }
  }

function getProduct(p) {
    getJSONData('/product/'+p)
    .then((jsonData) => {
    if (jsonData) {
        // You can work with the JSON data here
        writeNewProductData(jsonData)
    } else {
        console.log("No JSON data received.");
    }
    })
    .catch((error) => {
    console.error("Error:", error);
    });
}

function writeNewProductData(product) {
    pname.innerHTML = product.name
    price.innerHTML = product.price
    des.innerHTML = product.description

    var images = product.product_images

    console.log(product);

    add_to_cart_btns.forEach(element => {
        element.setAttribute('onclick', 'cart_handle('+ product.id +')')
    });
    

    for(var i = 0;i < images.length;i++) {
        const border = document.createElement('div')
        border.setAttribute('id', 'border')

        const sliderContainer = document.createElement('div')
        sliderContainer.setAttribute('class', 'image')
        border.appendChild(sliderContainer)

        const slideImage = document.createElement('img')
        slideImage.setAttribute('src', images[i].resized)
        // console.log(images[i]);
        sliderContainer.appendChild(slideImage)
        
        document.querySelector('#portal #slider').appendChild(border)

        if(i == 0) {
            const twin = slideImage.cloneNode(true);
            twin.setAttribute('class', 'main_image_listener')
            document.querySelector('#portal #main_image').appendChild(twin)
        }
    }

    const imagesToListen = document.querySelectorAll('#portal #images img');

    imagesToListen.forEach(element => {
        element.addEventListener('load', () => {
            element.classList.add('loaded');

            // Check if all elements are loaded
            if (element.classList.contains('main_image_listener')) {
                // All elements have loaded, you can perform any additional actions here
                portal.classList.add('fully_loaded')
            }
        });
    });
}

function resetPortal() {
    portal.classList.remove('fully_loaded')

    const pastSliders = document.querySelectorAll('#portal #slider #border:not(.skil_border)')
    if(pastSliders.length > 0) {
        pastSliders.forEach(element => {
            element.remove()
        });
    }

    document.querySelector('#portal #main_box #main_image').innerHTML = '<div id="skeleton_anim"></div>'
}


function portalevent(product, link_shared = false) {
    
    des.style.height = ((fixed_box.getBoundingClientRect().top - des.getBoundingClientRect().top) - 40) + "px"

    console.log(des.getBoundingClientRect().top - fixed_box.getBoundingClientRect().top);
    if(!portal_open) {
        if(last_portal_product != product) {
            resetPortal()
            getProduct(product)
        }
        document.body.classList.add("portal")
        if(!link_shared) {
            let currentURL = window.location.href;
            currentURL += "?product="+product;
            window.history.pushState({ path: currentURL }, '', currentURL);
        }
    } else {
        document.body.classList.remove("portal")
        removeQueryParameters()
    }
    if(product != undefined) {
        last_portal_product = product
    }

    portal_open = !portal_open
}


