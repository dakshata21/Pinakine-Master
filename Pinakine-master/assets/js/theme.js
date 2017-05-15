(function() {
  
/*!
 ______ _____   _______ _______ _______ _______ ______ _______ 
|   __ \     |_|    ___|_     _|   |   |       |   __ \   _   |
|    __/       |    ___| |   | |       |   -   |      <       |
|___|  |_______|_______| |___| |___|___|_______|___|__|___|___|

P L E T H O R A T H E M E S . C O M               (c) 2014-2015
                        
Theme Name: 
File Version: 1.0
This file contains the necessary Javascript for the theme to function properly.

*/

//========================== PLETHORA HELPER FUNCTIONS ==============================================

(function( window, doc, $ ){

  "use strict";

  /* Tooltips */

  $(function () {
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
          $('.tooltip').addClass('animated fade');
      })
  });

  /*** POLYFILLS ***/

  // SHIM POLYFILL FOR: requestAnimationFrame
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
                                 window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
                                 window.msRequestAnimationFrame || function (cb){window.setTimeout(cb,1000/60);};

  var _p = _p || {};

  /*** OBJECT EXTEND: By @toddmotto ***/

  _p.extend = function( target, source ) {
      var merged = Object.create(target);
      Object.keys(source).map(function (prop) {  prop in merged && (merged[prop] = source[prop]);  });
      return merged;
  };

  /*** MULTI SLICE ***/

  _p.slice = function(){
    return [].slice.call.apply( [].slice, arguments );
  }

  /*** BOOLEAN OPERATOR CHECK ***/

  _p.checkBool = function(val){
      return ({1:1,true:1,on:1,yes:1}[(((typeof val !=="number")?val:(val>0))+"").toLowerCase()])?true:false;
  };

  /*** DEBUGGING CONSOLE ***/

  _p.debugLog = function(){
    themeConfig && themeConfig.debug && console.log.apply( console, arguments );
  }

  /*** SVG CREATION UTILITY FUNCTION ***/

  _p.SVGMold  = function( type, options ){
  var molding = doc.createElementNS('http://www.w3.org/2000/svg', type );
  for (var key in options) options.hasOwnProperty(key) && molding.setAttribute( key, options[key]);
    return molding;
  }

  /*** SCROLL ON CLICK ***/

  $.extend( $.easing, { easeOutQuart: function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b; }, });

  _p.scrollOnClick = function(e){

    var HeaderHeight = $('.header').outerHeight();

    _p.debugLog("Scrolled...");
    e.preventDefault();                   // PREVENT DEFAULT ANCHOR CLICK BEHAVIOR
    var hash        = this.hash;          // STORE HASH
    var hashElement = $(this.hash);       // CACHE $.SELECTOR
    if ( hashElement.length > 0 ){
      if ( $('.header.bottom_sticky_header').length /*|| $('.header.transparent').length*/ ) {
        $('html, body').animate({ scrollTop: hashElement.offset().top }, themeConfig["GENERAL"]["onePagerScrollSpeed"],'easeOutQuart', 
        function(){  
          if ( history.pushState ) history.pushState( null, null, hash );
        });
      } else {
       $('html, body').animate({ scrollTop: hashElement.offset().top - HeaderHeight + 1 }, themeConfig["GENERAL"]["onePagerScrollSpeed"],'easeOutQuart', 
        function(){  
          if ( history.pushState ) history.pushState( null, null, hash );
        });  
      }
    }
  }

  return window._p = _p;

}( window, document, jQuery ));

//END---------------------------------------------------------------------- PLETHORA HELPER FUNCTIONS

// PLETODO: check if active state is needed. Make it conditional for non-onepager pages
//========================== NAVIGATION ACTIVE STATE ================================================

/*(function($){

  var currentLink = document.location.pathname.split("/");
      currentLink = currentLink[currentLink.length-1];
  var activeLink  = document.querySelector(".main_menu a[href$='" + currentLink + "']");  
    ( activeLink !== null ) && activeLink.parentElement.setAttribute( "class", "active" );

}(jQuery));*/

