var menu_open = false

var section = document.getElementById('landing');
if (section) {
  var sectionOffset = section.offsetTop;
  var sectionHeight = section.offsetHeight;
} else {
  var sectionOffset = 0;
  var sectionHeight = 0;
}
const main_content = document.getElementById("main_content");

var scrollBar = document.querySelector('#dummy_full').offsetWidth - document.querySelector('#dummy_not_full').offsetWidth

const lookbook_image = document.querySelectorAll('#lookbooks #image')

var detailed = false
const gDetails = document.querySelector('#giveaway #extra')
const giveaway = document.querySelector('#giveaway')
const newsletter = document.querySelector('#newsletter')
const fake_lookbook = document.querySelectorAll('.fake_lookbook')

var emailinput = document.getElementById('email_input');
var emailsupbit = document.getElementById('email_submit');
var body = document.body;

const sick = document.querySelector('#first_slice h1')
const mirror = document.querySelector('#first_slice #mirror')
const second_slice = document.querySelector('#second_slice')
const first_slice = document.querySelector('#first_slice')
const scroll = document.querySelector('#scroll')
const mobile_scroll = document.querySelector('#scroll.mobile_only')
const products = document.querySelector('#landing #scroll_frame')
const mini_about = document.getElementById('mini_about')
const lookbook = document.querySelector('#lookbooks')
const pc_lookbook_li = document.querySelectorAll('#tabs.pc_only ul li')
const mo_lookbook_li = document.querySelectorAll('#tabs.mobile_only ul li')

if (products !== null) {
  var scrollGap = Math.max((products.scrollHeight - products.offsetHeight), (products.scrollWidth - products.offsetWidth)) || 0
  var notch = (scrollGap + innerHeight);
}


const pimages = document.querySelectorAll('#products #product #images img');
const limages = document.querySelectorAll('#lookbooks #container #image img');
const cartimages = document.querySelectorAll('#cart #image img');

var count = 0

function findIndexInFakeLookbook(element) {
  // Convert the NodeList to an array using Array.from()
  const fake_lookbookArray = Array.from(fake_lookbook);
  
  // Find the index of the element in the array
  const index = fake_lookbookArray.findIndex(item => item === element);

  return index;
}

const observer = new IntersectionObserver((entries) => {
  for(var i = 0;i < entries.length;i++) {
    if(entries[i].isIntersecting) {
      count = Array.from(fake_lookbook).indexOf(entries[0].target) + 1
      // console.log(entries);
      


      lookbook_image.forEach(element => {
        element.querySelectorAll('img').forEach(e => {
          e.style.transform = "translateY(-" + (count) * 100 + "%)"
        });
      });
    } else {
      // count = Array.from(fake_lookbook).indexOf(entries[0].target)
      
      // document.querySelector('#log').innerHTML = count

      lookbook_image.forEach(element => {
        element.querySelectorAll('img').forEach(e => {
          e.style.transform = "translateY(-" + (count) * 100 + "%)"
        });
      });

      
    }
  }
})



// for(var i = 0;i < fake_lookbook.length;i++) {
//   observer.observe(fake_lookbook[i])
// }

// .forEach((el)=> observer.observe(el))

pimages.forEach(element => {
  element.addEventListener("load", function() {
    this.parentNode.parentNode.classList.add("loaded")
  });
});
limages.forEach(element => {
  element.addEventListener("load", function() {
    this.classList.add("loaded")
    this.parentNode.classList.add("loaded")
  });
});

function getAbsoluteHeight(el) {
  // Get the DOM Node if you pass in a string
  el = (typeof el === 'string') ? document.querySelector(el) : el; 

  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']);

  return Math.ceil(el.offsetHeight + margin);
}

const slide = document.querySelector('#menu_slider #slide');
const menu_box = document.querySelector('#menu_slider #menu_box');
const profile_detail = document.querySelector('#menu_slider #profile_detail');
const menu_cart = document.querySelector('#menu_slider #cart');

var profile_open = false;
var cart_open = false;

function menu() {

  if (!menu_open) {
    document.body.classList.remove('cart')
    document.body.classList.remove('profile')
    document.body.classList.add('menu')
  } else {
    document.body.classList.remove('cart')
    document.body.classList.remove('menu')
    document.body.classList.remove('profile')
  }
  menu_open = !menu_open
  profile_open = false;
  cart_open = false;
  slide.style.maxHeight = menu_box.offsetHeight + "px";
}


