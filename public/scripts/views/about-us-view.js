'use strict';

(function(module) {
  var aboutUsView = {};

  aboutUsView.init = (ctx, next) => {
    console.log('hello')

    $('#login').hide();
    $('#create-account').hide();
    $('#account').hide();
    $('#landing').hide();
    $('#explorer').hide();
    $('#results').hide();

    $('#about-us').show();

    next();
  };

  module.aboutUsView = aboutUsView;
})(window);