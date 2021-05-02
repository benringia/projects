$(document).ready(function() {
    $('.carousel').owlCarousel({
        loop:true,
        dots:false,
        autoplay: false,
        nav: true,
        arrows: true,
        margin: 10,
        responsive: {
            0: {
                items:1,
                nav: true,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3
            },
            1250: {
                items: 4
            },
            2000: {
                items: 5
            }
        }
    })
})