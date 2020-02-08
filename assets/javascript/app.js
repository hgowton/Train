$(document).ready(function() {

    var firebaseConfig = {
        apiKey: "AIzaSyDwM_amJwRmdfKu2cezanMqbjuvJXGTc4w",
        authDomain: "bootcamp-first-attempt.firebaseapp.com",
        databaseURL: "https://bootcamp-first-attempt.firebaseio.com",
        projectId: "bootcamp-first-attempt",
        storageBucket: "bootcamp-first-attempt.appspot.com",
        messagingSenderId: "1002927761886",
        appId: "1:1002927761886:web:f25488293b98c8eadc954f"
      };

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      var database = firebase.database();

      //Add Train
      $("#add-train-btn").on("click", function(event) {
          event.preventDefault();

          //Takes in user input
          var trainName = $("#trainName-input").val().trim();
          var destination = $("#destination-input").val().trim();
          var trainTime = $("#trainTime-input").val().trim();
          var frequency = $("#frequency-input").val().trim();
          
          //Temporary objects for holding train information
          var newTrain = {
              name: trainName,
              goingTo: destination,
              startTime: trainTime,
              frequency: frequency
            };
            
            //Uploads train to database
            database.ref().push(newTrain);
            console.log(newTrain);
        });



});