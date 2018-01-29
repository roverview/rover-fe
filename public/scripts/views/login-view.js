'use strict';

(function(module) {
  var loginView = {};

  loginView.init = (ctx, next) => {
    $('#landing').hide();
    $('#create-account').hide();
    $('#account').hide();
    $('#explorer').hide();
    $('#results').hide();
    $('#about-us').hide();
    $('#results').hide();
    
    $('#login').show();

    next();
  }

  module.loginView = loginView;
})(window);