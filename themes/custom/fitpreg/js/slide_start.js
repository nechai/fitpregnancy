(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.drupalbookBehavior = {
        attach: function () {
            $(document).ready(function () {
                $('.block-region-second .view-slideshow .view-content').slick({
                    dots: false,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 5,
                    slidesToScroll: 5
                });
            });

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
})(jQuery, Drupal, drupalSettings);
