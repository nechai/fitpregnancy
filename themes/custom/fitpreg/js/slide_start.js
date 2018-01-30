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
                $('#block-weeklymenu .menu').slick({
                    dots: false,
                    infinite: false,
                    speed: 800,
                    slidesToShow: 20,
                    slidesToScroll: 5
                });
            });
        }
    };
})(jQuery, Drupal, drupalSettings);
