// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

let locationFromInput;
let resultsDiv = document.getElementById('results');

/*
* Boba fetching
*/

function bobaCallback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
   // console.log(results)
    for (var i = 0; i < results.length; i++) {
      resultsDiv.insertAdjacentHTML('beforeend', `
        <p>
          ${results[i].name} - ${results[i].formatted_address}
          <br/>
          <img src="boba.png" width="50" />
        </p>
      `)
    }
  }
}

function getBoba() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: locationFromInput,
    zoom: 15
  });
  
  var bobaRequest = {
    location: locationFromInput,
    radius: 1000, // meters
    query: ['boba tea']
  }

  service = new google.maps.places.PlacesService(map);
  service.textSearch(bobaRequest, bobaCallback);  
}

document.getElementById('bobaButton').addEventListener('click', getBoba);

/*
* Location finder
*/

function initAutocomplete() {
  // Create the search box and link it to the UI element.
  let input = document.getElementById('location');
  let searchBox = new google.maps.places.SearchBox(input);

  let markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    let places = searchBox.getPlaces();
    if (places.length == 0) {
      alert('Could not find that address!')
      return;
    }

    locationFromInput = places[0].geometry.location;

  });
}
