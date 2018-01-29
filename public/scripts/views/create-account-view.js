'use strict';

(function(module) {
  var createAccountView = {};

  createAccountView.init = (ctx, next) => {
    // init code goes here

    next();
  }

  module.createAccountView = createAccountView;
})(window);