//END------------------------------------------------------------------------ NAVIGATION ACTIVE STATE


//========================== PRIMARY MENU CONSTRUCTOR ===============================================

(function($){

  "use strict";

    // Set the collapsing width for the header menu and the tools on the header
    var menu_collapsing_width = themeConfig['MAIN_MENU'].menu_collapsing_width;
    var tools_collapsing_width = themeConfig['MAIN_MENU'].tools_collapsing_width;

    // If there are dropdowns on the primary nav, go on
    if ($('.header nav.primary_nav ul > li > ul').length) {

        // Add the appropriate classes to the primary nav
        $('.header nav.primary_nav ul > li > ul').addClass('menu-dropdown-content');        
        var lihaschildren = $('.header nav.primary_nav ul > li > ul').parent();
        lihaschildren.addClass('lihaschildren menu-dropdown');
        var atoggledropdown = $('.lihaschildren > a');
        atoggledropdown.addClass('menu-dropdown-toggle');
        
        // Click Menu Functionality (.click_menu class on .header)
        $('.click_menu a.menu-dropdown-toggle').on("click" , function(e) {
            $(this).siblings().toggleClass('open').addClass('transition');
            e.stopPropagation();
        });

        // Close Dropdown when clicking elsewhere
        $(document.body).on('click', function(){
            $('.menu-dropdown-content').removeClass('open');
        });

        // Hover Menu Functionality (.hover_menu class on .header)
        var myTimer = null;
        $('.hover_menu .lihaschildren').on(
            {
            mouseenter: function() {
                $(this).children('ul').addClass('open').addClass('transition');
                if(myTimer != null){
                    clearTimeout(myTimer);
                }
            },
            mouseleave: function(){
                myTimer = setTimeout(function() {
                    $('ul.open').removeClass('open');
                } , 200); 
            }
        });
    };

    // Centered in Menu Inline Logo Feature (.header_centered and .logo_centered_in_menu on .header)
    if ( $('.header.logo_centered_in_menu').length ) {

      // Count the number of top level menu elements
      var count_of_lis = $('.primary_nav ul.nav > li').length;

      if (count_of_lis % 2 === 0 ) {
        // If count is even, target the middle li
        var center_of_lis = count_of_lis / 2;
        var li = $('.primary_nav ul.nav > li:nth-child(' + center_of_lis + ')')
      } else {
        // else if count is odd, add a fake li to make them even and target the middle li
        $('.primary_nav ul.nav').prepend('<li class="fake"></li>');
        var center_of_lis = count_of_lis / 2 + 0.5;
        var li = $('.primary_nav ul.nav > li:nth-child(' + center_of_lis + ')')
      }

      var logo_div = $(".logo");
      var maxWidth = 0;
      var elemWidth = 0;
      
      // Make all 1st-level elements of the menu, equal width
      $('.primary_nav ul.nav > li').each(function() {
          elemWidth = parseInt($(this).css('width'), 10);
          if (parseInt($(this).css('width'), 10) > maxWidth) {
              maxWidth = elemWidth;
          }
      });
      $('.primary_nav ul.nav > li').each(function() {
          $(this).css('width', maxWidth + "px");
      });

      // Insert the logo in the middle of the menu
      logo_div.insertAfter(li).wrap('<li class="logo_in_nav"></li>');

    };

    // Collapser from the mainbar of the header to the secondary widgetized area and vice versa
    $(window).on("load resize" , function() { 

        var window_width = $(window).width();
        var mainbar_container = $(".header .mainbar").children('[class^=container]');
        var primary_nav = $(".header nav.primary_nav");
        var primary_in_secondary_nav = $(".secondary_nav_widgetized_area nav.primary_nav");
        var header_container = $(".header .mainbar").children('[class^=container]');
        var nav_and_tools = $(".header .mainbar").children('[class^=container]').children(".nav_and_tools");
        var header_container_width = header_container.width();
        var rest_width = (window_width - header_container_width) * 0.5;
        var tools_div = nav_and_tools.children('div.tools_on_header');
        var tools_div_in_secondary_nav = $(".secondary_nav_widgetized_area div.tools_on_header");
        //var logo_div = $(".logo");
        var logo_in_nav = $("li.logo_in_nav .logo");
        var header_not_centered = $('.header').not('.header_centered');
        var header_centered_with_logo = $('.header.header_centered.logo_centered_in_menu');

        // On mobile states move the primary menu in the secondary widgetized area and vice versa. Also handle the centered-logo-in-menu functionality.
        if (window_width <= menu_collapsing_width) {
          if (header_centered_with_logo.length) {
            logo_in_nav.unwrap().prependTo(mainbar_container);
          }  
          primary_nav.prependTo(".secondary_nav_widgetized_area");
        } else {
            if ( primary_in_secondary_nav.length ) {
              primary_in_secondary_nav.prependTo(nav_and_tools);
              if (header_centered_with_logo.length) {  
                logo_div.insertAfter(li).wrap('<li class="logo_in_nav"></li>');
              }  
            }
        };

        // On mobile states move the tools in the secondary widgetized area and vice versa
        if (window_width <= tools_collapsing_width) {
            tools_div.prependTo(".secondary_nav_widgetized_area");
        } else {
            if ( tools_div_in_secondary_nav.length ) {
                tools_div_in_secondary_nav.appendTo(nav_and_tools);
            }
        };

        // The toggler of the secondary & mobile menu rests always on the right and pushes the rest of the header elements accordingly when it comes close to them on resize
        var toggler_width = $("a.menu-toggler").outerWidth();
        var min_position_width = rest_width - toggler_width;
        // If tools exist on header make them target of the pushing, else push the primary navigation.
        if ( tools_div.length ) {
            var padding_target = tools_div;
        } else {
            var padding_target = primary_nav;
        }
        // Apply this functionality only when the header is not centered
        if ( header_not_centered.length ) {
          if (min_position_width <= 15) {
              padding_target.css("padding-right", -min_position_width + 15);
          };
        };

    });

    // Open and close the secondary widgetized area that holds the mobile nav menu
    $(window).on("load" , function() {

      var header_height = $('.header').height();

      $("a.menu-toggler").on("click",function() {  
          $(this).toggleClass( "active" );
          $(".secondary_nav_widgetized_area").toggleClass( "secondary_nav_is_open" );
          $(".main").toggleClass( "secondary_nav_is_open" );
          $(".header").toggleClass( "secondary_nav_is_open" );
          $("footer").toggleClass( "secondary_nav_is_open" );
          $(".copyright").toggleClass( "secondary_nav_is_open" );
          if ( $(this).hasClass("active") ) {
            $(".secondary_nav_widgetized_area").css('padding-top' , header_height);
          } else {
            
            $(".secondary_nav_widgetized_area").css('padding-top' , '0');
          }
          
      });

      // When clicking on a nav link of the secondary widgetized area, close the area
      $(".secondary_nav_widgetized_area nav a").on("click",function() {  
          $("a.menu-toggler").toggleClass( "active" );
          $(".secondary_nav_widgetized_area").toggleClass( "secondary_nav_is_open" );
          $(".main").toggleClass( "secondary_nav_is_open" );
          $(".header").toggleClass( "secondary_nav_is_open" );
          $("footer").toggleClass( "secondary_nav_is_open" );
          $(".copyright").toggleClass( "secondary_nav_is_open" );
          $(".secondary_nav_widgetized_area").css('padding-top' , '0');
      });

    });        

}(jQuery));

