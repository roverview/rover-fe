'use strict';

(function(module) {
  var accountView = {};

  accountView.init = (ctx, next) => {
    $('#login').hide();
    $('#create-account').hide();
    $('#landing').hide();
    $('#explorer').hide();
    $('#results').hide();
    $('#about-us').hide();
    $('#account').show();

    if(localStorage.user_id) {
      $('#nav-login').hide();
    } else {
      $('#nav-favorites').hide();
      $('#nav-logout').hide();
    }

    $('document').ready(function() {    
      let userId = JSON.parse(localStorage.user_id);
      window.roverData.getImage(userId)
    })

  };
  module.accountView = accountView;
})(window);