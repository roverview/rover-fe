'use strict';

(function(module) {
  var explorerView = {};

  explorerView.init = (ctx, next) => {
    $('#login').hide();
    $('#create-account').hide();
    $('#account').hide();
    $('#landing').hide();
    $('#results').hide();
    $('#about-us').hide();
    $('#explorer').show();

    next();
  }

  module.explorerView = explorerView;
})(window);