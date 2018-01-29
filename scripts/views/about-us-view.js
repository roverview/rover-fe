'use strict';

(function(module) {
  var aboutUsView = {};

  aboutUsView.init = (ctx, next) => {
    // init code goes here

    next();
  }

  module.aboutUsView = aboutUsView;
})(window);