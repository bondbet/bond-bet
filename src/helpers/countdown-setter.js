import { getUtcTimestamp } from "./date";

export const setNewTime = (setCountdown, prizePeriodEnds) => { 
    if(prizePeriodEnds) {
        const currentTime = getUtcTimestamp();
        const countdownDate = prizePeriodEnds.toNumber();
    
       
        let distanceToDateInMilliseconds = (countdownDate - currentTime) * 1000;
    
        let daysLeft = Math.floor(distanceToDateInMilliseconds / (1000 * 60 * 60 * 24));
        let hoursLeft = Math.floor((distanceToDateInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutesLeft = Math.floor((distanceToDateInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        let secondsLeft = Math.floor((distanceToDateInMilliseconds % (1000 * 60)) / 1000);
    

        setCountdown({
            days: daysLeft > 0 ? daysLeft : 0,
            hours: hoursLeft > 0 ? hoursLeft : 0,
            minutes: minutesLeft > 0 ? minutesLeft : 0,
            seconds: secondsLeft > 0 ? secondsLeft : 0,
        });
    
    }


};