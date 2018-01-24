(function ($, Drupal, drupalSettings) {

    Drupal.behaviors.mainBehavior = {
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
            var menu = $('#block-weeklymenu');
            $(menu).find('.menu').first().children().each(function () {
                $(this).once('weekMenuAjax').mouseenter(function () {
                    // Check if exist previous result of ajax request
                    if ($('.menu-item-ajax').length) {
                        $('.menu-item-ajax').each(function () {
                            $(this).remove();
                        })
                    }
                    var requestItem = $(this);
                    timer = setTimeout(function () {
                        var ourRequest = new XMLHttpRequest();
                        ourRequest.open("GET", "/ajax/" + requestItem.find('a').first().text());
                        console.log(requestItem.find('a').first().text());
                        ourRequest.onload = function () {
                            var ourData = jQuery.parseHTML(ourRequest.responseText);
                            var data = $(ourData).find('.week-menu-ajax-page').addClass("menu-item-ajax");
                            if (data !== undefined) {
                                menu.append(data);
                            }
                        };
                        ourRequest.send();
                        var $background = $('.left-menu-background'); // Background
                        //check if background exist
                        if ($background.length) {
                            //do nothing
                        } else {
                            // Create and add background for $hiddenMenu
                            var $backgroundDiv = $('<div class="left-menu-background"></div>');
                            var backgroundTopPosition = $('header').outerHeight()-1; // -1 meaning subtract one unnecessary pixel
                            $backgroundDiv.css({
                                position: 'absolute',
                                top: backgroundTopPosition,
                                left: 0,
                                width: window.innerWidth, //full window width
                                height: $(window).height() - backgroundTopPosition,
                                backgroundColor: 'rgba(62,62,62,.5)',
                                zIndex: 1
                            });
                            timerForBackground = setTimeout(function () {
                                $('.layout-content').prepend($backgroundDiv);
                                // Prevent scrolling
                                $('html, body').css({
                                    overflow: 'hidden',
                                    height: '100%'
                                });
                            }, 600);
                        }
                    }, 600);
                }).mouseleave(function () {
                    clearTimeout(timer);
                });
            });

         $('#block-weeklymenu').mouseleave(function () {
             if ($('.menu-item-ajax').length) {
                 $('.menu-item-ajax').each(function () {
                     $(this).remove();
                 })
             }
             var $background = $('.left-menu-background'); // Background
             //check if background exist
             if ($background.length) {
                 // Remove background
                 $background.remove();
                 // Turn on scrolling
                 $('html, body').css({
                     overflow: 'auto',
                     height: 'auto'
                 });
             }
         })
        }
    };

    Drupal.behaviors.ajaxPopupBehavior = {
        attach: function (context, settings) {
            $('.menu-item-ajax').once("ajaxPopupBehavior").each(function () {
                $(this).magnificPopup({type:'inline'});
            })
        }
    };

    Drupal.behaviors.leftMenuAnimateBehavior = {
        attach: function (context, settings) {
            // Remove href attribute of blind links
            $('#block-fitpreg-left-menu').once('removeHref').each(function () {
                var $that = $(this);
                $that.find('.menu-item--expanded a').each(function () {
                    if ($(this).attr('href') === '/') {
                        $(this).removeAttr('href');
                    }
                })
            });

            /** Internal menu animation between links **/
            //  1. Create back button

            //  2. Initiate click on parent link:
            //      - initiate click
            //      - hide main menu
            //      - show child links
            $('#block-fitpreg-left-menu .left-menu-wrapper > .menu > .menu-item--expanded').once('betweenLinksBehavior').click(function () {
                var $backBtn = $('<div id="back-btn">back</div>'); // Style for this block is written in _header.scss
                var $fadingMenu = $(this).find('.menu').first().clone().addClass('copy');
                $('.left-menu-wrapper').toggleAnimation('slideInLeft', 'slideOutLeft');
                $('#block-fitpreg-left-menu').prepend($fadingMenu);
                $('#block-fitpreg-left-menu').prepend($backBtn);
                $menuItemCopy = $('.copy');
                $backBtnSelector = $('#back-btn');
                $menuItemCopy.toggleAnimation('slideInRight', 'slideOutRight');
                $backBtnSelector.toggleAnimation('slideInRight', 'slideOutRight');
                //  3. Initiate click on back button and make:
                //      - hide child links
                //      - show main menu
                $('#back-btn, .left-menu-background').once('backBtnBehavior').click(function () {
                    $backBtnSelector.toggleAnimation('slideInRight', 'slideOutRight', function () {
                        $backBtnSelector.remove();
                    });
                    $menuItemCopy.toggleAnimation('slideInRight', 'slideOutRight', function () {
                        $menuItemCopy.remove();
                    });
                    $('.left-menu-wrapper').toggleAnimation('slideInLeft', 'slideOutLeft');
                });
            });

            // Left menu animation
            $('.left-menu-sandwich').once('animateLeftMenu').click(function () {
                var $animatedElement = $('.animated-group');
                var $hiddenMenu = $('#block-fitpreg-left-menu').css({height: $('.layout-content').height()});
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

            // Declaring functions
            $.fn.extend({
                animateCss: function (animationName, callback) {
                    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                    this.addClass('animated ' + animationName).one(animationEnd, function () {
                        $(this).removeClass('animated ' + animationName);
                        if (callback) {
                            callback();
                        }
                    });
                    return this;
                }
            });

            $.fn.extend({
                toggleAnimation: function (show, hide, callback) {
                    var animatedElement = $(this);
                    if (!animatedElement.is(':visible')) {
                        animatedElement.addClass('animated ' + show).show()
                            .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                                animatedElement.removeClass('animated ' + show);
                                if (callback) {
                                    callback();
                                }
                            })
                    } else {
                        animatedElement.addClass('animated ' + hide)
                            .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                                animatedElement
                                    .hide()
                                    .removeClass('animated ' + hide);
                                if (callback) {
                                    callback();
                                }
                            });
                    }
                    return animatedElement;
                }
            });

            $.fn.extend({
                preventClicking: function (that) {
                    $('#back-btn, .left-menu-background, #block-fitpreg-left-menu').each(function () {
                        $(this).on('click', function () {
                            if (that.is(':animated')) {
                                return false
                            }
                        })
                    })
                }
            });
        }
    };

})(jQuery, Drupal, drupalSettings);

