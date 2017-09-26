(function($, Drupal, drupalSettings) {
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

      var timer;
      var menu = document.getElementsByClassName("menu--weekly-menu");
      var li = $(menu).children('ul.menu').children();
      $.each(li, function (){
        $(this, '.menu--weekly-menu div.views-row').mouseenter(function() {
          var aaa = this;
          timer = setTimeout(function() {
            var ourRequest = new XMLHttpRequest();
            ourRequest.open("GET", "/ajax/"+aaa.getElementsByTagName('a')[0].innerHTML);
            ourRequest.onload = function() {
              var ourData = jQuery.parseHTML(ourRequest.responseText);
              var data = $('<div />').append(ourData).find('.view-content').html();
              if(data !== undefined) {
                aaa.insertAdjacentHTML('beforeend', data);
              }
            };
            ourRequest.send();
          }, 500);
        }).mouseleave(function(){
          clearTimeout(timer);
          $('.menu--weekly-menu div.views-row, .attachment-after').remove();
        });
      });

    }
  };
})(jQuery, Drupal, drupalSettings);
