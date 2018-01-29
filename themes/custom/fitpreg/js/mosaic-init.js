(function ($, Drupal, drupalSettings) {

    Drupal.behaviors.mosaicBehavior = {
        attach: function (context, settings) {
            $mosaicContainer = $('.view-content-by-texonomy-term .view-content');
            $mosaicContainer.masonry({
                itemSelector: '.views-row',
                // columnWidth: 320,
                // percentPosition: true,
                fitWidth: true,
                gutter: 30
            });
            // All code below needed for successful loading ajax's items
            $mosaicContainer.masonry('reloadItems');
            $mosaicContainer.masonry('layout');
            var masonryUpdate = function() {
                setTimeout(function() {
                    $mosaicContainer.masonry();
                }, 20);
            };
            $(document).ajaxComplete(masonryUpdate);
        }
    };

})(jQuery, Drupal, drupalSettings);

