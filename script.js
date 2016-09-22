// get elements to reduce or increase the length of the session
var reduceSession = document.getElementById("work-minus");
var increaseSession = document.getElementById("work-plus");

// get elements to reduce or increase the length of the break
var reduceBreak = document.getElementById("rest-minus");
var increaseBreak = document.getElementById("rest-plus");

// get elements for timer minutes and seconds
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
// get elements for session and break time
var getWorkMinutes = document.getElementById("work-time");
var getBreakMinutes = document.getElementById("rest-time");

// get whole timer face element so we can click on it to stop and start timer
var timerFace = document.getElementById("timer");

// get element that says whether it's a session or a break
var type = document.getElementById("type");

// sets the var countMinutes to match the innerHTML of the getWorkMinutes var
var countMinutes = getWorkMinutes.innerHTML;

// initial settings for seconds counter, paude button and session/break
var countSeconds = 60;
var isPaused = true;
var session = true;
var timerInit = false;

reduceSession.addEventListener('click', function(e) {
  e.preventDefault();
  if(getWorkMinutes.innerHTML >= 2 && timerInit === false) {
    getWorkMinutes.innerHTML--;
    countMinutes = getWorkMinutes.innerHTML;
    minutes.innerHTML = countMinutes;
  }
});

increaseSession.addEventListener('click', function(e) {
  e.preventDefault();
  if(getWorkMinutes.innerHTML <= 120 && timerInit === false) {
    getWorkMinutes.innerHTML++;
    countMinutes = getWorkMinutes.innerHTML;
    minutes.innerHTML = countMinutes;
  }
});

reduceBreak.addEventListener('click', function(e) {
  e.preventDefault();
  if(getBreakMinutes.innerHTML >= 2 && timerInit === false) {
    getBreakMinutes.innerHTML--;
  }
});

increaseBreak.addEventListener('click', function(e) {
  e.preventDefault();
  if(getBreakMinutes.innerHTML <= 120 && timerInit === false) {
    getBreakMinutes.innerHTML++;
  }
});


//on click or tap timer turns on or off
  timerFace.addEventListener('click', function(e) {
    e.preventDefault();
    //if it's paused, a tap starts the ticking again
    if(timerInit === false) timerInit = true;
    if(isPaused) {
      isPaused = false; 
    //if it's going, a tap stops it
    } else {
      isPaused = true;
    }
  });

  var minutesDec = function() {
    //decrement countMinutes variable
    countMinutes--;
    //determine appearance of minutes in the browswer
    if(countMinutes > 0) {
      minutes.innerHTML = countMinutes;
    } else if(countMinutes === 0) {
      minutes.innerHTML = '0';
    } else if(countMinutes === -1) {
      //switch between session and break
      if(session) {
        type.innerHTML = 'break time!';
        session = false;
        countMinutes = getBreakMinutes.innerHTML;
      } else {
        type.innerHTML = 'session';
        session = true;
        countMinutes = getWorkMinutes.innerHTML;
      }
    } else if(countSeconds===59) {
      minutesDec();
    }
  }

  //once isPaused is set to false, this runs its callback every second
    setInterval(function() {
    //if pause is set to false, the following code will run
      if(!isPaused) {
      //the countSeconds var decrements by 1 every second
        countSeconds--;
      //the following code determines how the counter is output to the browser
        if(countSeconds === 59) {
        //when the counter is at 59, the minutes decrementer function is called
          minutesDec();
          seconds.innerHTML = countSeconds;
        } else if(countSeconds < 59 && countSeconds > 9) {
          seconds.innerHTML = countSeconds;
        } else if (countSeconds <= 9 && countSeconds > 0) {
          seconds.innerHTML = '0' + countSeconds;
        } else if (countSeconds === 0 && countMinutes >= -1) {
          seconds.innerHTML = '00';
          countSeconds = 60;
          minutesDec();
        }
      } 
    }, 1000);