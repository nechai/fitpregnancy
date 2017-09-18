(function($) {
Drupal.behaviors.drupalbookBehavior = {
    attach: function () {
      $(document).ready(function(){
        $('.block-region-second').slick({
          dots: true,
          infinite: true,
          speed: 300,
          fade: true,
          slidesToShow: 1,
          adaptiveHeight: true,
        });
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
