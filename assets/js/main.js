$(document).ready(function(){
	// Stick header
    if ( $('body.home .header').offset().top >= 10 ) $('body.home .header').addClass("is-sticky");
    $(window).scroll(function(){
        $(this).scrollTop()>10?$('body.home .header').addClass("is-sticky"):$('body.home .header').removeClass("is-sticky")
    })

    /*----Languages---*/
    $('.languages__label').click(function() {
        $(this).closest('.languages').toggleClass('is-active');
        $(this).next().toggleClass('dropdown-languages');
        isClicked = true;
    });

    //-------------------------------------------------
    // Header Search
    //-------------------------------------------------
    var $headerSearchToggle = $('.header__search--toggle');
    var $headerSearchForm = $('.header__search__form');

    $headerSearchToggle.on('click', function() {
        var $this = $(this);
        if(!$this.hasClass('open-search')) {
            // $this.addClass('open-search').find('i').removeClass('fa-search').addClass('fa-times');
            $headerSearchForm.slideDown();
        } else {
            // $this.removeClass('open-search').find('i').removeClass('fa-times').addClass('fa-search');
            $headerSearchForm.slideUp();
        }
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

});