function profile() {


  if (!profile_open) {
    document.body.classList.remove('cart')
    document.body.classList.add('menu')
    document.body.classList.add('profile')
  } else {
    document.body.classList.remove('cart')
    document.body.classList.remove('menu')
    document.body.classList.remove('profile')
  }
  profile_open = !profile_open

  menu_open = false;
  cart_open = false;
  slide.style.maxHeight = getAbsoluteHeight(profile_detail) + "px"
}

function cart() {
  fetchCartData()
  cartimages.forEach(element => {
    element.src = element.getAttribute('data-src')
  });
  if (!cart_open) {
    document.body.classList.remove('profile')
    document.body.classList.add('menu')
    document.body.classList.add('cart')
  } else {
    document.body.classList.remove('cart')
    document.body.classList.remove('menu')
    document.body.classList.remove('profile')
  }
  cart_open = !cart_open
  menu_open = false;
  profile_open = false;
  slide.style.maxHeight = getAbsoluteHeight(menu_cart) + "px"
}
document.addEventListener('click', function(event) {
    var specificElement = document.getElementById('banner');
    var clickedElement = event.target;
  
    if (clickedElement !== specificElement && !clickedElement.closest('#banner')) {
      if (menu_open) {
        menu()
      }
      if (cart_open) {
        cart()
      }
      if (profile_open) {
        profile()
      }
    }
});

const lefty = document.querySelector('#first_slice #lefty')
if (document.querySelector('#fake') !== null) {
  document.querySelector('#fake').style.height = (scrollGap + (1.2 * innerHeight) + lefty.offsetWidth) + "px"
  // Use scrollGap as needed
}
if (emailinput !== null) {
  emailinput.addEventListener('input', function() {
    var email = emailinput.value;
    var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (isValid) {
      emailsupbit.disabled = false;
    } else {
      emailsupbit.disabled = true;
    }
  });
}

if (mobile_scroll !== null) {
  var setHeight = mobile_scroll.offsetTop
} else {
  var setHeight = innerHeight - 30
}
// mirror.style.height = setHeight + "px"
if (section !== null) {
  section.style.height = innerHeight + "px"
}

function adjustFixedDivWidth() {
  const parentContainer = body;
  const fixedDiv = document.querySelector('#main_content');
  const scrollbarWidth = parentContainer.offsetWidth - parentContainer.clientWidth;

  fixedDiv.style.width = `calc(100% - ${scrollbarWidth}px)`;
}

// Call the function initially and whenever the window is resized
adjustFixedDivWidth();

function backtotop() {
  // Scroll to the top of the page
  document.querySelector('#main_content').scrollTo({
    top: 0,
    behavior: "smooth" // Use smooth scrolling behavior
  });
}
const pcAutocomplete = document.querySelector('#banner #autocomplete.pc_only ul')
const mobileAutocomplete = document.querySelector('#banner #search.mobile_only #autocomplete ul')
function fetchPredictions(value) {
  const url = `/autocomplete?s=${encodeURIComponent(value)}`;

  // Send the GET request using the fetch API
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
    })
    .then(jsonData => {
      // Process the JSON data
      pcAutocomplete.innerHTML = ""
      if(jsonData[0].length > 0) {
        autufillOn()
        for(var a = 0;a < 5;a++) {
          if(jsonData[0][a] != undefined) {
            pcAutocomplete.innerHTML += "<a href='/products/?s="+encodeURIComponent(jsonData[0][a].replace("<span>", "").replace("</span>", ""))+"'><li>"+jsonData[0][a]+"</li>";
          } else {
            pcAutocomplete.innerHTML += "<li><span style='opacity: 0;pointer-event: none;'>dummy</span></li>";
          }
        }
        pcAutocomplete.innerHTML += '<a href="" id="report">Report predictions</a>';

      } else {
        autufillOff()
        for(var a = 0;a < 5;a++) {
          pcAutocomplete.innerHTML += "<li><span style='opacity: 0;pointer-event: none;'>dummy</span></li>";
        }
      }
      
      // pcAutocomplete
    })
    .catch(error => {
      console.error("An error occurred:", error);
      // Handle errors here if needed
    });
}

