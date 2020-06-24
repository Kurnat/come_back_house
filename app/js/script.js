$(document).ready(function () {



    //########################################################
    let scrollChecker = true;
    // 
    const scrollToElement = (selector) => {
        console.log(!!selector);

        let windowTop = $(window).scrollTop();
        let elementTop = $(selector).offset().top;

        // show element if element have been shown on scrin more then 90%
        if (windowTop >= (elementTop - (elementTop / 10))) {

            $('.percent-numbers').fadeIn(2500);
            // show percentage calculation
            const callback = () => {
                return new Promise((resolve) => {

                    if (scrollChecker) {
                        // if scroll was scrolled 1 time
                        scrollChecker = false;
                        let val = +$('.percent-numbers').text();

                        let progress = setInterval(() => {
                            // printing percentage
                            $('.percent-numbers').text(val);
                            val++;
                            if (val > 68) {
                                // stop writing
                                clearInterval(progress);
                                resolve();
                            };
                        }, 40)
                    }
                }).then(() => {
                    // show procent symbol and text
                    $('.percent-numbers').text(68)
                    $('.percent-symbol').fadeIn(2500)
                    $('.description').delay(900).animate({
                        opacity: 1
                    }, 2400, 'easeInCirc', () => {
                        // show items inside
                        $('.features__progress').fadeOut(2000, () => {
                            $('.features__item').each(function (idx) {
                                $(this).delay((idx + 1) * (idx + 350)).animate({
                                    opacity: 1
                                }, 2000)
                            })
                        })
                    })
                });
            }
            callback();
        }
    }

    //  ##################################################################

    // function to scroll down
    function OnClickScroll(id, toElement) {
        $(id).click(() => {
            $('html').animate({
                scrollTop: $(toElement).offset().top
            }, 1200, 'easeOutQuad')
        })
    }
    // navigation buttons to scroll down
    OnClickScroll('#toPortfolio', '#portfolio-section');
    OnClickScroll('#toServices', '#servicesSection');
    OnClickScroll('#toTeamSection', '#team-section');
    OnClickScroll('#button-up', '#header-slider');
    OnClickScroll('#toContactSection', '#footer');

    // scroll by button-down on header
    $('#button-down').click(function () {
        $('html').animate({
            scrollTop: $('#header-slider').innerHeight()
        }, 1200, 'easeOutQuad')
    })
    




    $(window).scroll(function () {
        if (window.scrollY > $('#header-slider').height()) {
            $('.services__lights').css({
                position: 'absolute'
            })
        } else {
            $('.services__lights').css({
                position: 'fixed'
            })
        }
        if (document.getElementById('features')) {
            scrollToElement(document.getElementById('features'));

        }
    })
    if (document.getElementById('features')) {
        scrollToElement(document.getElementById('portfolio-section'));

    }


    $(window).trigger('scroll');

    // portfolio - section

    // #####################################
    // slider mouve
    $(".box").twentytwenty({
        default_offset_pct: 0.5
    });






















    // webp

    function testWebP(callback) {

        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {

        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });

})