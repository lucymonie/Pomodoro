var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var timerFace = document.getElementById("timer");
var type = document.getElementById("type");
var reduceSession = document.getElementById("work-minus");
var increaseSession = document.getElementById("work-plus");
var countMinutes = 25;
var countSeconds = 60;
var isPaused = true;
var firstTap = true;
var session = true;


  timerFace.addEventListener('click', function(e) {
    e.preventDefault();
    if(isPaused) {
      isPaused = false; 
    }
  });

  setInterval(function() {
    if(!isPaused) {
      if(firstTap) {
          minutesDec();
          firstTap = false;
        }
      countSeconds--;
      if(countSeconds < 60 && countSeconds > 9) {
        seconds.innerHTML = countSeconds;
      } else if (countSeconds <= 9 && countSeconds > 0) {
        seconds.innerHTML = '0' + countSeconds;
      } else if (countSeconds === 0) {
        minutesDec();
        seconds.innerHTML = '00';        
        countSeconds = 60;      
      }
    }      
  }, 1000);

  var minutesDec = function() {
    countMinutes--;
    if(countMinutes < 60 && countMinutes > 0)
      minutes.innerHTML = countMinutes;
    else if(countMinutes === 0) {
      minutes.innerHTML = '';
    } else if(countMinutes === -1) {
      countMinutes = workMins;
    }
  }