//END----------------------------------------------------------------------- PRIMARY MENU CONSTRUCTOR

//========================== HEADER VARIATIONS ======================================================

(function($){

  "use strict";

    // Declaring some vars
    var header_height = $('.header').height();
    var window_height = $(window).height();
    var usable_height = window_height - header_height;

    // 1. Sticky Header always on Top. You have to add class "sticky_header" to the .header element
    
    if( $('.header.sticky_header:not(".transparent")').length ) {
      //var HeaderHeight = $('.header').outerHeight();
      var $body = $('body');
      $body.css( 'margin-top', header_height );
      $(window).on( 'load resize', function(){
        var header_height = $('.header').height();
        $body.css( 'margin-top', header_height );
      });
    }

    // 2. Sticky Header Bottom. You have to add class "sticky_header_bottom" to the .header element

    // 3. Appearing from Top Sticky Header. You have to add class "appearing_sticky_header" to the .header element

    if( $('.header.appearing_sticky_header').length ) {
      
      var $sticky_nav = $('.header.appearing_sticky_header');

      $(window).scroll(function () {
        if ($(this).scrollTop() > window_height / 2) {
            $sticky_nav.addClass("stuck");
        } else {
            $sticky_nav.removeClass("stuck");
        }
      }); 
    
      var window_top = $(window).scrollTop();

      if (window_top > window_height / 2) {
          $sticky_nav.addClass("stuck");
      } else {
          $sticky_nav.removeClass("stuck");
      } 

    }    
    
    // 4. Starting on Bottom and sticking on top. You have to add class "bottom_to_top_sticky_header" to the header.header element
    
    var traveling_nav = $('.header.bottom_to_top_sticky_header');
    
    $(window).scroll(function () {
        if ($(this).scrollTop() > usable_height) {
            traveling_nav.addClass("stuck");
        } else {
            traveling_nav.removeClass("stuck");
        }
    }); 
    
    var window_top = $(window).scrollTop();
    if (window_top > usable_height) {
        traveling_nav.addClass("stuck");
    } else {
        traveling_nav.removeClass("stuck");
    }


}(jQuery));

