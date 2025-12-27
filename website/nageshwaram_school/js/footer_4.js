function increaseHindiFont(root = document.body) {

    const regex = /([\u0900-\u097F]+)/g;

    function processNode(node) {
        if (node.nodeType === 3) {
            if (regex.test(node.nodeValue)) {
                const span = document.createElement("span");
                span.style.fontSize = "20px";
                span.textContent = node.nodeValue;
                node.replaceWith(span);
            }
        } else {
            node.childNodes.forEach(processNode);
        }
    }

    root.childNodes.forEach(processNode);
}

increaseHindiFont();
baguetteBox.run('#gallery');

$(document).ready(function () {
    $(".team_carousel").owlCarousel({
        navigation: false,
        slideSpeed: 500,
        paginationSpeed: 800,
        rewindSpeed: 1000,
        singleItem: true,
        autoPlay: true,
        stopOnHover: true,
        nav: true,
        dots: true,
    });
});
$(document).ready(function () {
    $(".slider-sustanibility").owlCarousel({

        slideSpeed: 500,
        loop: false,
        margin: 10,
        nav: true,
        autoPlay: true,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            900: {
                items: 4
            },
            1100: {
                items: 6
            }
        }
    });
});

$(document).ready(function () {
    $('#newModal').modal('show');
});

$(document).ready(function () {
    var owl = $('.new-slider');

    // Initialize Owl Carousel
    owl.owlCarousel({
        loop: true,
        center: false,
        margin: 0,
        autoheight: true,
        lazyload: true,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 6000,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1200: {
                items: 1.5
            }
        }
    });

    $('.new-slider .owl-item').eq(owl.find('.owl-item.active').index()).find('.item').addClass(
        'active-slide');
    owl.on('changed.owl.carousel', function (event) {
        $('.new-slider .item').removeClass('active-slide');
        var currentIndex = event.item.index;
        $('.new-slider .owl-item').eq(currentIndex).find('.item').addClass('active-slide');
    });
});

$(".link").on('click', function () {
    var $submenu_first = $(this).next(".submenu");
    var $arrow_first = $(this).find('.arrow-up');
    if ($submenu_first.is(":visible")) {
        $submenu_first.slideUp();
        $arrow_first.css('transform', 'rotate(0deg)');
    } else {
        $(".submenu").slideUp();
        $submenu_first.slideDown();
        $arrow_first.css('transform', 'rotate(180deg)');
    }
});

$(".link_second").on('click', function () {
    var $submenu = $(this).next(".submenu_second");
    var $arrow = $(this).find('.arrow-up-second');
    if ($submenu.is(":visible")) {
        $submenu.slideUp();
        $arrow.css('transform', 'rotate(0deg)');
    } else {
        $(".submenu_second").slideUp();
        $submenu.slideDown();
        $arrow.css('transform', 'rotate(180deg)');
    }
});

$('.acordition-heading').on('click', function () {
    let elAttr = $(this).attr('data-target');
    $(this).closest('.acordition-item').addClass('active');
    $(this).closest('.acordition-item').siblings().removeClass('active');
    $(elAttr).addClass('active');
    $(elAttr).siblings().removeClass('active');
})


$('.owl_carousel').owlCarousel({
    loop: true,
    margin: 10,
    center: false,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    dots: false,
    nav: true,
    navText: [
        '',
        ''
    ],
    navClass: ['custom-prev-btn', 'custom-next-btn'],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1200: {
            loop: false,
            items: 3
        }
    }
});
$('.by-slider').owlCarousel({
    loop: true,
    margin: 10,
    center: false,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    dots: false,
    nav: false,
    navText: [
        '',
        ''
    ],
    navClass: ['custom-prev-btn', 'custom-next-btn'],
    responsive: {
        0: {
            items: 1
        },
        900: {
            items: 2
        },
        1200: {
            items: 3
        }
    }
});
$('.custom-by-prev').click(function () {
    $('.by-slider').trigger('prev.owl.carousel');
})
$('.custom-by-next').click(function () {
    $('.by-slider').trigger('next.owl.carousel');
})


$('.owl_carousel').owlCarousel({
    loop: true,
    margin: 10,
    center: false,
    lazyLoad: true,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    dots: false,
    nav: true,
    navText: [
        '',
        ''
    ],
    navClass: ['custom-prev-btn', 'custom-next-btn'],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 3
        }
    }
});

