import React, {useEffect, useState, useContext} from 'react'
import AppContext from '../../ContextAPI';



const CountdownPercantageUpdater = () => {

    const { setNewTime, prizePeriodEnds, prizePeriodStartedAt, prizePoolRemainingSeconds, countdown, setCountdown, percentageTimePassed, setPercentageTimePassed} = useContext(AppContext);


    useEffect(() => {
        if(prizePeriodEnds && prizePeriodStartedAt && prizePoolRemainingSeconds && prizePeriodEnds.gt(0) && prizePeriodStartedAt.gt(0)) {
            const interval = setInterval(() => {
                  setNewTime(setCountdown);
            }, 1000);
    
            if (percentageTimePassed >= 100) {
                clearInterval(interval);
            } 

            const totalSeconds = prizePeriodEnds.sub(prizePeriodStartedAt)
            const secondsPassed = totalSeconds.sub(prizePoolRemainingSeconds);
        
            setPercentageTimePassed(
                Math.floor(secondsPassed.toNumber() / totalSeconds.toNumber() * 100)
            );
    
            return () => {
                clearInterval(interval);
            };
        }
        
    }, [countdown, percentageTimePassed, prizePeriodStartedAt, prizePeriodEnds, setNewTime]);

    return (null)
};
export default CountdownPercantageUpdater;