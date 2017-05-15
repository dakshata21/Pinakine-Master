/*!
 ______ _____   _______ _______ _______ _______ ______ _______ 
|   __ \     |_|    ___|_     _|   |   |       |   __ \   _   |
|    __/       |    ___| |   | |       |   -   |      <       |
|___|  |_______|_______| |___| |___|___|_______|___|__|___|___|

P L E T H O R A T H E M E S . C O M               (c) 2014-2015
                        
Theme Name: HOUSTON
File Version: 1.0.0
This file contains configuration settings for various features of the theme.

*/

var themeConfig = themeConfig || {};

    themeConfig["MAIN_MENU"] = 
    {
      menu_collapsing_width   : 1048, 
      tools_collapsing_width  : 480
    }
  
    themeConfig["HEAD_PANEL_OWLSLIDER"] = //http://www.owlcarousel.owlgraphic.com/docs/api-options.html
    {
      items              : 1,
      loop               : true,
      nav                : true,
      dots               : false,
      autoplay           : true,
      autoplayTimeout    : 5000,
      autoplayHoverPause : true,
      autoplaySpeed      : 500
    }

    themeConfig["CONTACT_FORM"] = 
    {
      elementId        : "contact_form",
      scriptFile       : "./assets/php/contact/contact.php",
      captchaEnable    : false,
      captchaFile      : "./assets/php/contact/captcha.php",
      requiredFields   : "Please fill in all the fields.",
      warningFadeSpeed : 500
    }

    themeConfig["APPOINTMENT_FORM"] = 
    {
      elementId        : "appointment_form",
      scriptFile       : "./assets/php/contact/appointment.php",
      captchaEnable    : true,
      captchaFile      : "./assets/php/contact/captcha.php",
      requiredFields   : "Please fill in all the fields.",
      warningFadeSpeed : 500
    }

    themeConfig["NEWSLETTERS"] =
    {
      messages: {

        successMessage : "SUCCESS",
        errorMessage   : "ERROR",
        
        name           : "Please specify your name",
        email          : {
        required       : "We need your email address to contact you",
        email          : "Your email address must be in the format of name@domain.com"
        },
        required       : "This field is required.",
        remote         : "Please fix this field.",
        url            : "Please enter a valid URL.",
        date           : "Please enter a valid date.",
        dateISO        : "Please enter a valid date ( ISO ).",
        number         : "Please enter a valid number.",
        digits         : "Please enter only digits.",
        creditcard     : "Please enter a valid credit card number.",
        equalTo        : "Please enter the same value again."
      }
    }

    themeConfig["TWITTER"] = 
    {
      twitterUserName  : "plethorathemes",        // LOAD TWEETS FROM TWITTER USER
      twitterContainer : "#twitter_flexslider",
      tweetCount       : 3,                       // NUMBER OF TWEETS TO DISPLAY
      apiPath          : "./assets/js/libs/Tweetie/api/tweet.php", // PATH TO tweet.php FILE
      template         : '<blockquote><p>{{user_name}} / {{screen_name}} &bull; {{date}}</p><p>{{tweet}}</p></blockquote>' // TWEETS FORMAT
    }

    themeConfig["SVG_NEWSLETTER"] = 
    {
      image : './assets/images/svg-newsletter.jpg'
    }

    themeConfig["TEAM_MEMBERS"] =
    {
      dir : ""
    }

    themeConfig["GOOGLE_MAPS"] = 
    {
      maps: 
        [{
          id                    : "map",
          lat                   : 51.50852,
          lon                   : 0.1254,
          type                  : "TERRAIN",                           // "SATELLITE", ROADMAP", "HYBRID", "TERRAIN"
          type_switch           : true,
          type_switch_style     : "DROPDOWN_MENU",                     // "DROPDOWN_MENU", "HORIZONTAL_BAR", "DEFAULT"
          type_switch_position  : "TOP_RIGHT",                         // POSITIONS: https://developers.google.com/maps/documentation/javascript/images/control-positions.png
          pan_control           : true,
          pan_control_position  : "RIGHT_CENTER",                      // POSITIONS: https://developers.google.com/maps/documentation/javascript/images/control-positions.png
          zoom                  : 14,
          zoom_control          : true,
          zoom_control_style    : "SMALL",                            // "SMALL", "LARGE", "DEFAULT"
          zoom_control_position : "LEFT_CENTER",                      // POSITIONS: https://developers.google.com/maps/documentation/javascript/images/control-positions.png
          scrollWheel           : false,
          disableDefaultUI      : false,
          marker                : true,
          infoWindow            : '<div id="content" class="infoWindow"><div id="siteNotice">SITE NOTICE</div><div id="bodyContent"><h1 class="title">SOME TITLE</h1><p><b>Your brand</b> can contain <a href="http://google.com" target="_blank">some information</a> here about your location... </p></div></div>',
          draggable             : false,
          markerImageSrc        : './assets/images/marker-shadow.png',  // LEAVE EMPTY "" TO ENABLE CUSTOM MARKER ICON
          markerTitle           : "We are right here!",
          markerImageWidth      : 53,
          markerImageHeight     : 46,
          markerAnchorX         : 53,
          markerAnchorY         : 40,
          styles                : null, // ( FOR MORE STYLES CHECK OUT: Snazzy Maps ): [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#428BCA'}]},{'featureType':'landscape','stylers':[{'color':'#f2e5d4'}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'color':'#c5c6c6'}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#e4d7c6'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#fbfaf7'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#c5dac6'}]},{'featureType':'administrative','stylers':[{'visibility':'on'},{'lightness':33}]},{'featureType':'road'},{'featureType':'poi.park','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':20}]},{},{'featureType':'road','stylers':[{'lightness':20}]}]
          streetView            : false,
          streetView_position   : "LEFT_CENTER",
          scale_control         : true,
          animatedMarker        : true // [EXPERIMENTAL]
        },
        {
            id               : "map-alt",
            lat              : 37.968454,
            lon              : 23.728528,
            type             : "SATELLITE",                           // "SATELLITE", ROADMAP", "HYBRID", "TERRAIN"
            zoom             : 18,
            scrollWheel      : false,
            disableDefaultUI : true,
            marker           : true,
            draggable        : false,
            markerImageSrc   : './assets/images/marker-shadow.png',  // LEAVE EMPTY "" TO ENABLE CUSTOM MARKER ICON
            markerTitle      : "We are right here!",
            markerImageWidth : 53,
            markerImageHeight: 46,
            markerAnchorX    : 53,
            markerAnchorY    : 40,
            styles           : null, // ( FOR MORE STYLES CHECK OUT: Snazzy Maps ): [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#428BCA'}]},{'featureType':'landscape','stylers':[{'color':'#f2e5d4'}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'color':'#c5c6c6'}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#e4d7c6'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#fbfaf7'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#c5dac6'}]},{'featureType':'administrative','stylers':[{'visibility':'on'},{'lightness':33}]},{'featureType':'road'},{'featureType':'poi.park','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':20}]},{},{'featureType':'road','stylers':[{'lightness':20}]}]
            streetView     : false
        }]
    }

    themeConfig["GENERAL"] = {
      enable3DLinks       : true,
      onePagerScrollSpeed : 1500
    } 

    themeConfig.debug = true;       // DEBUGGING FOR DEVELOPMENT MODE 

