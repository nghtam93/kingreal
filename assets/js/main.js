$(document).ready(function(){
	// Stick header
    // if ( $('body.home .header').offset().top >= 10 ) $('body.home .header').addClass("is-sticky");
    // $(window).scroll(function(){
    //     $(this).scrollTop()>10?$('body.home .header').addClass("is-sticky"):$('body.home .header').removeClass("is-sticky")
    // })

    /*----Languages---*/
    $('.languages__label').click(function() {
        $(this).closest('.languages').toggleClass('is-active');
        $(this).next().toggleClass('dropdown-languages');
        isClicked = true;
    });

    //-------------------------------------------------
    // Menu
    //-------------------------------------------------
    $.fn.dnmenu = function( options ) {

        let thiz = this
        let menu = $(this).attr('data-id')
        let menu_id = '#'+menu

        // Default options
        var settings = $.extend({
            name: 'Menu'
        }, options );

        // get ScrollBar Width
        function getScrollBarWidth () {
            var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
                widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
            $outer.remove();
            return 100 - widthWithScroll;
        };
        let ScrollBarWidth = getScrollBarWidth() + 'px';

        // Create wrap
        // Button click
        thiz.click(function(e){
            e.preventDefault()
            console.log(thiz)
            if(thiz.hasClass('active')){
                // $('.dnmenu-backdrop').remove()
                $('body').removeClass('modal-open').css("padding-right","")
                $(menu_id).removeClass('active')
                $(thiz).removeClass('active')

            } else {
                // $('<div class="dnmenu-backdrop">').appendTo('body')
                $('body').addClass('modal-open').css("padding-right",ScrollBarWidth)
                $(menu_id).addClass('active')
                $(thiz).addClass('active')

            }
        });

        // Custom close
        $('.js-menu__close').click(function(){
            $('body').removeClass('modal-open')
            $('body').removeClass('modal-open').css("padding-right","")
            $(thiz).removeClass('active')
            $(menu_id).removeClass('active')
        })

        // Menu
        var el= $(menu_id).find(".nav__mobile--ul");
        el.find(".menu-item-has-children>a").after('<button class="nav__mobile__btn"><i></i></button>'),

        el.find(".nav__mobile__btn").on("click",function(e){
            e.stopPropagation(),
            $(this).parent().find('.sub-menu').first().is(":visible")?$(this).parent().removeClass("sub-active"):
            $(this).parent().addClass("sub-active"),
            $(this).parent().find('.sub-menu').first().slideToggle()
        })

        // Apply options
        return;
    };
    $('.menu-mb__btn').dnmenu()


    //Select Item
    function dnselect(elm) {
        var dnselect_parent = $(elm).closest('.js-dnselect')
        $(elm).click(function(e) {
            e.preventDefault();
            isActive = true
            $("body").addClass('dnselect-open')
            thiz = $(this).closest('.js-dnselect')

            if(thiz.hasClass('active')) isActive = false
            if(isActive == true){
                $('.js-dnselect').removeClass('active');
                $(this).closest('.js-dnselect').addClass('active');
                $("body").addClass('dnselect-open')
            }else{
                thiz.removeClass('active')
                $("body").removeClass('dnselect-open')
            }


        })
        $('.js-close').on("click",function(e) {
            e.preventDefault();
            $('.js-dnselect').removeClass('active');
            $("body").removeClass('dnselect-open')
        })
        $('.js-dnselect').mousedown(function(e){ e.stopPropagation(); });
        $(document).mousedown(function(e){ $('.js-dnselect').removeClass('active'); $("body").removeClass('dnselect-open') });

        $(window).on("load resize", function() {
            $( ".js-dnselect__label").each(function( index ) {

              let name = $(this).data("pc")

                if (window.matchMedia("(max-width: 575px)").matches) {
                   name = $(this).data("mb")
                }
                $(this).text(name)

            });
        })


    }
    dnselect('.js-dnselect__label')

    /*Wiget*/

    $('.js-widget--collapse').on("click",function(e) {
        e.preventDefault()

        let parent = $(this).closest('.widget--collapse')
        if(parent.hasClass('active')){
            parent.removeClass('active')
            $(this).text( $(this).data('text') )
        }else{
            parent.addClass('active')
            $(this).text( $(this).data('text2') )
        }
    })
    /*Product*/
    $('[data-toggle="tooltip"]').tooltip()

    if( $('div').is('.carousel-main')){
        var flkty = new Flickity('.carousel-main');
        var carouselStatus = document.querySelector('.carousel-status');

        function updateStatus() {
        var slideNumber = flkty.selectedIndex + 1;
        carouselStatus.textContent = slideNumber + '/' + flkty.slides.length;
        }
        updateStatus();

        flkty.on( 'select', updateStatus );
    }

    if($('section').is("#tab_info")){
        (function () {
            const getTabList = () => {
                let tabList = ['#tab-information']
                // if ($('#tab_agency').length > 0) tabList.push('#tab_agency')
                // if ($('#tab_board').length > 0 && $('#tab_board').hasClass('active')){
                //     tabList.push('#tab_board')
                // }else{
                //     $('[href="#tab_board"]').css('display', 'none')
                // }
                // if ($('#tab_link_article').length > 0 && $('#tab_link_article').hasClass('active')){
                //     tabList.push('#tab_link_article')
                // }else{
                //     $('[href="#tab_link_article"]').css('display', 'none')
                // }

                if ($('#tab_description').length > 0) tabList.push('#tab_description')
                if ($('#tab_design').length > 0) tabList.push('#tab_design')
                if ($('#tab_extension').length > 0) tabList.push('#tab_extension')
                if ($('#tab_map_extension').length > 0) tabList.push('#tab_map_extension')
                if ($('#tab_galleryall').length > 0) tabList.push('#tab_galleryall')



                if ($('#tab_position').length > 0) tabList.push('#tab_position')
                if ($('#tab_feature').length > 0) tabList.push('#tab_feature')


                return tabList
            }
            const configScrollTab = getTabList()
            const buffOffset = 80;
            const initScrollPage = (windowOffset, tabOffset) => {
                const $tab_info = $('#tab_info');
                if (windowOffset >= tabOffset) {
                    if ($tab_info.hasClass('show') == false) {
                        $tab_info.addClass('show');
                        $('.mark-tab-info').addClass('active');
                    }
                } else {
                    if ($tab_info.hasClass('show') == true) {
                        $tab_info.removeClass('show');
                        $('.mark-tab-info').removeClass('active');
                    }
                }

                for (let i = 0; i < configScrollTab.length; i++) {
                    if (i == configScrollTab.length - 1) {
                        if (windowOffset >= $(configScrollTab[i]).offset().top - buffOffset) {
                            const $btnElm = $('.toogle-nav[href="' + configScrollTab[i] + '"]');
                            if ($btnElm.hasClass('active') === false) {
                                $('.toogle-nav').removeClass('active');
                                $btnElm.addClass('active');
                            }
                        }
                        continue;
                    }
                    if (i == 0) {
                        continue;
                    }
                    if (windowOffset >= $(configScrollTab[i]).offset().top - buffOffset && windowOffset < $(configScrollTab[i + 1]).offset().top - buffOffset) {
                       console.log(configScrollTab[i])
                        const $btnElm = $('.toogle-nav[href="' + configScrollTab[i] + '"]');
                        if ($btnElm.hasClass('active') === false) {
                            $('.toogle-nav').removeClass('active');
                            $btnElm.addClass('active');
                        }
                    }
                }
            };

            const navTabInit = () => {
                $('.toogle-nav').click(function (e) {
                    e.preventDefault();
                    const $btn = $(this);
                    const elm = $btn.attr('href');
                    if ($(elm).length > 0) {
                        let offset = $(elm).offset().top - buffOffset;
                        let time = Math.abs(offset - $(window).scrollTop()) / 2;//1ms ~ 2px
                        $([document.documentElement, document.body]).animate({
                            scrollTop: offset
                        }, time);
                    }
                    return false;
                });

                if( $('#tab-information').length > 0 ){
                    tabOffset = $('#tab-information').offset().top
                }else{
                    tabOffset = $('#tab_overview').offset().top
                }

                $(window).scroll(function () {
                    let windowOffset = $(window).scrollTop();
                    initScrollPage(windowOffset + 15, tabOffset);
                });
                initScrollPage($(window).scrollTop() + 15, tabOffset);
            };
            $(document).ready(function () {

               navTabInit();

            });
        }());
    }

});