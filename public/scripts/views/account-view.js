'use strict';

(function(module) {
  var accountView = {};

  accountView.init = (ctx, next) => {
    // init code goes here (with params?)

    next();
  }

  module.accountView = accountView;
})(window);