//END----------------------------------------------------------------------------- HEADER VARIATIONS


//========================== FULL HEIGHT and FLUID WIDTH SECTIONS and V-CENTERING ==================

(function($){

  "use strict";

  var section_with_full_height = $('.full_height');
  var section_with_fluid_width = $('section.fluid_width');
  var section_with_vertical_center_container = $('.main > section.full_height.vertical_center').children('[class^=container]');
  var section_with_vertical_bottom_container = $('.main > section.full_height.vertical_bottom').children('[class^=container]');

  // All sections with a class="fluid_width" have their inner container change class, on DOM Ready
  section_with_fluid_width.children('[class^=container]').removeClass('container').addClass('container-fluid');
  $('.header.fluid_width div[class^=container]').removeClass('container').addClass('container-fluid');

  $(window).on("load resize", function() {

    // Calculating window dimensions
    var header_height = $('.header').height();
    var window_height = $(window).height();
    var usable_height = window_height - header_height;


    // All root sections with a class .full_height, take the usable or window height as minimum-height    
    section_with_full_height.css( "min-height", usable_height );
    if ($('.header.transparent').length) {
      section_with_full_height.css( "min-height", window_height );
    }
    if ($('.header.appearing_sticky_header').length) {
      section_with_full_height.css( "min-height", window_height );
    }
    if ($('.header.bottom_to_top_sticky_header').length) {
      section_with_full_height.css( "min-height", window_height );
    }

    // All sections with a class="full_height vertical_center" will have their content vertically centered on the usable height // PLENOTE: Vertical Center is fixed. Update Medicus
    section_with_vertical_center_container.each(function(){    
        var container_height = $(this).height();
        var section_padding = $(this).parent().css("padding-top").replace("px", "");
        var top_padding = (usable_height - section_padding*2 - container_height) * 0.5;
        if (top_padding > 0) {
            $(this).css('padding-top' , top_padding);  
            };  
    });

    // All sections with a class="full_height vertical_bottom" will have their content vertically bottom on the usable height
    section_with_vertical_bottom_container.each(function(){ 
        var container_height = $(this).height(); 
        var top_padding = (usable_height - container_height -25);
        if (top_padding > 0) {
            $(this).css('padding-top' , top_padding - header_height);  
        };    
    });  

  });

}(jQuery));

