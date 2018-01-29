'use strict';

// basically the index view

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

    next();
  }

  module.landingView = landingView;
})(window);