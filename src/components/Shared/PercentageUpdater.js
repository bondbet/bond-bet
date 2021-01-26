import React, {useEffect, useState, useContext} from 'react'
import AppContext from '../../ContextAPI';



const CountdownPercantageUpdater = () => {

    const { prizePeriodEnds, prizePeriodStartedAt, prizePoolRemainingSeconds, setPercentageTimePassed} = useContext(AppContext);


    useEffect(() => {
        
        if(prizePoolRemainingSeconds && prizePeriodEnds && prizePeriodEnds.gt(0) && prizePeriodStartedAt && prizePeriodStartedAt.gt(0)) {

            const totalSeconds = prizePeriodEnds.sub(prizePeriodStartedAt)
            const secondsPassed = totalSeconds.sub(prizePoolRemainingSeconds);

            setPercentageTimePassed(
                Math.floor(secondsPassed.toNumber() / totalSeconds.toNumber() * 100)
            );
    
     
        }
        
    }, [prizePeriodEnds, prizePeriodStartedAt, prizePoolRemainingSeconds]);

    return (null)
};
export default CountdownPercantageUpdater;