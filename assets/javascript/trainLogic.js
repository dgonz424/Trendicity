//function displayTrendInfo() {
		
	var settings = {
  "async": true,
  "crossDomain": true,
  "dataType": 'jsonp',
  "url": "https://shrouded-ravine-11424.herokuapp.com/1.1/trends/place.json?id=2466256",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "0daac021-8084-9b44-33e4-129b7c0171d7"
  }
}

//ajax call for settings variable data 
$.ajax(settings).done(function (response) {
  console.log(response);
        for (var i = 0; i < 10; i++) {
            //storing results from API response in a variable
          var results = response[0].trends[i].name;
          console.log(results);
        //generate a button for each trend name
        var newButton = $("<button class='button'>");
        //add a class
        newButton.attr("id", results);
        newButton.attr('data-type', 'site:google.com ' + results);
        //add each trend name as text inside the button
            console.log(newButton.attr('id'));
        newButton.text(results);
        //append each button to the page
        $("#trends").append(newButton);


  		}//response function end
}); //ajax end

//begin Firebase and Firechat
//Initialize Firebase
  var config = {
    apiKey: "AIzaSyA4ZMBx8F2AEszwQk4M-GiGaOnjP6QMBsY",
    authDomain: "firechat-test-fde48.firebaseapp.com",
    databaseURL: "https://firechat-test-fde48.firebaseio.com",
    storageBucket: "firechat-test-fde48.appspot.com",
    messagingSenderId: "423047939499"
  };
  firebase.initializeApp(config);

  //create a reference to the database
var database = firebase.database();

var provider = new firebase.auth.TwitterAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
  // You can use these server side with your app's credentials to access the Twitter API.
  var token = result.credential.accessToken;
  var secret = result.credential.secret;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});



//begin login to twitter function
      function login() {
        // Log the user in via Twitter
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider).catch(function(error) {
          console.log("Error authenticating user:", error);
        });
      }

      firebase.auth().onAuthStateChanged(function(user) {
        // Once authenticated, instantiate Firechat with the logged in user
        if (user) {
          initChat(user);
        }
      });

      function initChat(user) {
        // Get a Firebase Database ref
        var chatRef = firebase.database().ref("chat");

        // Create a Firechat instance
        var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

        // Set the Firechat user
        chat.setUser(user.uid, user.displayName);
      }         
// use this line below, somehow, to create rooms of the quantity and names specified by the ajax. 
// Firechat.createRoom(roomName, roomType, callback(roomId))
// click to open chat room of button's topic name. 
$(".button").on("click",function() {
this.attr('data-type');
});




   