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
    $('#manifest').hide()
    $('#account').show();
    $('.favorites-container').empty();

    if(localStorage.user_id) {
      $('#nav-login').hide();
    } else {
      $('#nav-favorites').hide();
      $('#nav-logout').hide();
    };

    $('document').ready(function() {    
      let userId = JSON.parse(localStorage.user_id);
      window.roverData.getImage(userId);
    });

    $('.favorites-container').on('click', 'form a', function(e) {
      e.preventDefault();
      console.log('this', this);
      
      let imgId = $(this).data('imageid');
      let username = $(this).data('itemid');

      console.log('username:', username);
      console.log('imgId:', imgId);

      window.roverData.deleteImage(username, imgId);
      $(this).parent().remove();

    })
  }

  module.accountView = accountView;
})(window);