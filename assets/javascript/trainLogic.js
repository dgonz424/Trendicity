/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new cruises - then update the html + update the database
// 3. Create a way to retrieve cruises from the cruise database.
// 4. Create a way to calculate the next arrival. Using difference between start and current time.
//    Then use moment.js formatting to set difference in minutes.
// 5. Calculate minutes away

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAwSr3477DtqhqGJ-fKl_FIWHI0tUYV0bc",
    authDomain: "week7homework-8c50f.firebaseapp.com",
    databaseURL: "https://week7homework-8c50f.firebaseio.com",
    storageBucket: "staging.week7homework-8c50f.appspot.com",
    messagingSenderId: "1023746180545"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// 2. Button for adding Cruises
$("#add-cruise-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var cruName = $("#cruise-name-input").val().trim();
  var cruDest = $("#destination-input").val().trim();
  var firstCruise = moment($("#start-input").val().trim(), "hh:mm").format("X");
  var cruiseFrequency = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding cruise data
  var newCru = {
    name: cruName,
    destination: cruDest,
    first: firstCruise,
    frequency: cruiseFrequency
  };

  // Uploads cruise data to the database
  database.ref().push(newCru);

  // Logs everything to console
  console.log(newCru.name);
  console.log(newCru.destination);
  console.log(newCru.start);
  console.log(newCru.rate);

  // Alert
  alert("Cruise successfully added");

  // Clears all of the text-boxes
  $("#cruise-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");

  // Prevents moving to new page
  return false;
});

// 3. Create Firebase event for adding cruise to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var cruName = childSnapshot.val().name;
  var cruDest = childSnapshot.val().destination;
  var firstCruise = childSnapshot.val().first;
  var cruiseFrequency = childSnapshot.val().frequency;

    // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    var cFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(firstTimeConverted, "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var cRemainder = diffTime % cFrequency;
    console.log(cRemainder);

    // Minutes Until Cruise
    var cMinutesTillCruise = cruiseFrequency - cRemainder;
    console.log("MINUTES TILL TRAIN: " + cMinutesTillCruise);

    // Next Cruise
    var nextCruise = moment().add(cMinutesTillCruise, "minutes");
    console.log("ARRIVAL TIME: " + nextCruise.format("hh:mm"));

  // Cruise Info
  console.log(cruName);
  console.log(cruDest);
  console.log(firstCruise);
  console.log(cruiseFrequency);

  // // Prettify the cruise start
  // var cruStartPretty = moment.unix(cruStart).format("hh:mm");

  // // Calculate the next arrival using hardcore math
  // // To calculate the next arrival
  // var cruArrival = moment().diff(moment.unix(cruStart, "X"), "minutes");
  // console.log(cruArrival);

  // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Add each train's data into the table
  $("#cruise-table > tbody").append("<tr><td>" + cruName + "</td><td>" + cruDest + "</td><td>" + cruiseFrequency + "</td><td>" + nextCruise.format("hh:mm") + "</td><td>" + cMinutesTillCruise + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
