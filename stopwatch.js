$(function() {
  //variables
      var mode = 0; //App mode
      var timeCounter = 0; //time counter
      var lapCounter = 0; //lap counter
      var action; //variable for setInterval
      var lapNumber = 0; //number of laps
      
      //minutes, seconds, and centiseconds for time and lap
      var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;

  //On App load show start and lap buttons
      hideshowButtons("#startButton", "#lapButton");

  //Click on startButton
  $("#startButton").click(function() {
        mode = 1;
        hideshowButtons("#stopButton", "#lapButton");
        startAction();
  })
      //mode on
      //show stop and lap buttons
      //start counter

  //click on stopButton
      //show resume and reset buttons
      //stop counter
  $("#stopButton").click(function() {
        hideshowButtons("#resumeButton", "#resetButton");
        clearInterval(action);
  });

  //click on resumeButton
      //show resume and reset buttons
      //start action
  $("#resumeButton").click(function() {
        hideshowButtons("#stopButton", "#lapButton");
        startAction();
  });


  //click on resetButton
      //reload the page
  $("#resetButton").click(function() {
       location.reload();
  });

  //click on lapButton
      //if mode is ON
          //stop action
          //resetLap and print lap details
          //start action
  $("#lapButton").click(function() {
    if(mode) {
         clearInterval(action);
      lapCounter = 0;
      addLap();
      startAction();
    }
  });

  //functions
  // hideshowButtons function shows two buttons
  function hideshowButtons(x, y) {
        $(".control").hide();
        $(x).show();
        $(y).show();
  }

  //start the counter
  function startAction() {
        action = setInterval(function() {
            timeCounter++;
            if(timeCounter == 100*60*100) {
                  timeCounter = 0;
            }
            lapCounter++;
            if(lapCounter == 100*60*100) {
                  lapCounter = 0;
            }
            updateTime();
        }, 10);

  }

  //updateTime; converts counters to mins, secs, centisecs
  function updateTime() {
        //1min = 60 * 100centiseconds = 6000 centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        timeSeconds = Math.floor((timeCounter%6000)/100); //1sec=100centiseconds
        timeCentiseconds = (timeCounter%6000)%100;
              $("#timeminute").text(format(timeMinutes));
              $("#timesecond").text(format(timeSeconds));
              $("#timecentisecond").text(format(timeCentiseconds));


        lapMinutes = Math.floor(lapCounter/6000);
        lapSeconds = Math.floor((lapCounter%6000)/100); //1sec=100centiseconds
        lapCentiseconds = (lapCounter%6000)%100;
              $("#lapminute").text(format(lapMinutes));
              $("#lapsecond").text(format(lapSeconds));
              $("#lapcentisecond").text(format(lapCentiseconds));
  }

  //function to format numbers
  function format(number) {
    if(number<10) {
      return "0"+number;
    } else {
      return number;
    }
  }

  // add lap and print details inside lap box
  function addLap() {
        lapNumber++;
            var myLapDetails = 
                '<div class="lap">' +
                    '<div class= "laptimetitle">' + 'Lap' + lapNumber +
                    '</div>' +
                    '<div class="laptime">' + '<span>' + format(lapMinutes) + '</span>' +
                                  ':<span>' + format(lapSeconds) + '</span>' +
                                  ':<span>' + format(lapCentiseconds) + '</span>' +

                    '</div>'
                '</div>';
      $(myLapDetails).prependTo("#laps");
  }


});