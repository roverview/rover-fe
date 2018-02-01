'use strict';

(function(module) {
  var resultsView = {};

  resultsView.init = (ctx, next) => {
    // init code goes here (with params?)

    $('#login').hide();
    $('#create-account').hide();
    $('#account').hide();
    $('#landing').hide();
    $('#explorer').hide();
    $('#about-us').hide();
    $('#results').show();

    if(localStorage.user_id) {
      $('#nav-login').hide();
    } else {
      $('#nav-favorites').hide();
      $('#nav-logout').hide();
    };

    next();
  };

  module.resultsView = resultsView;
})(window);