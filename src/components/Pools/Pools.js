import React, {useState, useEffect} from 'react'
import RewardPool from './RewardPool';
import StakingPool from './StakingPool';

const Pools = () => {

    const dateStart = new Date("12/23/2020 11:50:00").getTime(),
        dateEnd = new Date("01/30/2021 12:00:00").getTime();
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [distanceToDate, setDistanceToDate] = useState();
    const [percentageTimePassed, setPercentageTimePassed] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
            setNewTime();
        }, 1000);

        if (percentageTimePassed >= 100) {
            clearInterval(interval);
        }

        setPercentageTimePassed(Math.floor(((new Date().getTime() - dateStart) / (dateEnd - dateStart)) * 100));

        return () => {
            clearInterval(interval);
        };
    }, [countdown, percentageTimePassed]);

    const setNewTime = () => {
        const currentTime = new Date().getTime();
        const countdownDate = dateEnd;

        setDistanceToDate(countdownDate - currentTime);

        let daysLeft = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
        let hoursLeft = Math.floor((distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutesLeft = Math.floor((distanceToDate % (1000 * 60 * 60)) / (1000 * 60));
        let secondsLeft = Math.floor((distanceToDate % (1000 * 60)) / 1000);

        setCountdown({
            days: daysLeft,
            hours: hoursLeft,
            minutes: minutesLeft,
            seconds: secondsLeft,
        });
    };

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