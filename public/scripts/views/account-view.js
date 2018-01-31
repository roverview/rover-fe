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

    $('.photoDelete a').on('click', function() {
      // console.log(get username here)
      // console.log(get image id here)

      window.roverData.deleteImage(/*username, img id*/)
    });
  }

  module.accountView = accountView;
})(window);