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

    $('.favorites-container').on('click', 'a', function() {
      console.log(this)
      let username = $('.hiddenUserId').attr('id')
      let imgId = $('.hiddenImageId').attr('id')

      console.log(username)
      console.log(imgId)

      window.roverData.deleteImage(username, imgId);
      window.location.assign('/account')
    })
  }

  module.accountView = accountView;
})(window);