'use strict';

(function(module) {
  var createAccountView = {};

  createAccountView.init = (ctx, next) => {
    // init code goes here

    $('#login').hide();
    $('#account').hide();
    $('#landing').hide();
    $('#explorer').hide();
    $('#results').hide();
    $('#about-us').show();

    next();
  }

  module.createAccountView = createAccountView;
})(window);