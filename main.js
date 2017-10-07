
var enterBtn = document.getElementById("enter");
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
enterBtn.addEventListener("click", captureInput);

function captureInput() {

  var dict = {
    "gcal": makeEvent,
    "googlecalendar": makeEvent,
  };

  var input = String(document.getElementById("input").value);
  untilSpace = input.indexOf(' ');
  command = input.substring(0, untilSpace);
  console.log(command);
  if (command in dict) {
    authorizeButton.click();
    dict[command](input.substring(untilSpace+1));
    signoutButton.click();
  }
  else {
    console.log("not a valid command");
  }
}

  // Client ID and API key from the Developer Console
  var CLIENT_ID = '951578952608-pnrc56tttl9dd2u67keg43hj5rhn6eid.apps.googleusercontent.com';

  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPES = "https://www.googleapis.com/auth/calendar";

  var authorizeButton = document.getElementById('authorize-button');
  var signoutButton = document.getElementById('signout-button');
  /**
   *  On load, called to load the auth2 library and API client library.
   */
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  function updateSigninStatus(isSignedIn) {
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }
