'use strict';

(function(module) {
  var explorerView = {};

  explorerView.init = (ctx, next) => {
    $('#login').hide();
    $('#create-account').hide();
    $('#account').hide();
    $('#results').hide();
    $('#about-us').hide();
    $('#results').hide();
    $('#landing').hide();

    $('#explorer').show();

    next();
  }

  module.explorerView = explorerView;
})(window);