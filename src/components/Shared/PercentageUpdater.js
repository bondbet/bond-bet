import React, {useEffect, useState, useContext} from 'react'
import AppContext from '../../ContextAPI';



const CountdownPercantageUpdater = () => {

    const { prizePeriodEnds, prizePeriodStartedAt, prizePoolRemainingSeconds, setPercentageTimePassed} = useContext(AppContext);


    useEffect(() => {
        console.log(prizePeriodEnds, prizePeriodStartedAt)
        if(prizePeriodEnds && prizePeriodEnds.gt(0) && prizePeriodStartedAt) {

            const totalSeconds = prizePeriodEnds.sub(prizePeriodStartedAt)
            const secondsPassed = totalSeconds.sub(prizePoolRemainingSeconds);
        
            setPercentageTimePassed(
                Math.floor(secondsPassed.toNumber() / totalSeconds.toNumber() * 100)
            );
    
     
        }
        
    }, [prizePeriodEnds, prizePeriodStartedAt]);

    return (null)
};
export default CountdownPercantageUpdater;