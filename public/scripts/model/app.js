'use strict';

(function(module) {
  let roverData = {}

  // let roverViewApi = 'https://rover-be-staging.herokuapp.com';
  let roverViewApi = 'http://localhost:4000';
  let apiPhotoUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
  let apiManifestUrl = 'https://api.nasa.gov/mars-photos/api/v1/manifests/';
  let apiKey = 'F7GBoBZ1JBWwwehiwisVuPyIkX8yk8W6rmsDHazU';

  /* MARS PHOTO API */
  // GET cameras for rovers, populate drop-down on page load
  // We might need to filter the drop-down further based on date
  roverData.fetchCameras = (ctx, next) => {
    let rover = ctx.params.rover;
    console.log('ctx:',ctx);
    let roverName = rover.charAt(0).toUpperCase() + rover.slice(1);
    console.log('rover name: ', roverName);
    $('#explorer h2').text(roverName);
    $.ajax({
      url: `${apiPhotoUrl}/${rover}`,
      method: 'GET',
      dataType: 'JSON',
      data: {
        'api_key': apiKey,
      },
      success: function(data) {
        console.log('available cameras:',data.rover.cameras);
        let cameras = [];

        for(var i = 0; i < data.rover.cameras.length; i++) {
          let cameraName = data.rover.cameras[i].name;
          let fullName = data.rover.cameras[i].full_name;
          let htmlOption = `<option value="${cameraName}">${fullName}</option>`;

          if (cameras.indexOf(fullName) === -1) {
            cameras.push(fullName);
            $('#available-cameras').append(`"${htmlOption}"`);
          }
        }
      }
    })
    // next();
  }

  // GET & render photo from Mars Photo API
  roverData.fetchPhoto = (ctx, next) => {
    let rover = 'curiosity';
    let date = '2018-1-28';
    let camera = 'fhaz';

    $.ajax({
      url: `${apiPhotoUrl}${rover}/photos?earth_date=${date}&camera=${camera}`,
      method: 'GET',
      dataType: 'JSON',
      data: {
        'api_key': apiKey,
      },
      success: function(data) {
        console.log('photo data:',data)

        let photo = data.photos[0].img_src;
        let camera = data.photos[0].camera.full_name;
        let earthDate = data.photos[0].earth_date;

        let formattedDate = roverData.renderDate(earthDate);

        $('#earth-date').text(formattedDate);
        $('#camera-name').text(camera);
        $('#results img').attr('src', photo);
      }
    })
    next();
  }

  // Change date format from 2018-01-28 to 01-28-2018
  roverData.renderDate = date => {
    let newDate = date.split('-')

    newDate.push(newDate[0]);
    newDate.shift();
    newDate.join('-');

    return newDate.join('-');
  }

  // GET mission manifest for each rover from Mars Rover API
  roverData.fetchManifest = (ctx, next) => {
    let rover = 'curiosity';

    $.ajax({
      url: `${apiManifestUrl}${rover}`,
      method: 'GET',
      dataType: 'JSON',
      data: {
        'api_key': apiKey
      },
      success: function(data) {
        console.log('mission manifest',data)
      }
    })

    next();
  }

  /* ROVERVIEW API - USERS */
  // POST (create) user
  roverData.addUser = username => {
    console.log('add user function',username);

    $.ajax({
      url: `${roverViewApi}/db/users`,
      type: 'POST',
      data: { 'user': username },
      dataType:'json',
      success: function(data) {
        console.log(data);
      }
    })
  }

  // GET (read) user
  roverData.getUser = username => {
    console.log('Get user:', username)

    $.ajax({
      url: `${roverViewApi}/db/users/${username}`, 
      method: 'GET',
      success: function(data) {
        console.log(data);
        localStorage.username = data.rows[0].username;
        localStorage.user_id = data.rows[0].id;
        // change pages to logged in results
        // add code here to loop through all photos linked to username...? Probably...?
      }
       
    })
    // next();
  }

  /* ROVERVIEW API - IMAGES */
  // POST (create/save) favorite images
  roverData.addImage = (ctx, next) => {
    console.log('Add image:', ctx)
    // need to make sure this only happens if the user is logged in
    // receive user id 
    $.ajax({
      url: `${roverViewApi}/db/image`,
      method: 'POST',
      data: { // need to figure out exact properties here...
        rover_name: this.roverName,
        camera_name: this.camera,
        earth_date: this.earthDate,
        img_src: this.imgSrc,
        user_id: localStorage.user_id, // ?? this might not work.
      },
      success: console.log('Photo added to favorites!')
      // change star to colored in star or something?
    })
      .catch(err => {
        console.error(err);
      })
    next();
  }

  // GET (read) favorite images
  roverData.getImage = (ctx, next) => {
    console.log('Get user id:', ctx)
    let user_id = localStorage.user_id;

    $.ajax({
      url: `${roverViewApi}/db/image/${user_id}`, // need to check params...
      method: 'GET',
      data: {
        user_id: localStorage.user_id,
      },
      success: function(data) {
        console.log(data);
        // add code here to loop through all photos linked to username...? Probably...? Also all photos should have Id attached to use for delete image function
      }
        .catch(err => {
          console.error(err);
        })
    })
    next();
  }

  // DELETE (delete) favorite images
  roverData.deleteImage = (ctx, next) => {
    console.log('Delete image:', ctx)
    // need to make sure this only happens if the user is logged in

    // use jQuery like so:
    // $('#delete-book').on('click', function() {
    // which would trigger the following ajax call:

    $.ajax({
      url: `${roverViewApi}/db/users/${ctx.params.username}/${ctx.params.imgId}`,
      method: 'DELETE',
      data: {
        // what do we do here lol
      },
      success: console.log('Photo deleted from favorites')
      // change star to grey star or something?
    })
      .catch(err => {
        console.error(err);
      })
    next();
  }

  module.roverData = roverData;
})(window)