let thumbnail = document.querySelectorAll('#slider #border')
let active = document.querySelectorAll('#slider #border.active')

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