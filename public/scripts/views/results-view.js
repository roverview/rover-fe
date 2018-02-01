'use strict';

(function(module) {
  var resultsView = {};

  resultsView.init = (ctx, next) => {
    $('#login').hide();
    $('#create-account').hide();
    $('#account').hide();
    $('#landing').hide();
    $('#explorer').hide();
    $('#about-us').hide();
    $('#manifest').show()
    $('#results').show();

    if(localStorage.user_id) {
      $('#nav-login').hide();
    } else {
      $('#nav-favorites').hide();
      $('#nav-logout').hide();
    };
  };

  module.resultsView = resultsView;
})(window);