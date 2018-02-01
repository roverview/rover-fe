'use strict';

(function(module) {
  var aboutUsView = {};

  aboutUsView.init = (ctx, next) => {
    console.log('hello')

    $('#login').hide();
    $('#create-account').hide();
    $('#account').hide();
    $('#landing').hide();
    $('#explorer').hide();
    $('#results').hide();

    $('#about-us').show();

    if(localStorage.user_id) {
      $('#nav-login').hide();
    } else {
      $('#nav-favorites').hide();
      $('#nav-logout').hide();
    };

    next();
  };

  module.aboutUsView = aboutUsView;
})(window);