//new chat div created every time buttons clicked (problem)
//make div large enough to display in CSS
//make if, else statements so no new div is created for existing button divs
//make if, else statements so no new div is created for existing button divs (firebase as well)
//all chatData.push() sent to firebase and display
//empty chatDiv before new button click to display new content each time



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


  //create a reference to the database
var database = firebase.database();


// variables
var chatData = database.ref("/chat");
var username = "";
var message = "";









//Initialize Firebase
  

var provider = new firebase.auth.TwitterAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
  // You can use these server side with your app's credentials to access the Twitter API.
  var token = result.credential.accessToken;
  var secret = result.credential.secret;
  // The signed-in user info.
  var user = result.user;
  username = user; 
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

console.log(username);


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
            console.log(newButton.attr('class'));
        newButton.text(results);
        //append each button to the page
        $("#trends").append(newButton);
    


      }//response function end


// click to open chat room of button's topic name. needs to be edited to not be able to make multiple of the same chat room to the page. 
$(".button").on("click",function() {
$("#display").empty();



var trendNames = ($(this).attr('id').replace('#', ''));
console.log(trendNames);
chatData.off();
chatData =database.ref("/chat- " + trendNames);

    chatData.push();
var chatDiv = $("<div id='chat'></div>");
var chatMessages = $("<div id='messages'></div>");
// var chatBar = $("<div id='bar'></div>");
// var chatInput = $("<input id='input'></input>");
// var chatSend = $("<button id='send'></button>");
 
// chatBar.append(chatInput, chatSend);

var chatTitle = $("<a href= https://www.google.com/webhp?sourceid=chrome-instant&rlz=1C1CHBF_enUS730US730&ion=1&espv=2&ie=UTF-8#q=" + $(this).attr('id') + "&*</a>" + "<h3>"+ $(this).attr('id') + "</h3>");
chatDiv.append(chatMessages, chatTitle, "<hr>");
$('#display').append(chatDiv);


$("#chat-send").on('click', function(){
  if ($("#chat-input").val() !== "") {
    var message = $("#chat-input").val();
    console.log(username.displayName);
    chatData.push({
      name: username.displayName,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
    });
    $("#chat-input").val("");


  


 

 console.log("Clicked");
};


});
// if chatData -id doesn't exist...do this. else, don't:


// Update chat on screen when new message detected - ordered by 'time' value
chatData.orderByChild("time").on("child_added", function(snapshot) {
// in addition to push, the button should change the lcoation
  // If idNum is 0, then its a disconnect message and displays accordingly
  // If not - its a user chat message
  if (snapshot.val().idNum === 0) {
    $("#display").append("<p class=player" + snapshot.val().idNum + "><span>"
    + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
  }
  else {
    $("#display").append("<p class=player" + snapshot.val().idNum + "><span>"
    + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
  }

  // Keeps div scrolled to bottom on each update.
  $("#display").scrollTop($("#display")[0].scrollHeight);
});

$("#chat-input").keypress(function(e) {

  if (e.keyCode === 13 && $("#chat-input").val() !== "") {

    var message = $("#chat-input").val();

    chatData.push({
      name: username.displayName,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
    });

    $("#chat-input").val("");
  }
});





}); //ajax end








//begin login to twitter function
      function login() {
        // Log the user in via Twitter
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider).catch(function(error) {
          console.log("Error authenticating user:", error);
        });
      }

  







});
