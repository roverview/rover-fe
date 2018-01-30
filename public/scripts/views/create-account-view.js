'use strict';

(function(module) {
  var createAccountView = {};

  createAccountView.init = (ctx, next) => {
    console.log('hello create account view')

    $('#login').hide();
    $('#create-account').show();
    $('#account').hide();
    $('#landing').hide();
    $('#explorer').hide();
    $('#results').hide();
    $('#about-us').hide();

    $('#create-account button').on('click', function(e) {
      e.preventDefault();

      let User = {
        username: $('#create-name').val(),
      }

      console.log('user obj:',User)
      console.log('user.username:',User.username)

      window.roverData.addUser(User.username);

    })
  }

  module.createAccountView = createAccountView;
})(window);