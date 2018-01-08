(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.customBehavior = {
        attach: function (context, settings) {
            $(window).once('myCustomBehavior').each(function () {

                var existClass;

                // grouping first three block in header
                $('.region-header #block-fitpreg-social-menu, .region-header #block-fitpreg-logo, .region-header #block-fitpreg-login-menu')
                    .wrapAll('<div class="firstline-blocks-wrapper"></div>');

                // grouping second three block in header
                $('.region-header #block-fitpreg-left-menu, .region-header #block-fitpreg-main-menu, .region-header #block-fitpreg-searchform')
                    .wrapAll('<div class="secondline-blocks-wrapper"></div>');

                // insert hamburger block in left menu of the header
                $(
                    '<div class="left-menu-sandwich">\n\
                      <div class="sandwich">\n\
                        <span class="sw-topper"></span>\n\
                        <span class="sw-bottom"></span>\n\
                        <span class="sw-footer"></span>\n\
                      </div>\n\
                      </div>'
                ).insertAfter('#block-fitpreg-left-menu');

                // Make group for animating left-menu
                $('.left-menu-sandwich, #block-fitpreg-left-menu').wrapAll('<div class="animated-group"></div>');

                // insert block with search icon in search form of the header
                $(
                    '<div class="icon-wrapper">\
                      <div class="search-icon">\n\
                        <i class="fa fa-search" aria-hidden="true"></i>\n\
                      </div>\n\
                      <div class="close-search close">\n\
                        <i class="fa fa-times" arria-hidden="true"></i>\n\
                      </div>\n\
                    </div>'
                ).insertBefore('#block-fitpreg-searchform');

                $('.block-views-blocksafe-healthy-pregnancy-guide-block-1 .views-field-title, .block-views-blocksafe-healthy-pregnancy-guide-block-1 .views-field-body, .block-views-blocksafe-healthy-pregnancy-guide-block-1 .views-field-view-node')
                    .wrapAll("<div class='fields-wrapper'>");

                $('.block-views-blockbaby-care-block-1 .views-field-title, .block-views-blockbaby-care-block-1 .views-field-body, .block-views-blockbaby-care-block-1 .views-field-view-node')
                    .wrapAll("<div class='fields-wrapper'>");

                // Show and hide search field by click
                $('.icon-wrapper').on('click', function (e) {
                    existClass = $('#block-fitpreg-searchform').hasClass('open');

                    // check existing class in search block
                    if (existClass) {
                        $('#block-fitpreg-searchform').removeClass('open');
                        $('.icon-wrapper .close-search').addClass('close');
                        $('.icon-wrapper .search-icon').removeClass('close');
                    } else {
                        $('#block-fitpreg-searchform').addClass('open');
                        $('.icon-wrapper .close-search').removeClass('close');
                        $('.icon-wrapper .search-icon').addClass('close');
                    }

                })
            });

            //
            // $('.left-menu-hamburger').on('click', function(e) {
            //   $('#block-fitpreg-left-menu').show();

            // });
        }
    }
})(jQuery, Drupal, drupalSettings);
