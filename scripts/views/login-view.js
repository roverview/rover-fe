'use strict';

(function(module) {
  var loginView = {};

  loginView.init = (ctx, next) => {
    // init code goes here

    next();
  }

  module.loginView = loginView;
})(window);