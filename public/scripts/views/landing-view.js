'use strict';

// basically the index/home view

(function(module) {
  var landingView = {};

  landingView.init = (ctx, next) => {

    $('#login').hide();
    $('#create-account').hide();
    $('#account').hide();
    $('#explorer').hide();
    $('#results').hide();
    $('#about-us').hide();
    $('#results').hide();
    $('#landing').show();

    if(localStorage.id) {
      $('#nav-login').hide();
    } else {
      $('#nav-favorites').hide();
      $('#nav-logout').hide();
    };

    next();
  };

  module.landingView = landingView;
})(window);