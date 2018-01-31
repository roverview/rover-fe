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

    let rover = ctx.params.rover;
    let roverHeader = rover.charAt(0).toUpperCase() + rover.slice(1);
    console.log('rover name: ', roverHeader);
    $('#explorer h2').text(roverHeader);

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