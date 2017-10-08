var mapsFrame = document.getElementById('map');
var searchBar = document.getElementById('search-cont');

function directionsURL(inCommand) {
  var startOfTo = inCommand.indexOf("to");
  var origin = inCommand.substring(0, startOfTo - 1).replace(" ", "+");
  var dest = inCommand.substring(startOfTo+3).replace(" ", "+"); // "14872 Waverly Lane, Irvine, CA" to "14872 Waverly Lane+Irvine+CA"
  var link = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyCZCgZY7ZlSMk1DW0NEEoHZ9qwdSL4AR1k&origin="+origin+"&destination="+dest
  mapsFrame.src = link;
  $('#map').delay(3000).fadeIn();
  $('#search-cont').delay(2700).animate({'margin-top' : '-=200px'});
  $('#input').mousedown(function() {
    $('#map').fadeOut(500);
    $('#search-cont').animate({'margin-top' : '+=200px'});
    $('#input').unbind();
  });
}
/*
var x = document.getElementById("input");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}
*/
