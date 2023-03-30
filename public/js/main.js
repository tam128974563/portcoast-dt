(function () {

    'use strict';



    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var fullHeight = function () {

        if (!isMobile.any()) {
            $('.js-fullheight').css('height', $(window).height());
            $(window).resize(function () {
                $('.js-fullheight').css('height', $(window).height());
            });
        }

    };


    var counter = function () {
        $('.js-counter').countTo({
            formatter: function (value, options) {
                return value.toFixed(options.decimals);
            },
        });
    };


    var counterWayPoint = function () {
        if ($('#pcc-quote').length > 0) {
            $('#pcc-quote').waypoint(function (direction) {

                if (direction === 'down' && !$(this.element).hasClass('animated')) {
                    setTimeout(counter, 400);
                    $(this.element).addClass('animated');
                }
            }, {
                offset: '90%'
            });
        }
    };

    // Animations
    var contentWayPoint = function () {
        var i = 0;
        $('.animate-box').waypoint(function (direction) {

            if (direction === 'down' && !$(this.element).hasClass('animated')) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function () {

                    $('body .animate-box.item-animate').each(function (k) {
                        var el = $(this);
                        setTimeout(function () {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            } else {
                                el.addClass('fadeInUp animated');
                            }

                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });

                }, 100);

            }

        }, {
            offset: '85%'
        });
    };


    var Menu = function () {
        // Sticky Navbar
        $(window).scroll(function () {
            if ($(this).scrollTop() > 0) {
                $('.navbar').addClass('nav-sticky');
            } else {
                $('.navbar').removeClass('nav-sticky');
            }
        });
        


    };


    var stickyFunction = function () {

        var h = $('.image-content').outerHeight();

        if ($(window).width() <= 992) {
            $("#sticky_item").trigger("sticky_kit:detach");
        } else {
            $('.sticky-parent').removeClass('stick-detach');
            $("#sticky_item").trigger("sticky_kit:detach");
            $("#sticky_item").trigger("sticky_kit:unstick");
        }

        $(window).resize(function () {
            var h = $('.image-content').outerHeight();
            $('.sticky-parent').css('height', h);


            if ($(window).width() <= 992) {
                $("#sticky_item").trigger("sticky_kit:detach");
            } else {
                $('.sticky-parent').removeClass('stick-detach');
                $("#sticky_item").trigger("sticky_kit:detach");
                $("#sticky_item").trigger("sticky_kit:unstick");

                $("#sticky_item").stick_in_parent();
            }




        });

        $('.sticky-parent').css('height', h);

        $("#sticky_item").stick_in_parent();

    };

    var owlCrouselFeatureSlide = function () {
        $('.owl-carousel').owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            autoplay: true,
            loop: true,
            margin: 0,
            nav: true,
            dots: false,
            autoHeight: true,
            items: 1,
            navText: [
                "<i class='icon-arrow-left3 owl-direction'></i>",
                "<i class='icon-arrow-right3 owl-direction'></i>"
            ]
        })
    };
    $('.owl-logo-item').owlCarousel({
        items: 4,
        loop: true,
        dots: false,
        pagination: false,
        nav: false,
        autoplay: true,
        margin: 15,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 2
            },
            800: {
                items: 4
            },
            1000: {
                items: 6
            }
        }
    })

    $('.owl-testimonials').owlCarousel({
        items: 3,
        loop: true,
        dots: false,
        nav: false,
        pagination: false,
        autoplay: true,
        margin: 15,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
    // Document on load.
    $(function () {
        fullHeight();
        counter();
        counterWayPoint();
        contentWayPoint();
        Menu();

        stickyFunction();
        owlCrouselFeatureSlide();
    });


    // Fillter
    $(function () {
        $(".filtering").on("click", "span", function () {
            var a = $(".gallery").isotope({});
            var e = $(this).attr("data-filter");
            a.isotope({
                filter: e,
                layoutMode: 'fitRows'
            });
        });
        $(".filtering").on("click", "span", function () {
            $(this).addClass("active").siblings().removeClass("active");
        });
    });
       // Dropdown on mouse hover
       $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });

}());