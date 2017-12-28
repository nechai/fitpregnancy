(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.weekMenuAjaxBehavior = {
        attach: function (context, settings) {
            var menu = document.getElementsByClassName("menu--weekly-menu");
            var li = $(menu).children('ul').children();
            $.each(li, function () {
                $(this, '.menu--weekly-menu div.views-row').once('weekMenuAjax').mouseenter(function () {
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

            $('.left-menu-sandwich').once('animateLeftMenu').click(function () {
                var animatedElement = $('.animated-group');
                if (!animatedElement.is(':visible')) {
                // if (!$('#block-fitpreg-left-menu').is(':visible')) {
                    animatedElement.addClass('animated slideInLeft').show()
                        .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                            animatedElement.removeClass('animated slideInLeft');
                        });
                } else {
                    animatedElement.addClass('animated slideOutLeft')
                        .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                            animatedElement
                                // .hide()
                                .removeClass('animated slideOutLeft');

                        });
                }
                $('.left-menu-sandwich').show();
            });
        }
    };
})(jQuery, Drupal, drupalSettings);

