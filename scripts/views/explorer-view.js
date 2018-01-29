'use strict';

(function(module) {
  var explorerView = {};

  explorerView.init = (ctx, next) => {
    // init code goes here

    next();
  }

  module.explorerView = explorerView;
})(window);