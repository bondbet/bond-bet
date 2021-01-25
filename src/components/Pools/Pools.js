import React, {useEffect, useState, useContext} from 'react'
import AppContext from '../../ContextAPI';
import RewardPool from './RewardPool/RewardPool';

const Pools = () => {
    const { setNewTime, prizePeriodEnds, prizePeriodStartedAt, prizePoolRemainingSeconds} = useContext(AppContext);
    const [countdown, setCountdown] = useState({
        days: 3,
        hours: 3,
        minutes:3 ,
        seconds: 3,
    });
	const [percentageTimePassed, setPercentageTimePassed] = useState();

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

    return (
        <div className='lottery-pools-container'>
            <h1 className='title'>Lottery Pools</h1>
            <div className='lottery-pools-section'>
                <RewardPool percentageTimePassed={percentageTimePassed} countdown={countdown} />
            </div>
        </div>
    )
}

export default Pools;