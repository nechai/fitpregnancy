(function ($, Drupal, drupalSettings) {

    Drupal.behaviors.mosaicBehavior = {
        attach: function (context, settings) {
            $('.view-content-by-texonomy-term .view-content').once('setMosaic').masonry({
                itemSelector: '.views-row',
                // columnWidth: 320,
                // percentPosition: true,
                fitWidth: true,
                gutter: 30
            });
        }
    };

})(jQuery, Drupal, drupalSettings);

