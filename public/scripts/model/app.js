'use strict';

(function(module) {
  let roverData = {};

  // let roverViewApi = 'https://rover-be-staging.herokuapp.com';
  let roverViewApi = 'http://localhost:4000';
  let apiPhotoUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
  let apiManifestUrl = 'https://api.nasa.gov/mars-photos/api/v1/manifests/';
  let apiKey = 'F7GBoBZ1JBWwwehiwisVuPyIkX8yk8W6rmsDHazU';

  /* MARS PHOTO API */
  roverData.fetchCameras = (rover, date) => {

    console.log(rover)
    console.log(date)


    $.ajax({
      url: `${apiPhotoUrl}/${rover}/photos?earth_date=${date}`,
      method: 'GET',
      dataType: 'JSON',
      data: {
        'api_key': apiKey,
      },
      success: function(data) {
        console.log('available photos',data.photos);
        console.log('available cameras',data.photos[0].camera);
        let cameras = [];

        for(var i = 0; i < data.photos.length; i++) {
          let cameraName = data.photos[i].camera.name;
          let fullName = data.photos[i].camera.full_name;
          let htmlOption = `<option value="${cameraName}">${fullName}</option>`;

          if (cameras.indexOf(fullName) === -1) {
            cameras.push(fullName);

            $('#available-cameras').append(`${htmlOption}`);
          };
        };
      }
    });
  };

  // GET & render photo from Mars Photo API
  roverData.fetchPhoto = (rover, date, camera) => {
    console.log('rover:',rover);
    console.log('date:',date);
    console.log('camera:',camera);

    $.ajax({
      url: `${apiPhotoUrl}${rover}/photos?earth_date=${date}&camera=${camera}`,
      method: 'GET',
      dataType: 'JSON',
      data: {
        'api_key': apiKey,
      },
      success: function(data) {
        console.log('photo data:',data);

        let photo = data.photos[0].img_src;
        let camera = data.photos[0].camera.full_name;
        let earthDate = data.photos[0].earth_date;

        let formattedDate = roverData.renderDate(earthDate);

        $('#earth-date').text(formattedDate);
        $('#camera-name').text(camera);
        $('#results-img').attr('src', photo);
        $('#results').show();
      }
    });
  };


  // Change date format from 2018-01-28 to 01-28-2018
  roverData.renderDate = date => {
    let newDate = date.split('-');

    newDate.push(newDate[0]);
    newDate.shift();
    newDate.join('-');

    return newDate.join('-');
  };

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
        console.log('mission manifest',data);
      }
    });
  };


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
    });
  };

  // GET (read) user
  roverData.getUser = username => {
    console.log('Get user:', username);

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
    });
  };


  /* ROVERVIEW API - IMAGES */
  // POST (create/save) favorite images
  roverData.addImage = (rover, date, camera, img_url) => {
    console.log('Add image:', img_url);

    $.ajax({
      url: `${roverViewApi}/db/image`,
      method: 'POST',
      data: {
        rover_name: rover,
        camera_name: camera,
        earth_date: date,
        image_src: img_url,
        user_id: localStorage.user_id,
      },
      success: console.log('Photo added to favorites!')
      // change star to colored in star or something?
    });
  };

  // GET (read) favorite images
  roverData.getImage = (ctx, next) => {
    console.log('Get user id:', ctx);
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
    });
  };


  // DELETE (delete) favorite images
  roverData.deleteImage = (ctx, next) => {
    console.log('Delete image:', ctx);
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
    });
  };


  module.roverData = roverData;
})(window)