//END------------------------------------------ FULL HEIGHT and FLUID WIDTH SECTIONS and V-CENTERING




// PLETODO: Clean up dom ready section

//******************* JQUERY TO PERFORM ON DOM READY ********************************************************

jQuery(function($){

  "use strict";





  //======================== HEAD-PANEL Heights ===========================

  /*if( $('.head_panel .hgroup').length ) {
    var hgroupheight = $('.head_panel .hgroup').outerHeight();
    $('.head_panel').children().css( 'height' , hgroupheight )
  }*/



  //======================== ELEVATED COLUMN'S PARENT ROW PADDING FIX ==========

  if( $('div[class *="col-"].elevate').length ) {
    $('div[class *="col-"].elevate').parent().css('padding-top' , '70px');
  }

  //============================ 3D LINKS EFFECT ===============================

  (function linkify( selector ) {

      if ( !( themeConfig["GENERAL"].enable3DLinks || document.body.style['webkitPerspective'] !== undefined || document.body.style['MozPerspective'] !== undefined ) ) return;

      _p.slice( document.querySelectorAll( "a.roll" ) ).forEach(function(a){
          a.innerHTML = '<span data-title="'+ a.text +'">' + a.innerHTML + '</span>';
      });

  }());

  //============================ UI TO TOP BUTTON ==============================

  /* DEPRECATED CODE: $.fn.UItoTop && $.fn.UItoTop({ easingType: 'easeOutQuart' }); */

  var $returnToTop = $('#return-to-top');

  $(window).scroll(function() {

      ( $(this).scrollTop() >= 50 ) ? $returnToTop.fadeIn(500) : $returnToTop.fadeOut(500);

  });

  $returnToTop.on("click", function(){ $('body,html').animate({ scrollTop : 0 }, 500); });

  //======================== NAVIGATION SOCIAL LINKS ===========================

  $(".mainbar .social_links").on("click", function(){ $(".mainbar .team_social").toggleClass("showLinks"); });
  $(".main").on("click", function(){ $(".mainbar .team_social").removeClass("showLinks"); });

  //====================== SCROLL ON CLICK OF A HASH-LINK init =================

  (function($){

    $('a[href^="#"], button[href^="#"]').on('click', _p.scrollOnClick );

  })(jQuery);


  //=============== TESTIMONIALS ===============================================

  (function($){

    var $testimonials     = $(".testimonial-slider ul.slides");
    if ( $testimonials.length && $.fn.owlCarousel ){

        $testimonials.owlCarousel({  
          items      : 1,
          loop       : true,
          autoplay   : true,
          autoplaySpeed: 1000,
          autoplayTimeout: 3000,
          dots: false,
          nav: false,
        navText: [
          "<i class='previous_icon'></i>",
          "<i class='next_icon'></i>"
          ],
        });

    }

  })(jQuery);

  /* Home Rooms Slider */
  (function($){
      $(".owl-rooms-carousel").owlCarousel({
        items: 1,
        nav:false,
        dots:false,
        loop:true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1000,
        navText: [
          "<i class='previous_icon'></i>",
          "<i class='next_icon'></i>"
          ],
      });
    })(jQuery);

(function($){

    var $testimonials     = $(".owl-room-single-carousel");
    if ( $testimonials.length && $.fn.owlCarousel ){

        $testimonials.owlCarousel({  
          items      : 1,
          loop       : true,
          autoplay   : true,
          autoplaySpeed: 1000,
          autoplayTimeout: 3000,
          dots: false,
          nav: false,
        navText: [
          "<i class='previous_icon'></i>",
          "<i class='next_icon'></i>"
          ],
        });

    }

  })(jQuery);

  //END============ TESTIMONIALS ===============================================

  //=================== PARALLAX ===================================================

  (function($){

    $('.parallax-window').each(function(){

      var bg_image = $(this).css("background-image").replace('url(','').replace(')','').replace(/\"/g, '').replace(/\'/g, '');
      $(this).addClass("transparent").css("background-image","none").attr("data-parallax", "scroll").attr("data-image-src", bg_image).attr("data-position", "center top");

    }); 

  }(jQuery));

//END=================== PARALLAX ===================================================

});
//END******************* JQUERY TO PERFORM ON DOM READY ********************************************************


//********************** JQUERY TO PERFORM ON WINDOW LOAD *****************************************************

jQuery(window).load(function(a,b,c){
      
  "use strict";

  var $ = jQuery.noConflict();

  //================== SAME COLUMN HEIGHT ==========================================

  var sameHeightCols = $(".same_height_col");

  if ( !( window.matchMedia && window.matchMedia( "only screen and (max-width: 480px)" ).matches && sameHeightCols.length > 0 ) ){
      sameHeightCols.conformity();
      $(window).on( "resize", function() {  sameHeightCols.conformity();  });
  } 

  //END=============== SAME COLUMN HEIGHT ==========================================

  //================== ISOTOPE FILTERING: PORTFOLIO ================================

  (function($){

      var $container = $('#cont_medicus'); 

      if ( $.fn.isotope && $container.length ){

        $container.isotope({});   

        $('#filt_medicus a[data-filter="*"]').addClass('active'); 

        var $filterAnchor = $('#filt_medicus a');
            $filterAnchor.on("click", function(){ 

              $filterAnchor.removeClass('active'); 
              $(this).addClass('active'); 
              var selector = $(this).attr('data-filter'); 
              $container.isotope({ filter: selector }); 
              return false; 

            }); 

      $(window).resize(function(){ $container.isotope({}); });

      }

  })(jQuery);

  //END=============== ISOTOPE FILTERING ===========================================

  //================== MASONRY ===========================================

  (function($){

    var $container = $('.masonry > .row'); 

    if ( $.fn.isotope && $container.length ){

      $container.isotope({});   

      $(window).resize(function(){  $container.isotope({});  });
      
    }

  })(jQuery);

  //END=============== MASONRY ===========================================  

  //================== ENABLE BEFORE/AFTER PLUGIN ========================

  $.fn.twentytwenty && $('.twentytwenty-container') && $('.twentytwenty-container').twentytwenty({ default_offset_pct: 0.5, orientation: 'horizontal' });


  //=================== WOW (REVEAL ON SCROLL INIT FOR NO-TOUCH DEVICES) ===========

  (function($){

    if ($('.no-touch').length) {
      var wow = new WOW({
        animateClass : 'animated',
        offset :100,
        mobile: true
      });
      wow.init();
    }

  })(jQuery);

  //END================ WOW (REVEAL ON SCROLL INIT FOR NO-TOUCH DEVICES) ===========

  //========================== SCROLL SPY FOR ONE-PAGER ============================================== 

  (function($){

    var header_height = $('.header').height();

    $('body.one_pager').scrollspy({
      target: "nav.primary_nav",
      offset: header_height * 2
    });

  }(jQuery));

  //END---------------------------------------------------------------------- SCROLL SPY FOR ONE-PAGER

  //========================== SLOW PAN BACKGROUND ANIMATION ========================================= 

  (function($){

    if( document.querySelector(".slowpan") !== null ) {
        document.querySelector(".slowpan").classList.add("start");
    }

  }(jQuery));

  //END---------------------------------------------------------------- SLOW PAN BACKGROUND ANIMATION

  

  //=================== LIGHTBOX =====================================================================

  (function($){

    var activityIndicatorOn = function(){
        $( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
      },
      activityIndicatorOff = function(){
        $( '#imagelightbox-loading' ).remove();
      },
      overlayOn = function(){
        $( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
      },
      overlayOff = function(){
        $( '#imagelightbox-overlay' ).remove();
      },
      closeButtonOn = function( instance ){
        $( '<a href="#" id="imagelightbox-close">Close</a>' ).appendTo( 'body' ).on( 'click', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });
      },
      closeButtonOff = function(){
        $( '#imagelightbox-close' ).remove();
      },
      captionOn = function(){
            var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"] img' ).attr( 'alt' ) || "";
        if( description.length > 0 )
          $( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
      },

        // DISPLAY CAPTION ON SINGLE POST VIEW
        captionOnSingle = function()
        {
            var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ).attr( 'title' ) || "";
            if( description.length > 0 )
                $( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
        },

        // DISPLAY CAPTION ON GALLERY GRID CLASSIC MODE. CAPTION IS BASED ON ALT ATTRIBUTE.
        captionOnGallery = function(){
            var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ) || "";
            if ( description.attr('data-description') !== "undefined" && description.attr('data-description') !== "" ){
                description = description.attr('data-description');
            } else if ( description.attr('datas-caption') !== "undefined" && description.attr('datas-caption') !== "" ) {
                description = description.attr('data-caption');
            }
            if( description && description.length > 0 )
                $( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
        },

        captionOff = function(){
          $( '#imagelightbox-caption' ).remove();
        };

        // ARROWS

        var arrowsOn = function( instance, selector ){
          if ( instance.length > 3 ){
            var $arrows = $( '<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>' );
                $arrows.appendTo( 'body' );
                $arrows.on( 'click touchend', function( e ){
                  e.preventDefault();
                  var $this   = $( this ),
                      $target = $( selector + '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ),
                      index   = $target.index( selector );
                  if( $this.hasClass( 'imagelightbox-arrow-left' ) ) {
                      index = index - 1;
                      if( !$( selector ).eq( index ).length ) index = $( selector ).length;
                  } else {
                      index = index + 1;
                      if( !$( selector ).eq( index ).length )
                          index = 0;
                  }
                  instance.switchImageLightbox( index ); 
                  return false;
            });
          }
        },
        arrowsOff = function(){
          $( '.imagelightbox-arrow' ).remove();
        };

    //  MASONRY GALLERY INITIALIZATION
    if ( $().imageLightbox ) {

        // ADDING LIGHTBOX FOR GALLERY GRID / CLASSIC "PORTFOLIO STRICT" & MASONRY
        // var selectorGG = 'a[data-imagelightbox="gallery"]';  // ENABLE ARROWS
        var selectorGG = 'a.lightbox_gallery';                  // ENABLE ARROWS
        var instanceGG = $( 'a.lightbox_gallery' ).imageLightbox({
            /* WITH ARROWS */
            onStart:        function() { arrowsOn( instanceGG, selectorGG ); overlayOn(); closeButtonOn( instanceGG ); }, 
            onEnd:          function() { arrowsOff(); overlayOff(); captionOff(); closeButtonOff(); activityIndicatorOff(); }, 
            onLoadEnd:      function() { $( '.imagelightbox-arrow' ).css( 'display', 'block' ); captionOnGallery(); activityIndicatorOff(); },
            onLoadStart:    function() { captionOff(); activityIndicatorOn(); }
        });
        var selectorS = 'a[data-imagelightbox="gallery"]'; // ENABLE ARROWS
        var instanceS = $( 'a.lightbox_single' ).imageLightbox({
          /* WITH ARROWS */
          onStart:        function() { arrowsOn( instanceS, selectorS ); overlayOn(); closeButtonOn( instanceS ); },
          onEnd:          function() { arrowsOff(); overlayOff(); captionOff(); closeButtonOff(); activityIndicatorOff(); },
          onLoadEnd:      function() { $( '.imagelightbox-arrow' ).css( 'display', 'block' ); captionOnSingle(); activityIndicatorOff(); },
          onLoadStart:    function() { captionOff(); activityIndicatorOn(); }
        });

    }

})(jQuery);

  //END================ LIGHTBOX ===================================================


$(function () {
	$('#date_check_in').datetimepicker({
			icons: {
				next: "form_next_icon",
				previous: "form_previous_icon",
			},
			format: 'D MMMM'
	});	
	$('#date_check_out').datetimepicker({
			icons: {
				next: "form_next_icon",
				previous: "form_previous_icon",
			},
			format: 'D MMMM'
		});
	});
});

//END============================= JQUERY TO PERFORM ON WINDOW LOAD =======================================

;


}).call(this);
