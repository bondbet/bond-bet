import React, {useEffect, useState} from 'react'
import RewardPool from './RewardPool/RewardPool';
import StakingPool from './StakingPool/StakingPool';

const Pools = ({setNewTime, dateEnd}) => {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
	const [percentageTimePassed, setPercentageTimePassed] = useState();
    const dateStart = new Date("12/23/2020 11:50:00").getTime();
    useEffect(() => {
        const interval = setInterval(() => {
            setNewTime(setCountdown);
        }, 1000);

        if (percentageTimePassed >= 100) {
            clearInterval(interval);
        }

        setPercentageTimePassed(Math.floor(((new Date().getTime() - dateStart) / (dateEnd - dateStart)) * 100));

        return () => {
            clearInterval(interval);
        };
    }, [countdown, percentageTimePassed]);

    return (
        <div className='lottery-pools-container'>
            <h1 className='title'>Lottery Pools</h1>
            <div className='lottery-pools-section'>
                <RewardPool percentageTimePassed={percentageTimePassed} countdown={countdown} />
                <StakingPool percentageTimePassed={percentageTimePassed} countdown={countdown} />
            </div>
        </div>
    )
}

export default Pools;