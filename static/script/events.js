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
const products = document.querySelector('#landing #scroll_frame')

var notch = ((products.scrollHeight - products.offsetHeight) + innerHeight);

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

document.querySelector('#fake').style.height = ((products.scrollHeight - products.offsetHeight) + (1.2 * innerHeight)) + "px"



emailinput.addEventListener('input', function() {
  var email = emailinput.value;
  var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (isValid) {
    emailsupbit.disabled = false;
  } else {
    emailsupbit.disabled = true;
  }
});


var setHeight = scroll.offsetTop

mirror.style.height = setHeight + "px"
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

function loaded() {
  addTransitionDelay()
}

function tick() {
  requestAnimationFrame(tick)
  var scrollPosition = main_content.scrollTop;

  if (scrollPosition >= notch) {
    section.classList.add('inactive');
    section.style.top = notch + "px"
  } else {
    section.classList.remove('inactive');
    section.style.top = "0"
  }

  var min_width = (second_slice.offsetWidth - sick.offsetWidth)
  var max_width = (second_slice.offsetWidth - min_width)
  var width = (scrollPosition * max_width) / innerHeight

  var min_height = first_slice.offsetHeight
  var max_height = (setHeight)
  var height = (scrollPosition * max_height) / innerHeight

  mirror.style.maxWidth = (width + min_width) + "px"
  mirror.style.maxHeight = (height + min_height) + "px"

  if (scrollPosition >= (1 * innerHeight)) {
    mirror.classList.add("animate")
  } else {
    mirror.classList.remove("animate")
  }

  products.scrollTop = Math.max(0, scrollPosition - (1.2 * innerHeight))

}

tick()

