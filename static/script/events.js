var menu_open = false

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

var section = document.getElementById('landing');
var sectionOffset = section.offsetTop;
var sectionHeight = section.offsetHeight;
const main_content = document.getElementById("main_content");
var notch = document.getElementById("fake").offsetHeight;

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