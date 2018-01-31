'use strict';

(function(module) {
  var accountView = {};

  accountView.init = (ctx, next) => {
    // init code goes here (with params?)

    $('#login').hide();
    $('#create-account').hide();
    $('#landing').hide();
    $('#explorer').hide();
    $('#results').hide();
    $('#about-us').hide();
    $('#account').show();

    if(localStorage.id) {
      $('#nav-login').hide();
    } else {
      $('#nav-favorites').hide();
      $('#nav-logout').hide();
    };

    next();
  };
  module.accountView = accountView;
})(window);