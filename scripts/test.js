const getTime = (seconds) =>{
    let mins = '';
    let hour = '';
    let day = '';
    let month = '';
    let sec = seconds + "seconds ago";
   if (seconds> 60){
    mins = seconds / 60 + "mins"
   }
  if(mins/60 > 1){
     hour = (mins / 60) + "hours";
  }
  if(hour / 24 > 1) {
     day = (hour/ 24) + "days";
  }
  if(day / 30 > 1){
     month = (day / 30) + "months";
  }

  console.log( month + day + hour + mins + sec);
};

getTime(100)