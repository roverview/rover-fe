'use strict';

(function(module) {
  var loginView = {};

  loginView.init = (ctx, next) => {
    $('#create-account').hide();
    $('#account').hide();
    $('#landing').hide();
    $('#explorer').hide();
    $('#results').hide();
    $('#about-us').hide();
    $('#login').show();

    if(localStorage.user_id) {
      $('#nav-login').hide();
    } else {
      $('#nav-favorites').hide();
      $('#nav-logout').hide();
    };

    $('#login-form button').on('click', function(e) {

      let User = {
        username: $('#login-name').val(),
      };

      console.log('user login obj:',User)
      console.log('user login.username:',User.username)

      window.roverData.getUser(User.username);

    });
  };

  module.loginView = loginView;
})(window);