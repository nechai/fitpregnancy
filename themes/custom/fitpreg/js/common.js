(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.commonBehavior = {
        attach: function () {
            var menu = document.getElementsByClassName("menu--weekly-menu");
            var li = $(menu).children('ul').children();
            $.each(li, function () {
                $(this, '.menu--weekly-menu div.views-row').mouseenter(function () {
                    var aaa = this;
                    timer = setTimeout(function () {
                        var ourRequest = new XMLHttpRequest();
                        ourRequest.open("GET", "/ajax/" + aaa.getElementsByTagName('a')[0].innerHTML);
                        ourRequest.onload = function () {
                            var ourData = jQuery.parseHTML(ourRequest.responseText);
                            var data = $("<div>").append(ourData).find('.view-content').html();
                            if (data !== undefined) {
                                // $("<div class='ajax-block'></div>").before(aaa.closest('ul'));
                                aaa.closest('ul').insertAdjacentHTML('beforeend', data);

                                $('.ajax-block').css({
                                    'position': 'absolute',
                                    'top': '0',
                                    'left': '0',
                                    'background': 'green'
                                });
                            }
                        };
                        ourRequest.send();
                    }, 500);
                }).mouseleave(function () {
                    clearTimeout(timer);
                    $('.menu--weekly-menu div.views-row, .attachment-after').remove();
                });
            });
        }
    };

    Drupal.behaviors.leftMenuAnimateBehavior = {
        attach: function (context, settings) {
            var animatedElement = $('#block-fitpreg-left-menu');
            $('.left-menu-hamburger').once('animateLeftMenu').click(function () {
                if (animatedElement.css('display') === 'none') {
                    animatedElement.css({display: 'block'});
                }
                animatedElement.animateCss('animated fadeInLeft', function () {
                    $('.left-menu-hamburger').click(function () {
                        animatedElement.animateCss('animated fadeOutLeft');
                    })
                })
            });


            // https://github.com/daneden/animate.css
            $.fn.extend({
                animateCss: function (animationName, callback) {
                    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                    this.addClass('animated ' + animationName).one(animationEnd, function () {
                        $(this).removeClass('animated ' + animationName);
                        if (callback) {
                            callback();
                        }
                    });
                    return this;
                }
            });
        }
    };
})(jQuery, Drupal, drupalSettings);

