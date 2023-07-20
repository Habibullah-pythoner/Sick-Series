var menu_open = false

var section = document.getElementById('landing');
var sectionOffset = section.offsetTop;
var sectionHeight = section.offsetHeight;
const main_content = document.getElementById("main_content");

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

var notch = (scrollGap + innerHeight);
var scrollGap = Math.max((products.scrollHeight - products.offsetHeight), (products.scrollWidth - products.offsetWidth))

const pimages = document.querySelectorAll('#products #product #images img');
const limages = document.querySelectorAll('#lookbooks #container #image img');

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

function menu() {
    if (!menu_open) {
        document.body.classList.add('menu')
    } else {
        document.body.classList.remove('menu')
    }
    menu_open = !menu_open
}

document.addEventListener('click', function(event) {
    var specificElement = document.getElementById('banner');
    var clickedElement = event.target;
  
    if (clickedElement !== specificElement && !clickedElement.closest('#banner')) {
      if (menu_open) {
        menu()
      }
    }
});

const lefty = document.querySelector('#first_slice #lefty')
document.querySelector('#fake').style.height = (scrollGap + (1.2 * innerHeight) + lefty.offsetWidth) + "px"

emailinput.addEventListener('input', function() {
  var email = emailinput.value;
  var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (isValid) {
    emailsupbit.disabled = false;
  } else {
    emailsupbit.disabled = true;
  }
});


var setHeight = mobile_scroll.offsetTop

// mirror.style.height = setHeight + "px"
section.style.height = innerHeight + "px"

function adjustFixedDivWidth() {
  const parentContainer = body;
  const fixedDiv = document.querySelector('#main_content');
  const scrollbarWidth = parentContainer.offsetWidth - parentContainer.clientWidth;

  fixedDiv.style.width = `calc(100% - ${scrollbarWidth}px)`;
}

// Call the function initially and whenever the window is resized
adjustFixedDivWidth();

window.addEventListener('resize', ()=> {
  mirror.style.height = setHeight + "px"
  section.style.height = innerHeight + "px"

  adjustFixedDivWidth();

  document.querySelector('#fake').style.height = ((products.scrollHeight - products.offsetHeight) + innerHeight) + "px"
})

function addTransitionDelay() {
  var childShades = document.querySelectorAll("#child_shade");
  var delay = 0;
  
  childShades.forEach(function(childShade) {
    childShade.style.transitionDelay = delay + "s";
    delay += 0.05;
  });
}

function loadImages() {
  pimages.forEach(element => {
    element.src = element.getAttribute('data-src')
  });

  limages.forEach(element => {
    element.src = element.getAttribute('data-src')
  });
}

function loaded() {
  addTransitionDelay()
  loadImages()
  
}

function getContentHeight(element) {
  // Get the computed styles of the element
  var styles = window.getComputedStyle(element);
  // Calculate the content height by subtracting padding and border heights from the total height
  var contentHeight = element.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
  return contentHeight;
}
var scrollPosition = main_content.scrollTop;
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
  

  if (scrollPosition >= (1 * innerHeight)) {
    if(innerWidth < 650) {
      document.querySelector('#scroll p').innerHTML = "Join The Crew"
    }
    mirror.parentNode.classList.add("animate")
  } else {
    mirror.parentNode.classList.remove("animate")
  }

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
}

tick()

