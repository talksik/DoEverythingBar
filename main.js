var enterBtn = document.getElementById("enter");
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

var createBtn = document.getElementById('create-event');
enterBtn.addEventListener("click", captureInput);
var actualCommand = '';

function captureInput() {
  var dict = {
    "gcal": makeEvent,
    "googlecalendar": makeEvent,
  };

  var input = String(document.getElementById("input").value);
  untilSpace = input.indexOf(' ');
  command = input.substring(0, untilSpace);
  console.log(command);
  signoutButton.click();
  if (command in dict) {
    console.log('isAValidCommmand');
    actualCommand = input.substring(untilSpace+1);
    createBtn.addEventListener("click", function () {
          console.log('successfully clicked createbtn');
          makeEvent(actualCommand);
    });
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      console.log('already signed in');
      createBtn.click();
    }
    else {
      authorizeButton.click();
      setTimeout(alert("Run Command again!"), 10000);
    }
  }
  else {
    console.log("not a valid command");
  }
}