function fetchPredictionsMobile(value) {
  const url = `/autocomplete?s=${encodeURIComponent(value)}`;

  // Send the GET request using the fetch API
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
    })
    .then(jsonData => {
      // Process the JSON data
      mobileAutocomplete.innerHTML = ""
      if(jsonData[0].length > 0) {
        autufillOn()
        for(var a = 0;a < 5;a++) {
          if(jsonData[0][a] != undefined) {
            mobileAutocomplete.innerHTML += "<a href='/products/?s="+encodeURIComponent(jsonData[0][a].replace("<span>", "").replace("</span>", ""))+"'><li>"+jsonData[0][a]+"</li>";
          } else {
            mobileAutocomplete.innerHTML += "<li><span style='opacity: 0;pointer-event: none;'>dummy</span></li>";
          }
        }
        mobileAutocomplete.innerHTML += '<a href="" id="report">Report predictions</a>';
      } else {
        autufillOff()
        for(var a = 0;a < 5;a++) {
          mobileAutocomplete.innerHTML += "<li><span style='opacity: 0;pointer-event: none;'>dummy</span></li>";
        }
      }
      
      // pcAutocomplete
    })
    .catch(error => {
      console.error("An error occurred:", error);
      // Handle errors here if needed
    });
}

const searchPc = document.querySelector("#banner #search.pc_only input");
const searchMobile = document.querySelector("#banner #search.mobile_only input");
// Add an event listener for the "input" event
searchPc.addEventListener("input", function(event) {
  // This function will be called whenever the input value changes
  const inputValue = event.target.value;
  
  // Call your autocomplete function with the inputValue
  fetchPredictions(inputValue);
});
searchMobile.addEventListener("input", function(event) {
  // This function will be called whenever the input value changes
  const inputValue = event.target.value;
  
  // Call your autocomplete function with the inputValue
  fetchPredictionsMobile(inputValue);
});

function fetchCartData() {
  fetch('/cart/get')
      .then(response => response.json())
      .then(data => {
          const cartItemsContainer = document.getElementById('the_cart');
          cartItemsContainer.innerHTML = "";
          const parsedData = JSON.parse(data);
          document.querySelector('#cart #title h3').innerHTML = parsedData[0].total_qty + " items";
          document.querySelector('#cart #checkout h1').innerHTML = "Totals: " + parsedData[0].total_price + " £";

          parsedData.forEach((item, index) => {
            if (index === 0) {
                return; // Skip the first item
            }
            const itemDiv = document.createElement('div');
            itemDiv.id = 'item';
        
            const qtyDiv = document.createElement('div');
            qtyDiv.id = 'qty';
        
            const incSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            incSvg.setAttribute("class", "inc");
            incSvg.setAttribute("width", "12.434");
            incSvg.setAttribute("height", "7.217");
            incSvg.setAttribute("viewBox", "0 0 12.434 7.217");
        
            const incPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            incPath.setAttribute("id", "Path_10");
            incPath.setAttribute("data-name", "Path 10");
            incPath.setAttribute("d", "M8901.666,2082.484l4.8-4.8,4.8,4.8");
            incPath.setAttribute("transform", "translate(-8900.252 -2076.681)");
            incPath.setAttribute("fill", "none");
            incPath.setAttribute("stroke", "#43d8c9");
            incPath.setAttribute("stroke-linecap", "round");
            incPath.setAttribute("stroke-linejoin", "round");
            incPath.setAttribute("stroke-width", "2");
        
            incSvg.appendChild(incPath);
        
            const qtyInput = document.createElement("input");
            qtyInput.setAttribute("type", "number");
            qtyInput.setAttribute("value", item.qty);
            qtyInput.setAttribute("min", "1");
        
            const decSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            decSvg.setAttribute("class", "dec");
            decSvg.setAttribute("width", "12.434");
            decSvg.setAttribute("height", "7.217");
            decSvg.setAttribute("viewBox", "0 0 12.434 7.217");
        
            const decPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            decPath.setAttribute("id", "Path_9");
            decPath.setAttribute("data-name", "Path 9");
            decPath.setAttribute("d", "M8901.666,2077.681l4.8,4.8,4.8-4.8");
            decPath.setAttribute("transform", "translate(-8900.252 -2076.267)");
            decPath.setAttribute("fill", "none");
            decPath.setAttribute("stroke", "#43d8c9");
            decPath.setAttribute("stroke-linecap", "round");
            decPath.setAttribute("stroke-linejoin", "round");
            decPath.setAttribute("stroke-width", "2");
        
            decSvg.appendChild(decPath);
        
            qtyDiv.appendChild(incSvg);
            qtyDiv.appendChild(qtyInput);
            qtyDiv.appendChild(decSvg);
        
            const imageDiv = document.createElement('div');
            imageDiv.id = 'image';
            imageDiv.classList.add('image_skeleton');
            
            const skeletonDiv = document.createElement('div');
            skeletonDiv.id = 'skeleton_anim';
            imageDiv.appendChild(skeletonDiv);
            
            const img = document.createElement('img');
            img.setAttribute('src', item.product_image_url);  // You should replace this with the actual image URL
            img.setAttribute('data-src', item.product_image_url);  // You should replace this with the actual image URL
            
            imageDiv.appendChild(img);
        
            const contextDiv = document.createElement('div');
            contextDiv.id = 'context';
            
            const productName = document.createElement('h2');
            productName.innerText = item.product_name;
            
            const productPrice = document.createElement('h3');
            productPrice.innerText = item.product_price + ' £';
        
            contextDiv.appendChild(productName);
            contextDiv.appendChild(productPrice);
        
            const deleteDiv = document.createElement('div');
            deleteDiv.id = 'delete';
            deleteDiv.setAttribute('onclick', 'yourDeleteFunction()');  // Replace with your delete function
            
            const deleteImg = document.createElement('img');
            deleteImg.setAttribute('src', '/static/img/icon/delete.png');  // Replace with the correct image URL
            
            deleteDiv.appendChild(deleteImg);
        
            itemDiv.appendChild(qtyDiv);
            itemDiv.appendChild(imageDiv);
            itemDiv.appendChild(contextDiv);
            itemDiv.appendChild(deleteDiv);
        
            cartItemsContainer.appendChild(itemDiv);
        });
      })
      .catch(error => {
          console.error('Error fetching cart data:', error);
      });
}


