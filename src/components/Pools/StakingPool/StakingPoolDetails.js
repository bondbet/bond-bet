import React, {useEffect, useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import onlyLogo from '../../../assets/images/onlyLogo.png';
import arrowToRight from '../../../assets/images/arrowToRight.png';
import Countdown from '../Components/Countdown';
import ProgressBar from '../Components/ProgressBar';
import PoolBoxHeader from '../Components/PoolBoxHeader';
import AboutPool from '../Components/AboutPool';
import PoolBoxStats from '../Components/PoolBoxStats';
import AppContext from '../../../ContextAPI';

const StakingPoolDetails = () => {
    const { setNewTime, dateEnd } = useContext(AppContext);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [percentageTimePassed, setPercentageTimePassed] = useState();
    const dateStart = new Date("12/23/2020 11:50:00").getTime()
    useEffect(() => {
        const interval = setInterval(() => {
            setNewTime(setCountdown);
        }, 1000);

        if (percentageTimePassed >= 100) {
            clearInterval(interval);
        } else {
            setPercentageTimePassed(Math.floor(((new Date().getTime() - dateStart) / (dateEnd - dateStart)) * 100));
        }


        return () => {
            clearInterval(interval);
        };
    }, [countdown, percentageTimePassed]);

    
    return (
        <div className='reward-pool-details-section'>
            <h1 className='reward-pool-details-title'>
                <img src={onlyLogo} alt='DAO Staking Pool' /> DAO Staking Pool
            </h1>
            <div className='breadcrumbs'>
                <Link to='/'>Lottery Pools</Link>
                <img src={arrowToRight} alt='Right Arrow' />
                <label>DAO Staking Pool</label>
            </div>

            <div className='pools-box-container'>
                <div className='pools-box'>
                    <PoolBoxHeader title='Current Week Prize' />
                    <div className='pools-box-content required-changes'>
                        <div className='pools-box-inner required-changes'>
                            <h1 className='pools-box-inner-title required-changes'>Current Week Prize</h1>
                            <div className='pools-box-screen required-changes'>
                                <div className='pools-box-screen-inner'>
                                    13.48 bond
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pools-box'>
                    <PoolBoxHeader title='Time Left' />
                    <div className='pools-box-content required-changes'>
                        <div className='pools-box-inner required-changes'>
                            <h1 className='pools-box-inner-title required-changes'>Time Left</h1>

                            <ProgressBar percentageTimePassed={percentageTimePassed} />
                            <Countdown countdown={countdown} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='pools-box required-changes'>
                <PoolBoxHeader title='DAO Staking Pool' />
                <PoolBoxStats
                    winners={'3'}
                    players={'3.045'}
                    totalTickets={'1.342.045'}
                />
            </div>

            <div className='pools-box'>
                <PoolBoxHeader title='About the Pool' />
                <AboutPool
                    title='About the Pool'
                    description='The DAO Staking Pool is set up by BOND founders and the weekly prize in this pool is provided from BOND Community Rewards.'
                    more='Each week the protocol randomly chooses one winner who gets all the sum of the prize. The staked amount of BOND tokens can be withdrawn at any time without any time lockups.'
                />
            </div>
        </div>
    )
}

export default StakingPoolDetails
