/* ============================================
   FAHAD TRANSPORT & LOGISTICS
   Main jQuery Script
   ============================================ */

$(document).ready(function () {

    /* ============================================
       1. PRELOADER
       ============================================ */
    $(window).on('load', function () {
        $('#preloader').addClass('loaded');
        // Remove from DOM after animation
        setTimeout(function () {
            $('#preloader').remove();
        }, 600);
    });

    // Fallback: remove preloader after 3 seconds max
    setTimeout(function () {
        $('#preloader').addClass('loaded');
        setTimeout(function () {
            $('#preloader').remove();
        }, 600);
    }, 3000);


    /* ============================================
       2. STICKY HEADER ON SCROLL
       ============================================ */
    var $header = $('#header');
    var $backToTop = $('#backToTop');

    $(window).on('scroll', function () {
        var scrollTop = $(this).scrollTop();

        // Sticky header
        if (scrollTop > 80) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }

        // Back to top button visibility
        if (scrollTop > 500) {
            $backToTop.addClass('visible');
        } else {
            $backToTop.removeClass('visible');
        }
    });

    // Trigger scroll event on page load
    $(window).trigger('scroll');


    /* ============================================
       3. MOBILE NAVIGATION TOGGLE
       ============================================ */
    var $navToggle = $('#navToggle');
    var $navMenu = $('#navMenu');

    $navToggle.on('click', function () {
        $(this).toggleClass('active');
        $navMenu.toggleClass('active');
    });

    // Close mobile menu on link click
    $navMenu.find('.nav-link').on('click', function () {
        $navToggle.removeClass('active');
        $navMenu.removeClass('active');
    });

    // Close mobile menu on outside click
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.navbar').length) {
            $navToggle.removeClass('active');
            $navMenu.removeClass('active');
        }
    });


    /* ============================================
       4. SMOOTH SCROLLING
       ============================================ */
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            var headerHeight = $header.outerHeight();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - headerHeight + 10
            }, 800, 'swing');
        }
    });


    /* ============================================
       5. ACTIVE NAV LINK ON SCROLL
       ============================================ */
    var $sections = $('section[id]');
    var $navLinks = $('.nav-link');

    $(window).on('scroll', function () {
        var scrollPos = $(this).scrollTop() + 120;

        $sections.each(function () {
            var $section = $(this);
            var sectionTop = $section.offset().top;
            var sectionHeight = $section.outerHeight();
            var sectionId = $section.attr('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                $navLinks.removeClass('active');
                $navLinks.filter('[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });


    /* ============================================
       6. HERO IMAGE SLIDER
       ============================================ */
    var $slides = $('.hero-slide');
    var $dots = $('.slider-dots .dot');
    var currentSlide = 0;
    var totalSlides = $slides.length;
    var sliderInterval;

    function goToSlide(index) {
        // Remove active from all slides and dots
        $slides.removeClass('active');
        $dots.removeClass('active');

        // Set current slide
        currentSlide = index;
        if (currentSlide >= totalSlides) currentSlide = 0;
        if (currentSlide < 0) currentSlide = totalSlides - 1;

        // Activate current slide and dot
        $slides.eq(currentSlide).addClass('active');
        $dots.eq(currentSlide).addClass('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Auto-play slider every 5 seconds
    function startSlider() {
        sliderInterval = setInterval(nextSlide, 5000);
    }

    function resetSlider() {
        clearInterval(sliderInterval);
        startSlider();
    }

    // Dot click
    $dots.on('click', function () {
        var slideIndex = parseInt($(this).data('slide'));
        goToSlide(slideIndex);
        resetSlider();
    });

    // Start auto slider
    startSlider();


    /* ============================================
       7. SCROLL ANIMATIONS (Fade-in on Scroll)
       ============================================ */
    var $animateElements = $('[data-animate]');

    function checkAnimations() {
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();

        $animateElements.each(function () {
            var $el = $(this);
            var elTop = $el.offset().top;
            var triggerPoint = scrollTop + windowHeight - 80;

            if (elTop < triggerPoint && !$el.hasClass('animated')) {
                // Add stagger delay for grid items
                var $parent = $el.parent();
                var index = $el.index();
                var delay = index * 100;

                setTimeout(function () {
                    $el.addClass('animated');
                }, delay);
            }
        });
    }

    // Check on scroll and on load
    $(window).on('scroll', checkAnimations);
    checkAnimations();


    /* ============================================
       8. COUNTER ANIMATION (Stats)
       ============================================ */
    var countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        var $statsSection = $('.about-stats');
        if (!$statsSection.length) return;

        var sectionTop = $statsSection.offset().top;
        var scrollTrigger = $(window).scrollTop() + $(window).height() - 100;

        if (scrollTrigger > sectionTop) {
            countersAnimated = true;

            $('[data-count]').each(function () {
                var $counter = $(this);
                var target = parseInt($counter.data('count'));
                var duration = 2000;
                var start = 0;
                var increment = target / (duration / 16);

                var timer = setInterval(function () {
                    start += increment;
                    if (start >= target) {
                        start = target;
                        clearInterval(timer);
                    }
                    $counter.text(Math.floor(start));
                }, 16);
            });
        }
    }

    $(window).on('scroll', animateCounters);
    animateCounters();


    /* ============================================
       9. CONTACT FORM HANDLING
       ============================================ */
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        var $form = $(this);
        var $btn = $form.find('button[type="submit"]');
        var originalText = $btn.html();

        // Show loading state
        $btn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        $btn.prop('disabled', true);

        // Simulate form submission (replace with actual AJAX call)
        setTimeout(function () {
            $btn.html('<i class="fas fa-check"></i> Message Sent!');
            $btn.css('background', '#25d366');

            // Reset form
            $form[0].reset();

            // Revert button after 3 seconds
            setTimeout(function () {
                $btn.html(originalText);
                $btn.css('background', '');
                $btn.prop('disabled', false);
            }, 3000);
        }, 1500);
    });


    /* ============================================
       10. WHATSAPP TOOLTIP
       ============================================ */
    // The WhatsApp button is handled via CSS, no extra JS needed


    /* ============================================
       11. KEYBOARD ACCESSIBILITY
       ============================================ */
    // Allow Enter/Space on slider dots
    $dots.on('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    }).attr('tabindex', '0').attr('role', 'button');


    /* ============================================
       12. RESIZE HANDLER
       ============================================ */
    var resizeTimer;
    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            // Close mobile nav on resize to desktop
            if ($(window).width() > 768) {
                $navToggle.removeClass('active');
                $navMenu.removeClass('active');
            }
        }, 250);
    });

});
