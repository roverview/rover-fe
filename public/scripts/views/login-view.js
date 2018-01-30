'use strict';

(function(module) {
  var loginView = {};

  loginView.init = (ctx, next) => {
    $('#create-account').hide();
    $('#account').hide();
    $('#landing').hide();
    $('#explorer').hide();
    $('#results').hide();
    $('#about-us').hide();

    $('#login').show();

    next();
  }

  module.loginView = loginView;
})(window);