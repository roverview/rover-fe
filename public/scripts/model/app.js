'use strict';

(function(module) {
  let roverData = {}

  let apiPhotoUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
  let apiManifestUrl = 'https://api.nasa.gov/mars-photos/api/v1/manifests/';
  let apiKey = 'F7GBoBZ1JBWwwehiwisVuPyIkX8yk8W6rmsDHazU';

  /* MARS PHOTO API */
  // GET cameras for rovers, populate drop-down on page load
  // We might need to filter the drop-down further based on date
  roverData.fetchCameras = (ctx, next) => {
    let rover = ctx.params.rover;
    console.log('ctx:',ctx)

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
        // let launchDate = data.photo_manifest.launch_date;
        // let landingDate = data.photo_manifest.landing_date;
        // let maxDate = data.photo_manifest.max_date;
        // let status = data.photo_manifest.status;

        // $('#launchdate').text(launchDate);
        // $('#landingdate').text(landingDate);
        // $('#maxdate').text(maxDate);
        // $('#status').text(status);
      }
    })

    next();
  }

  /* ROVERVIEW API */
  /* DATABASE TABLES
    - Table 1 - users
      - create users, 'POST' user to DB
      - fetch users, 'GET' user from DB
      - each user needs an id
    - Table 2 - user favorites
      - foreign ID to link to user table
      - Photo URL
      - Earth date
      - Camera name

    APP FUNCTIONS
    - POST (create) user
    - GET (read) user
    - GET (read) image related to user
    - POST (create) image related to user
    - DELETE image related to user
  */

  // POST (create) user
  roverData.addUser = (ctx, next) => {
    console.log('Add user:', ctx)

    $.ajax({
      url: ``, // add URL
      method: 'POST',
      data: {
        user: this.user, // update this
        passphrase: this.passphrase, // update this
      },
      // need to change the window assign below - my version is hacky
      success: window.location.assign('/'),
    })
      .catch(err => {
        console.error(err);
      })
    next();
  }

  roverData.getUser = (ctx, next) => {
    console.log('Get user:', ctx)

    $.ajax({
      url: ``, // add URL
      method: 'GET',
      success: function(data) {
        console.log(data)

        // if username & passphrase match, redirect to another page?
      }
    })
    next();
  }

  module.roverData = roverData;
})(window)