var menu_open = false

var section = document.getElementById('landing');
var sectionOffset = section.offsetTop;
var sectionHeight = section.offsetHeight;
const main_content = document.getElementById("main_content");
var notch = document.getElementById("fake").offsetHeight;
var emailinput = document.getElementById('email_input');
var emailsupbit = document.getElementById('email_submit');
var body = document.body;

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



emailinput.addEventListener('input', function() {
  var email = emailinput.value;
  var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (isValid) {
    emailsupbit.disabled = false;
  } else {
    emailsupbit.disabled = true;
  }
});


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
}

tick()

