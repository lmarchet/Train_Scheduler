$(document).ready(function() {

  // Initialize Firebase - Provided by firebase webpage
  var config = {
    apiKey: "AIzaSyC3N4z4WbhhXyxD3LHvI4Ksxm_VUi_3yrY",
    authDomain: "train-scheduler-21669.firebaseapp.com",
    databaseURL: "https://train-scheduler-21669.firebaseio.com",
    projectId: "train-scheduler-21669",
    storageBucket: "",
    messagingSenderId: "1094266374433"
  };

  firebase.initializeApp(config);

  /* get a reference to the database service. To read and write data from the database,
  you need an instance of "firebase.database" */
  var database = firebase.database(); 

  // listener to click button to add a new train to the database
  $("#submitButton").on('click', function(event) { 
    event.preventDefault();
    // create variables to hold schedule information: train name, destionation, departure/arrival time and frequency of travel
    var newTrainName = $('#trainNewName').val().trim();
    var newTrainDest = $('#newDestination').val().trim();
    var newTrainTime = $('#newTime').val().trim();
    var newTrainFreq = $('#newFrequency').val().trim();

    // transfer train schedule data to firebase. set() overwrite dat 
    database.ref().push({
      train_name: newTrainName,
      train_dest: newTrainDest,
      train_time: newTrainTime,
      train_freq: newTrainFreq
    });

    // console log the new train information
    console.log("New train information");
    console.log(newTrainName);
    console.log(newTrainDest);
    console.log(newTrainTime);
    console.log(newTrainFreq);

    $('#trainForm')[0].reset(); // clean the form
  });

  // get a snapshot of the stored data.
  // This function allows you to update your page in real-time when the firebase database changes.

  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());

    // Store everything into a variable
    var currentTrainName = snapshot.val().train_name;
    var currentTrainDest = snapshot.val().train_dest;
    var currentTrainTime = snapshot.val().train_time;
    var currentTrainFreq = snapshot.val().train_freq;

    console.log(currentTrainName);
    console.log(currentTrainDest);
    console.log(currentTrainTime);
    console.log(currentTrainFreq);

    // Add each train's data into the table
    $("#trainInfo > tbody").append("<tr><td>" + currentTrainName + "</td><td>" +currentTrainDest + "</td><td>" +  "</td></tr>");

  });



  // calculate when the next train will arrive; this should be relative to the current time.


}); // end of DOM