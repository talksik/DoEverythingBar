var enterBtn = document.getElementById("enter");
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

var guideIcon = document.getElementById('guide-icon');
  guideIcon.addEventListener("click", function() {
    $('.guide-popup').slideDown(500);
    $('.cancelPop').fadeIn();
    $('#cancelParent').click(function() {
      console.log('hi');
      $(this).fadeOut();
      $('.cancelPop').fadeOut();
      $('.guide-popup').fadeOut();
    });
  });
var runCommandBtn = document.getElementById('create-event');
  enterBtn.addEventListener("click", captureInput);
  window.addEventListener("keypress", function(e) {
    var key = e.which || e.keycode;
    if (key == 13) {
      captureInput();
    }
  });
var actualCommand = '';
var command = '';

var dict = {
  "gcal": makeEvent,
  "googlecalendar": makeEvent,
  "mapsd": directionsURL,
  "directions": directionsURL,
  "skype": 'buffer'
};

function error() {
  $('#fire').slideDown();
  $('#input').mousedown(function() {
    $('#fire').slideUp();
  });
}

function captureInput() {
  var input = String(document.getElementById("input").value);
  var untilSpace = input.indexOf(' ');
  command = input.substring(0, untilSpace);
  console.log(command);

  if (command in dict) {
    console.log('isAValidCommmand');
    actualCommand = input.substring(untilSpace+1);

      if (actualCommand == '') {
        console.log('actualCommand is empty!!');
        error();
      }
      else if (command == "skype") {
        console.log('launched skype app');
        //skypeCall(actualCommand);
        $('#SkypeButton_Call_justinkimchi77_1').fadeIn();
      }
      else if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        console.log('already signed in');
        runCommandBtn.addEventListener("click", runCommand);
        function runCommand() {
            console.log('successfully ran command');
            dict[command](actualCommand);
          }
        runCommandBtn.click();
        if (command == 'gcal') {
          $('.updateCont').slideDown().fadeIn().delay(5000).fadeOut();
        }
        runCommandBtn.removeEventListener("click", runCommand);
      }

      else {
        authorizeButton.click();
        setTimeout(console.log("Run Command again!"), 1000);
      }
  }
  else {
    console.log("Not a valid command");
    error();
  }
}
