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

    $('h2').text(ctx.params.rover);
    // NEEDS UPDATE: need to put to upper case at some point
    // let roverName = rover.charAt(0).toUpperCase() + rover.slice(1);
    // console.log('rover name: ', roverName);
    // $('#explorer h2').text(roverName);

    $('#datepicker').on('change', function(e) {
      e.preventDefault();

      let roverName = ctx.params.rover;
      let pickedDate = $('#datepicker').val();
      console.log('picked date:',pickedDate)

      window.roverData.fetchCameras(roverName,pickedDate)
    })

    $('.camera button').on('click', function(e) {
      e.preventDefault();

      let roverName = ctx.params.rover;
      let pickedDate = $('#datepicker').val();
      let pickedCamera = $('#available-cameras option:checked').val();

      console.log('picked date:',pickedDate)
      console.log('picked camera:',pickedCamera)

      window.roverData.fetchPhoto(roverName, pickedDate, pickedCamera);
    })
  }

  module.explorerView = explorerView;
})(window);