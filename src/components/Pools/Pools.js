import React, {useEffect, useState, useContext} from 'react'
import AppContext from '../../ContextAPI';
import RewardPool from './RewardPool/RewardPool';
// import StakingPool from './StakingPool/StakingPool';

const Pools = () => {
    const { setNewTime, dateEnd, dateStart } = useContext(AppContext);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
	const [percentageTimePassed, setPercentageTimePassed] = useState();

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
    }, [countdown, percentageTimePassed, dateStart, dateEnd, setNewTime]);

    return (
        <div className='lottery-pools-container'>
            <h1 className='title'>Lottery Pools</h1>
            <div className='lottery-pools-section'>
                <RewardPool percentageTimePassed={percentageTimePassed} countdown={countdown} />
                {/* <StakingPool percentageTimePassed={percentageTimePassed} countdown={countdown} /> */}
            </div>
        </div>
    )
}

export default Pools;