window.addEventListener('resize', ()=> {
  mirror.style.height = setHeight + "px"
  section.style.height = innerHeight + "px"

  des.style.height = ((fixed_box.getBoundingClientRect().top - des.getBoundingClientRect().top) - 40) + "px"


  adjustFixedDivWidth();

  notch = (scrollGap + innerHeight);
  scrollGap = Math.max((products.scrollHeight - products.offsetHeight), (products.scrollWidth - products.offsetWidth))

  scrollBar = document.querySelector('#dummy_full').offsetWidth - document.querySelector('#dummy_not_full').offsetWidth
  if (mobile_scroll !== null) {
    setHeight = mobile_scroll.offsetTop
    document.querySelector('#fake').style.height = ((products.scrollHeight - products.offsetHeight) + innerHeight) + "px"
  }
  
})

function addTransitionDelay() {
  var childShades = document.querySelectorAll("#child_shade");
  var delay = 0;
  
  childShades.forEach(function(childShade) {
    childShade.style.transitionDelay = delay + "s";
    delay += 0.05;
  });
}

function giveawayDetails() {
  if(!detailed) {
    giveaway.classList.add('detail')
  } else {
    giveaway.classList.remove('detail')
  }

  detailed = !detailed
}

function loadImages() {
  if (pimages.length == 0) {
    console.log("s");
  } else {
    pimages.forEach(element => {
      element.src = element.getAttribute('data-src')
    });
    if (document.querySelector('#giveaway #image img') !== null) {
      document.querySelector('#giveaway #image img').src = document.querySelector('#giveaway #image img').getAttribute('data-src')
    }
    limages.forEach(element => {
      element.src = element.getAttribute('data-src')
    });
  }
}
if (document.querySelector('#giveaway #image img') !== null) {
  document.querySelector('#giveaway #image img').addEventListener("load", function() {
    this.classList.add("loaded")
  });
}

function loaded() {
  addTransitionDelay()
  loadImages()
  // if (innerWidth>850) {
  //   document.querySelector('#shade.wide').style.width = document.querySelectorAll('#products #click_event')[0].getBoundingClientRect.w + "px"
  // }
}

var options = false

function submitParentForm(element) {
  const form = element.closest('form');
  if (form) {
      form.submit();
  }
}

function autufillOn() {
  document.querySelector('#banner #flex').style.transitionDelay = "0s";
  document.querySelector('#banner').classList.add("search");
}
function autufillOff() {
  document.querySelector('#banner #flex').style.transitionDelay = "0.1s";
  document.querySelector('#banner').classList.remove("search");
}

function togoptions() {
  if(!options) {
    document.querySelector('#all_products_tab').classList.add('options')
  } else {
    document.querySelector('#all_products_tab').classList.remove('options')
  }

  options = !options
}

