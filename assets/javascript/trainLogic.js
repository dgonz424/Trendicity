// Initialize Firebase
 var config = {
   apiKey: "AIzaSyA4ZMBx8F2AEszwQk4M-GiGaOnjP6QMBsY",
   authDomain: "firechat-test-fde48.firebaseapp.com",
   databaseURL: "https://firechat-test-fde48.firebaseio.com",
   storageBucket: "firechat-test-fde48.appspot.com",
   messagingSenderId: "423047939499"
 };
 firebase.initializeApp(config);



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

// variables
var chatData = database.ref("/chat");





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
        //add each trend name as text inside the button
            console.log(newButton.attr('id'));
        newButton.text(results);
        //append each button to the page
        $("#trends").append(newButton);
    


      }//response function end
}); //ajax end



//Initialize Firebase
  
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


// click to open chat room of button's topic name. 
$(".button").on("click",function() {
database.ref("/chat- " + $(this).attr("id"));
console.log($(this).attr('id'))

});

$(".chat-send").on('click', function(){

  if ($(".chat-input").val() !== "") {

    var message = $(".chat-input").val();

    chatData.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      idNum: playerNum
    });

    $(".chat-input").val("");
  }
});



//begin login to twitter function
      function login() {
        // Log the user in via Twitter
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider).catch(function(error) {
          console.log("Error authenticating user:", error);
        });
      }

      // firebase.auth().onAuthStateChanged(function(user) {
      //   // Once authenticated, instantiate Firechat with the logged in user
       
      // });

  


// Update chat on screen when new message detected - ordered by 'time' value
chatData.orderByChild("time").on("child_added", function(snapshot) {
// in addition to push, the button should change the lcoation
  // If idNum is 0, then its a disconnect message and displays accordingly
  // If not - its a user chat message
  if (snapshot.val().idNum === 0) {
    $(".chat-messages").append("<p class=player" + snapshot.val().idNum + "><span>"
    + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
  }
  else {
    $(".chat-messages").append("<p class=player" + snapshot.val().idNum + "><span>"
    + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
  }

  // Keeps div scrolled to bottom on each update.
  $(".chat-messages").scrollTop($(".chat-messages")[0].scrollHeight);
});


$(".chat-input").keypress(function(e) {

  if (e.keyCode === 13 && $(".chat-input").val() !== "") {

    var message = $(".chat-input").val();

    chatData.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      idNum: playerNum
    });

    $(".chat-input").val("");
  }
});

$(".chat-send").click(function() {

  if ($(".chat-input").val() !== "") {

    var message = $(".chat-input").val();

    chatData.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      idNum: playerNum
    });

    $(".chat-input").val("");
  }
});