//========================== EXPERIMENTAL FEATURES ==================================================

    /* DEPRECATED CODE: Using FlexSlider */
    /*themeConfig["SLIDER"] = 
    {
      slideshow      : "1",
      direction      : "horizontal",
      animationloop  : "1",
      slideshowspeed : "6",             // IN SECONDS
      animationspeed : "600",
      showarrows     : "1",
      showbullets    : "1",
      randomize      : "",
      pauseonaction  : "1",
      pauseonhover   : "1",
      animationtype  : "slide",
      speed          : 1000
    }*/

//========================== EXPERIMENTAL FEATURES ==================================================

//========================== EXPERIMENTAL FEATURES ==================================================

    /*** WARNING: THESE FEATURES ARE CURRENTLY IN BETA. USE AT YOUR OWN RISK!  ***/

    // themeConfig["NEWSLETTERS"].messages.maxlength   = $.validator.format( "Please enter no more than {0} characters." );
    // themeConfig["NEWSLETTERS"].messages.minlength   = $.validator.format( "Please enter at least {0} characters." );
    // themeConfig["NEWSLETTERS"].messages.rangelength = $.validator.format( "Please enter a value between {0} and {1} characters long." );
    // themeConfig["NEWSLETTERS"].messages.range       = $.validator.format( "Please enter a value between {0} and {1}." );
    // themeConfig["NEWSLETTERS"].messages.max         = $.validator.format( "Please enter a value less than or equal to {0}." );
    // themeConfig["NEWSLETTERS"].messages.min         = $.validator.format( "Please enter a value greater than or equal to {0}." );

    // themeConfig["SVGSLIDER"].speech         = false;

    // themeConfig["PARTICLES"].enableParallax = false;

//END======================= EXPERIMENTAL FEATURES ==================================================
