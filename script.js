var reduceSession = document.getElementById("work-minus");
var increaseSession = document.getElementById("work-plus");
var reduceBreak = document.getElementById("rest-minus");
var increaseBreak = document.getElementById("rest-plus");
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var getWorkMinutes = document.getElementById("work-time");
var getBreakMinutes = document.getElementById("rest-time");
var timerFace = document.getElementById("timer");
var type = document.getElementById("type");

var isPaused = true;
var timerInit = false;
var countSeconds = 60;
var ticker;
var closeTicker = false;
type.innerHTML = 'session';

var switchObj = {
    session : true,
    countMinutes : getWorkMinutes.innerHTML
  };

reduceSession.addEventListener('click', function(e) {
  e.preventDefault();
  if(getWorkMinutes.innerHTML >= 2 && timerInit === false) {
    getWorkMinutes.innerHTML--;
    switchObj.countMinutes = getWorkMinutes.innerHTML;
    minutes.innerHTML = switchObj.countMinutes;
  }
});

increaseSession.addEventListener('click', function(e) {
  e.preventDefault();
  if(getWorkMinutes.innerHTML <= 120 && timerInit === false) {
    getWorkMinutes.innerHTML++;
    switchObj.countMinutes = getWorkMinutes.innerHTML;
    minutes.innerHTML = switchObj.countMinutes;
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

  timerFace.addEventListener('click', function(e) {
    e.preventDefault();
    if(timerInit === false) {
      timerInit = true;
      ticker = setInterval(runSeconds, 1000);
    }
    if(isPaused) {
      isPaused = false;
    } else {
      isPaused = true;
    }
    return isPaused;
  });

  function stopTicking() {
        clearInterval(ticker);
      }

  var runSeconds = function() {
      if(!isPaused) {
        countSeconds--;
        if(countSeconds === 59) {
          minutesDec();
          seconds.innerHTML = countSeconds;
        } else if(countSeconds < 59 && countSeconds > 9) {
          seconds.innerHTML = countSeconds;
        } else if (countSeconds <= 9 && countSeconds > 0) {
          seconds.innerHTML = '0' + countSeconds;
        } else if (countSeconds === 0 && switchObj.countMinutes > 0) {
          seconds.innerHTML = '00';
          countSeconds = 60;
        } else if (countSeconds === 0 && switchObj.countMinutes === 0) {
          seconds.innerHTML = '00';
           minutesDec();
          countSeconds = 60;
        } 
      }
    }

  var minutesDec = function() {
    switchObj.countMinutes--;
    if(switchObj.countMinutes >= 0) {
      minutes.innerHTML = switchObj.countMinutes;
    } else if(switchObj.countMinutes === -1 && countSeconds === 0) {
      switchSession();
    }
  }

  var switchSession = function() {
    if(closeTicker === false) {
      closeTicker = true;
      stopTicking();
    }
    if(switchObj.session) {
        type.innerHTML = 'break time!';
        switchObj.session = false;
        switchObj.countMinutes = getBreakMinutes.innerHTML;
        clearInterval(startWork);
        var startBreak = setInterval(runSeconds, 1000);
      } else {
        type.innerHTML = 'session';
        switchObj.session = true;
        switchObj.countMinutes = getWorkMinutes.innerHTML;
        clearInterval(startBreak);
        var startWork = setInterval(runSeconds, 1000);
      }
  }