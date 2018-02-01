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

        if(localStorage.user_id) {
          $('.not-logged-in').hide();
        } else {
          $('.logged-in').hide();
        };
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
  roverData.getImage = userId => {
    console.log('USER ID',userId)

    $.ajax({
      url: `${roverViewApi}/db/image/${userId}`,
      method: 'GET',
      dataType:'json',
      success: function(data) {
        console.log('psql data:',data);
        // add code here to loop through all photos linked to username...? Probably...? Also all photos should have Id attached to use for delete image function
      

        data.rows.forEach(function(item) {
          let content = `
            <form>
            <p><strong>Rover:</strong> ${item.rover_name}</p>
            <p><strong>Earth Date:</strong> ${item.earth_date}</p>
            <p><strong>Camera:</strong> ${item.camera_name}</p>
            <img src="${item.image_src}">
            <p class="photoDelete"> &#x274C Delete photo from favorites?</p>
            <input type="hidden" id="${item.id}">
            <input type="hidden" id="${item.image_id}">
            </form>
          `;
          $('.favorites-container').append(content);
        });


      }
    });
  };


  // DELETE (delete) favorite images
  roverData.deleteImage = (username, imgId) => {
    console.log('Delete image - username:', username);
    console.log('Delete image - image id:', imgId);

    $.ajax({
      url: `${roverViewApi}/db/image/${username}/${imgId}`,
      method: 'DELETE',
      success: console.log('Photo deleted from favorites')
      // change star to grey star or something?
    });
  };

  $('#nav-logout a').on('click', function(e) {
    localStorage.clear();
    $('#nav-login').show();
  });

  module.roverData = roverData;
})(window)