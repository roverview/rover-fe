'use strict';

(function(module) {
  var resultsView = {};

  resultsView.init = (ctx, next) => {
    // init code goes here (with params?)

    next();
  }

  module.resultsView = resultsView;
})(window);