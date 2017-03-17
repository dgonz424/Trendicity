



// Initialize Firebase
 var config = {
   apiKey: "AIzaSyA4ZMBx8F2AEszwQk4M-GiGaOnjP6QMBsY",
   authDomain: "firechat-test-fde48.firebaseapp.com",
   databaseURL: "https://firechat-test-fde48.firebaseio.com",
   storageBucket: "firechat-test-fde48.appspot.com",
   messagingSenderId: "423047939499"
 };
 firebase.initializeApp(config);



// object used to make the api request
    
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


// global variables for the chat object, chatData. Username becomes the twitter username below. 
var chatData = database.ref("/chat");
var username = "";
var message = "";



// save the firebase twitter auth as a variable, set up so it pops up on page load. 
  

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



//ajax call to the twitter API for getting the trending topics. We got 10.  
$.ajax(settings).done(function (response) {
  console.log(response);
      for (var i = 0; i < 10; i++) {
        //storing results from API response in a variable, results.
          var results = response[0].trends[i].name;
          console.log(results);

        //generate a button for each trend name
        var newButton = $("<button class='button'>");
        //add an id equal to the trend's name. 
        newButton.attr("id", results);
        //add each trend name as text inside the button
        newButton.text(results);
         
            console.log(newButton.attr('id'));
            console.log(newButton.attr('class'));
        //append each button to the page in the trends div. 
        $("#trends").append(newButton);
    


      }// end of for loop that makes buttons. 


// click any button to open chat room of button's topic name. 
$(".button").on("click",function() {

// empty the display div of any previous chat. 
 $("#display").empty();


// save the trend name as a string without any non-alphanumeric characters.
var trendNames = ($(this).attr('id').replace('#', ''));
console.log(trendNames);
// turn off the listener to get only one of each message to appear in the display div.  
chatData.off();
// give the global variable a name equal to its id, without the "#" which firebase won't accept. 
chatData =database.ref("/chat- " + trendNames);
// send it to firebase.
    chatData.push();
// make a chat div and a messages div, where the messages retrieved will be displayed.  
var chatDiv = $("<div id='chat'></div>");
var chatMessages = $("<div id='messages'></div>");

// give the chat box a title equal to its 'id', and hyperlink it so users can easily lookup the trend on google.
var chatTitle = $("<a href= https://www.google.com/webhp?sourceid=chrome-instant&rlz=1C1CHBF_enUS730US730&ion=1&espv=2&ie=UTF-8#q=" + $(this).attr('id') + "&*</a>" + "<h3>"+ $(this).attr('id') + "</h3>");

// append elements to chat div, then display on page.   
 chatDiv.append(chatMessages, chatTitle, "<hr>");
$('#display').append(chatDiv);

// click listener for the send button. Pushes message and username and timestamp to firebase. Username is equal to the twitter displayName of the user retrieved during authentication.
$("#chat-send").on('click', function(){
  if ($("#chat-input").val() !== "") {
    var message = $("#chat-input").val();
    console.log(username.displayName);
    chatData.push({
      name: username.displayName,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
    });
   
   // reset the chat input field to be empty. 
    $("#chat-input").val("");


  


 

 console.log("Clicked");
};


});


// Update chat on screen when new message detected - ordered by 'time' value. Displays the info sent to the database to the page.
// Since this is in the send button function the display only appears when a user presses send. 
chatData.orderByChild("time").on("child_added", function(snapshot) {
  
    $("#display").append("<p class=player" + "><span>"
    + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
 

  // Keeps div scrolled to bottom on each update.
  $("#display").scrollTop($("#display")[0].scrollHeight);
});

 
 // makes it so users can submit their messages with a press of enter key. 
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