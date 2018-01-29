'use strict';

(function(module) {
  var landingView = {};

  landingView.init = (ctx, next) => {
    // init code goes here

    next();
  }

  module.landingView = landingView;
})(window);