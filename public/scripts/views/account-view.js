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

    next();
  };
  module.accountView = accountView;
})(window);