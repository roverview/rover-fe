'use strict';

(function(module) {
  var createAccountView = {};

  createAccountView.init = (ctx, next) => {
    console.log('hello create account view')
    // init code goes here

    $('#login').hide();
    $('#account').show();
    $('#landing').hide();
    $('#explorer').hide();
    $('#results').hide();
    $('#about-us').hide();

    next();
  }

  module.createAccountView = createAccountView;
})(window);