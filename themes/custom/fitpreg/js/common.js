(function ($, Drupal, drupalSettings) {

    Drupal.behaviors.mainPageSettingsBehavior = {
        attach: function (context, settings) {
            $('body').once('setWindowWidth').each(function () {
                $(this).css({
                    "width": window.innerWidth, //full window width
                    "overflow-x": 'hidden'
                })
            });
            // $('body').once('setChangeWindowWidth').on('change', function () {
            //     $(this).css({
            //         "width": $(window).width(),
            //         "overflow-x": 'hidden'
            //     })
            // })
        }
    };
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
                var $animatedElement = $('.animated-group');
                var $hiddenMenu = $('#block-fitpreg-left-menu');
                var $backgroundDiv = $('.left-menu-background'); // Background

                //check if background exist
                if ($backgroundDiv.length) {
                    // Remove background
                    $backgroundDiv.remove();
                    // Turn on scrolling
                    $('html, body').css({
                        overflow: 'auto',
                        height: 'auto'
                    });
                } else {
                    // Prevent scrolling
                    $('html, body').css({
                        overflow: 'hidden',
                        height: '100%'
                    });
                    // Create and add background for $hiddenMenu
                    var $backgroundDiv = $('<div class="left-menu-background"></div>');
                    $('.layout-container').prepend($backgroundDiv);
                    var backgroundTopPosition = $('.firstline-blocks-wrapper').outerHeight() - 1; // -1 meaning subtract one unnecessary pixel
                    $backgroundDiv.css({
                        position: 'absolute',
                        top: backgroundTopPosition,
                        left: 0,
                        width: window.innerWidth, //full window width
                        height: $(window).height() - backgroundTopPosition,
                        backgroundColor: 'rgba(62,62,62,.5)',
                        zIndex: 1
                    }); // End processing background for $hiddenMenu

                    //TODO: Below code block repeat this "if" block. Find way for avoid DRY.
                    $backgroundDiv.click(function () {
                        // Remove background
                        $backgroundDiv.remove();
                        // Turn on scrolling
                        $('html, body').css({
                            overflow: 'auto',
                            height: 'auto'
                        });
                        $hiddenMenu.toggleClass('menu-active');
                        $('.sandwich').toggleClass('sandwich-active');
                    });
                }
                // Remove $backgroundDIV and toggle 'active' class after click on $backgroundDIV or $(this)
                $hiddenMenu.toggleClass('menu-active');
                $('.sandwich').toggleClass('sandwich-active');
            });
        }
    };
})(jQuery, Drupal, drupalSettings);

