var enterBtn = document.getElementById("enter");
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

var runCommandBtn = document.getElementById('create-event');
enterBtn.addEventListener("click", captureInput);
var actualCommand = '';
var command = '';

function captureInput() {
  var dict = {
    "gcal": makeEvent,
    "googlecalendar": makeEvent,
    "mapsd": directionsURL,
    "directions": directionsURL
  };

  var input = String(document.getElementById("input").value);
  var untilSpace = input.indexOf(' ');
  command = input.substring(0, untilSpace);
  console.log(command);

  if (command in dict) {
    console.log('isAValidCommmand');
    actualCommand = input.substring(untilSpace+1);
    runCommandBtn.addEventListener("click", function () {
          console.log('successfully ran command');
          dict[command](actualCommand);
    });

    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      console.log('already signed in');
      runCommandBtn.click();
    }
    else {
      authorizeButton.click();
      setTimeout(alert("Run Command again!"), 1000);
    }
  }
  else {
    alert.log("Not a valid command");
  }
}