var sections = $('section'),
    nav = $('nav'),
    nav_height = nav.outerHeight();

$(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    sections.each(function () {
        var top = $(this).offset().top - 150,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('active');
            sections.removeClass('active');

            $(this).addClass('active');
            nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
        }
    });
});

// nav.find('a').on('click', function() {
//     var $el = $(this),
//         id = $el.attr('href');

//     $('html, body').animate({
//         scrollTop: $el.offset().top - 70
//     }, 350);

//     return false;
// });
$(document).ready(function () {
    $(".accordion-header").on("click", function () {
        // Toggle active class
        $(this).toggleClass("active");

        // Show or hide content
        $(this).next(".accordion-content").slideToggle();

        // Close other sections
        $(".accordion-header").not(this).removeClass("active");
        $(".accordion-content").not($(this).next()).slideUp();
    });


    $('#myCarousel').on('slid.bs.carousel', function () {
        const caption = $(this).find('.carousel-caption');
        caption.removeClass('animate');
        void caption.offsetWidth; // trigger reflow
        caption.addClass('animate');
    });
});
// tab section script 
$(document).ready(function () {
    $(".slider-sustanibility .nav-link").on('click', function (e) {
        e.preventDefault();
        $(".slider-sustanibility .nav-link").removeClass("active")
        $(this).addClass("active")
        $('.sustanibilty-tab .tab-pane').removeClass('active show')
        $(`.sustanibilty-tab ${$(this).attr('href')}`).addClass('active show')
        // console.log($(this).attr('href'))
    })
})

$(document).ready(function () {
    function isChecked() {
        if ($(this).is(':checked')) {
            $('.registration-link').css({
                'pointerEvents': 'auto',
                'opacity': '1'
            });
        } else {
            $('.registration-link').css({
                'pointerEvents': 'none',
                'opacity': '0.5'
            })
        }
    }
    $('#readAll').on('change', isChecked);
    isChecked()
    $('.u-cards img').on('click', function () {
        $('.u-cards img').removeClass('active');
        $(this).addClass('active');
        $('#u-card-thumb').attr('src', $(this).attr('src'));
        $('.u-card-title-target').text($(this).siblings('.u-card-title').text());
        $('.u-card-date-target').text($(this).siblings('.u-card-date').text());
        $('#webDesc').html($(".u-cards img.active").siblings('.u-card-desc').html());
        var webUrl = $(".u-cards img.active").siblings('.u-card-weburl').text();
        if (webUrl != '') {
            $('#webUrl').attr('href', $(".u-cards img.active").siblings('.u-card-weburl').text())
                .removeClass('d-none');
        } else {
            $('#webUrl').attr('href', $(".u-cards img.active").siblings('.u-card-weburl').text())
                .addClass('d-none');
        }
    })
    $('#u-card-thumb').attr('src', $(".u-cards img.active").attr('src'));
    $('.u-card-title-target').text($(".u-cards img.active").siblings('.u-card-title').text());
    $('.u-card-date-target').text($(".u-cards img.active").siblings('.u-card-date').text());
    $('#webDesc').html($(".u-cards img.active").siblings('.u-card-desc').html());
    var webUrl = $(".u-cards img.active").siblings('.u-card-weburl').text();
    if (webUrl != '') {
        $('#webUrl').attr('href', $(".u-cards img.active").siblings('.u-card-weburl').text()).removeClass(
            'd-none');
    } else {
        $('#webUrl').attr('href', $(".u-cards img.active").siblings('.u-card-weburl').text()).addClass(
            'd-none');
    }

});

// tour btn click modal 
$('.virtual-btn').click(function (e) {
    e.preventDefault()
    const video = $('#virtualTour video').get(0);
    video.currentTime = 0;
    video.play();

    $('#virtualTour').modal('show');
});
// container right js
function updateContainerWidth() {
    let dwidth = 0;
    if ($(window).outerWidth() > 768) {
        dwidth = $('.container').outerWidth() + Math.floor(($(window).outerWidth() - $('.container').outerWidth()) / 2);
    } else {
        dwidth = "100%";
    }
    $('.container-right').width(dwidth);
}
updateContainerWidth()
$(window).on('resize orientationchange', updateContainerWidth)

document.querySelectorAll('.carousel').forEach(carousel => {
    new bootstrap.Carousel(carousel, {
        interval: 1500, // time in milliseconds (e.g., 5000ms = 5 seconds)
        ride: 'carousel'
    });
});