function getContentHeight(element) {
  // Get the computed styles of the element
  var styles = window.getComputedStyle(element);
  // Calculate the content height by subtracting padding and border heights from the total height
  var contentHeight = element.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
  return contentHeight;
}
var scrollPosition = main_content.scrollTop;

// const container = document.querySelector('.scroll-container');
// const content = document.querySelector('.scroll-content');

function smoothScrollLeft(targetPosition, duration, content, container) {
  const startPosition = content.scrollLeft;
  const startTime = performance.now();
  
  function scrollAnimation(currentTime) {
    const elapsedTime = currentTime - startTime;
    const scrollPosition = easeInOutCubic(elapsedTime, startPosition, targetPosition - startPosition, duration);
    content.scrollLeft = scrollPosition;
    
    if (elapsedTime < duration) {
      requestAnimationFrame(scrollAnimation);
    }
  }
  
  requestAnimationFrame(scrollAnimation);
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
}

// Usage example
    
function sideScroll(element,direction,speed,distance,step){
  scrollAmount = 0;
  var slideTimer = setInterval(function(){
      if(direction == 'left'){
          element.scrollLeft -= step;
      } else {
          element.scrollLeft += step;
      }
      scrollAmount += step;
      if(scrollAmount >= distance){
          window.clearInterval(slideTimer);
      }
  }, speed);
}

function grid_type() {
  if(!narrow) {
    document.querySelector('#products').classList.add("merge")
    document.querySelector('#lefty #grid_type').classList.add("narrow")
    document.querySelector('#lefty #grid_type').classList.remove("normal")
  } else {
    document.querySelector('#products').classList.remove("merge")
    document.querySelector('#lefty #grid_type').classList.add("normal")
    document.querySelector('#lefty #grid_type').classList.remove("narrow")
  }

  narrow = !narrow
}

