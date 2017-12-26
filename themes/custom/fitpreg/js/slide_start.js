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
        }
    };
})(jQuery, Drupal, drupalSettings);
