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
          var firstTrainTime = moment(trainTime, "HH:mm").subtract(1, "years");
          console.log("firstTrainTime:" + firstTrainTime);
          
            //Current Time
            var currentTime = moment();
            console.log("current time: " + currentTime);

            //Difference between times
            var diffTime = moment().diff(moment(firstTrainTime), "minutes");
            console.log("difference: " + diffTime);

            //time apart
            var tRemainder = diffTime % frequency;
            console.log(tRemainder);

            //Minutes until train
            var tMinutesTillTrain = frequency - tRemainder;
            console.log("minutes until train:" + tMinutesTillTrain);

            //Next Train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            var nextTrainConverted = moment(nextTrain).format("hh:mm");
            console.log("arrival time: " + moment(nextTrain).format("hh:mm"));


          
          //Temporary objects for holding train information
          var newTrain = {
              name: trainName,
              goingTo: destination,
              frequency: frequency,
              nextTrainConverted: nextTrainConverted,
              tMinutesTillTrain: tMinutesTillTrain
            };
            
            //Uploads train to database
            database.ref().push(newTrain);
            console.log(newTrain);

            //Clears new train input boxes
            $("#trainName-input").val("");
            $("#destination-input").val("");
            $("#trainTime-input").val("");
            $("#frequency-input").val("");

            return false;
        });

        //Firebase event for adding the new train to the database
        database.ref().on("child_added", function(childSnapshot) {
            console.log(childSnapshot.val());

            //Store everything into a variable
            var trainName = childSnapshot.val().name;
            var destination = childSnapshot.val().goingTo;
            var nextTrainConverted = childSnapshot.val().nextTrainConverted;
            var tMinutesTillTrain = childSnapshot.val().tMinutesTillTrain;
            var frequency = childSnapshot.val().frequency;

            //appending table
            var newRow = $("<tr>").append(
                $("<td>").text(trainName),
                $("<td>").text(destination),
                $("<td>").text(frequency),
                $("<td>").text(nextTrainConverted),
                $("<td>").text(tMinutesTillTrain),
            );

            $("#train-table > tbody").append(newRow);

        })



});