function tick() {
  requestAnimationFrame(tick)
  scrollPosition = main_content.scrollTop;

  // if (scrollPosition >= notch) {
  //   section.classList.add('inactive');
  //   section.style.top = notch + "px"
  // } else {
  //   section.classList.remove('inactive');
  //   section.style.top = "0"
  // }
  if (innerWidth < 750) {
    document.querySelector('#menu_slider div#cart').style.height = (setHeight - 80) + "px"
  }
  
  if (second_slice !== null) {
    if(innerWidth < 750) {
      
        var min_width = (second_slice.offsetWidth - sick.offsetWidth)
        var max_width = (second_slice.offsetWidth - min_width)
        var width = (scrollPosition * max_width) / innerHeight

        var min_height = first_slice.offsetHeight
        var max_height = (setHeight)
        var height = (scrollPosition * max_height) / innerHeight

        mirror.style.maxWidth = (width + min_width) + "px"
        mirror.style.maxHeight = (height + min_height) + "px"
        mirror.style.height = (setHeight - 20) + "px"

        if (scrollPosition >= document.querySelector('#fake').offsetHeight) {
          section.style.top = (document.querySelector('#fake').offsetHeight)+"px"
          section.style.position = "relative"
        } else {
          section.style.top = "0px"
          section.style.position = "sticky"
        }
        
      } else {
        var min_width = (second_slice.offsetWidth - sick.offsetWidth)
        var max_width = (second_slice.offsetWidth * 70) / 100

        var lap = Math.max(scrollPosition - (innerHeight / 2), 0)
        var width = (lap * max_width) / (innerHeight / 2)

        var min_height = getContentHeight(first_slice)
        var max_height = getContentHeight(first_slice) + getContentHeight(second_slice) - 100
        var height = (scrollPosition * max_height) / (innerHeight / 2)

        mirror.style.maxHeight = (height + min_height) + "px"
        mirror.style.maxWidth = (Math.min(((width + min_width) - 30), (80 * first_slice.offsetWidth) / 100) + Math.max(0, (scrollPosition - (80 * first_slice.offsetWidth) / 100))) + "px"
        mirror.style.height = getContentHeight(first_slice) + getContentHeight(second_slice) + "px"
        document.getElementById('lefty').style.height = getContentHeight(first_slice) + getContentHeight(second_slice) + "px"

        if (scrollPosition >= document.querySelector('#fake').offsetHeight) {
          section.style.top = (document.querySelector('#fake').offsetHeight)+"px"
          section.style.position = "relative"
        } else {
          section.style.top = "0px"
          section.style.position = "sticky"
        }
      
      
    }
  }
  

  if (mirror !== null) {
    if (scrollPosition >= (1 * innerHeight)) {
      if(innerWidth < 650) {
        document.querySelector('#scroll p').innerHTML = "Join The Crew"
      }
      mirror.parentNode.classList.add("animate")
    } else {
      mirror.parentNode.classList.remove("animate")
    }
  }

  if (products !== null && document.querySelector('#fake') !== null) {
    products.scrollTop = Math.max(0, scrollPosition - (1.2 * innerHeight))
    products.scrollLeft = Math.max(0, scrollPosition - (1.2 * innerHeight))
    document.getElementById('banner').style.transform = "translate(-50%, -"+ Math.max(scrollPosition - document.querySelector('#fake').offsetHeight, 0) +"px)"
    // document.querySelector('#second_slice #mirror').style.transform = "translate(0px , "+ Math.min((scrollPosition * 100) / (innerHeight * (2/3)), 100) +"%)"
    document.querySelector('#first_slice h1').style.transform = "translate(0px , -"+ scrollPosition +"px)"
    document.querySelector('#second_slice').style.transform = "translate(0px , -"+ scrollPosition +"px)"
    if (scrollPosition > 10) {
      document.querySelector('#second_slice').classList.add("round")
    } else {
      document.querySelector('#second_slice').classList.remove("round")
    }
    if(fake_lookbook.length > 0) {
      if (scrollPosition >= fake_lookbook[0].offsetTop - innerHeight && scrollPosition <= newsletter.offsetTop - innerHeight) {
          lookbook.classList.add("stick")
          lookbook.style.top = "0px"
          // lookbook.style.left = "calc(50% - " + scrollBar / 2 + "px)"
      } else if(scrollPosition >= newsletter.offsetTop - innerHeight) {
        lookbook.style.top = newsletter.offsetTop - fake_lookbook[fake_lookbook.length - 1].offsetTop + "px"
        lookbook.classList.remove("stick")
        // lookbook.style.left = "calc(50% - " + 0 + "px)"
      } 
      else {
          lookbook.classList.remove("stick")
          lookbook.style.top = "auto"
          lookbook.style.left = "calc(50% - " + 0 + "px)"
      }

      var c = Math.min(Math.round(Math.max(scrollPosition - (fake_lookbook[0].offsetTop - innerHeight) , 0) / 1000), fake_lookbook.length)

    }
  }

  var lookbook_step = 0

  fake_lookbook.forEach(element => {
    lookbook_step += Math.max(Math.min(scrollPosition - element.offsetTop, 1), 0)
  });


  lookbook_image.forEach(element => {
    element.querySelectorAll('img').forEach(e => {
      e.style.transform = "translateY(-" + (c) * 100 + "%)"
    });
  });

  for(var i = 0;i < mo_lookbook_li.length;i++) {
    if (i == c) {
      var scrollHere = mo_lookbook_li[i].offsetLeft;

      // smoothScrollLeft(scrollHere, 1000, mo_lookbook_li[i].parentNode);

      // sideScroll(mo_lookbook_li[i].parentNode,'left',25, scrollHere,10)
      mo_lookbook_li[i].parentNode.scrollLeft = scrollHere
      mo_lookbook_li[i].classList.add('active')
    } else {
      mo_lookbook_li[i].classList.remove('active')
    } 
  }
  for(var i = 0;i < pc_lookbook_li.length;i++) {
    if (i == c) {
      pc_lookbook_li[i].classList.add('active')
    } else {
      pc_lookbook_li[i].classList.remove('active')
    }
  }

}

function scrollToElement(elementSpec) {
  const targetElement = elementSpec;
  const scrollableDiv = targetElement.parentNode;

  if (scrollableDiv && targetElement) {
    const offsetTop = targetElement.offsetTop;
    const currentScrollTop = scrollableDiv.scrollTop;
    const scrollOffset = offsetTop - currentScrollTop;

    scrollableDiv.scrollTo({
      top: scrollOffset
    })
    
  }
}


tick()

const inc = document.querySelectorAll('svg.inc')
const dec = document.querySelectorAll('svg.dec')

inc.forEach(element => {
  element.addEventListener('click', function(event) {
    var input = event.currentTarget.parentNode.querySelector('input')
    input.value = parseInt(input.value) + 1
  })
});

dec.forEach(element => {
  element.addEventListener('click', function(event) {
    var input = event.currentTarget.parentNode.querySelector('input')
    input.value = parseInt(input.value) - 1
  })
});