// const getTime = (seconds) =>{
//     let mins, hour, day, month, year, time;

// if(seconds / 60 >= 1){
//     mins = Math.floor(seconds/60);
//     time = `${mins}mins ${seconds % 60}sec ago`;
// }
// if(mins / 60 >= 1){
//     hour = Math.floor(mins/60);
//     time = `${hour}hour ${mins%60}min ago`;
// }
// if(hour / 24 >= 1){
//     day = Math.floor(hour/24);
//     time = `${day}d ${hour % 24}h ago`;
// }
// if(day/30 >= 1){
//     month = Math.floor(day/30);
//     time = `${month}m ${day%24}d ago`;
// }
// if(month/12 >= 1){
//     year = Math.floor(month/12);
//     time = `${year}y ${month%12}m ago`;
// }
// if(seconds < 60){
//     time = `${seconds}seconds ago`;
// }
// console.log(time);
// };


// getTime(60)

const getTime = (seconds)=>{
    const units = [
        {label:'y', seconds:60*60*24*365},
        {label:'m', seconds:60*60*24*30},
        {label:'d', seconds:60*60*24},
        {label:'h', seconds:60*60},
        {label:'min', seconds:60},
        {label:'sec', seconds:1}
    ];
    let remaining = seconds;
    let result = [];
    for(const unit of units){
        const count = Math.floor(remaining / unit.seconds);
        if(count > 0){
            result.push(count + unit.label);
            remaining %= unit.seconds; 
        }
        if(result.length === 2) break;
    }
    return time = result.join(" ") + " ago";
};