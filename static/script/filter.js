var filter = false
var sort = false

const filterEl = document.querySelector('#tabs ul li#filter')
const sortEl = document.querySelector('#tabs ul li#sort')

filterSetting = [0,0]
sortSetting = [3, 0]
catSetting = "All"

const productsListed = document.querySelectorAll('#scroll_frame #products #click_event')

function miniSearch() {
    var search = document.querySelector('#tabs #mini_search').value
    productsListed.forEach(e => {
        var pName = e.getAttribute('data-name')
        if(search == "") {
            setting()
        } else {
            if(pName.toLowerCase().includes(search.toLowerCase())) {
                e.style.display = "block";
            } else {
                e.style.display = "none";
            }
        }
        
    })
}

function setting(filter = filterSetting, sort = sortSetting, cat = catSetting) {
    filterSetting = filter
    sortSetting = sort
    catSetting = cat

    productsListed.forEach(e => {
        var show = 3

        var pCat = e.getAttribute('data-cat')
        var pDate = e.getAttribute('data-date')
        var pPrice = parseFloat(e.getAttribute('data-price'))
        if(pCat == cat || cat == "All") {
            e.style.display = "block";
        } else {
            show--
        }

        // Filter
        if (filter == [0,0]) {
            e.style.display = "block";
        } else {
            switch(filter[0]) {
                case 1:
                    if (pPrice >= filter[1][0] && pPrice <= filter[1][1]) {
                        e.style.display = "block";
                    } else {
                        show--
                    }
                    break;
                // case 2: Size feature is un-available!

            }
        }

        if(show != 3) {
            e.style.display = "none";
        } else {
            e.style.display = "block"
        }
        
    })
}
setting()

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            setting(undefined,undefined,this.innerHTML)
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
  });
}

function closeAllSelect(elmnt) {
    const clickedElement = elmnt.target;
    if (clickedElement != undefined) {
        const filterElement = clickedElement.closest("#filter");
        const sortElement = clickedElement.closest("#sort");
        if (!filterElement) {
            filter = false
            document.body.classList.remove("filter")
        }
        if (!sortElement) {
            sort = false
            document.body.classList.remove("sort")
        }
    }
    
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  document.querySelector(".custom-select").classList.toggle("select-arrow-active");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);




function togFilter() {
    if(!filter) {
        document.body.classList.add("filter")
        document.body.classList.remove("sort")
        sort = false
    } else {
        document.body.classList.remove("filter")
        document.body.classList.remove("sort")
        sort = false
    }

    filter = !filter
}
// secondCustomSelect()

function togSort() {
    if(!sort) {
        document.body.classList.add("sort")
        document.body.classList.remove("filter")
        filter = false
    } else {
        document.body.classList.remove("sort")
        document.body.classList.remove("filter")
        filter = false
    }

    sort = !sort
}