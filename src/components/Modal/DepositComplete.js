import React, {useContext, useState, useEffect} from 'react';
import AppContext from '../../ContextAPI';
import Countdown from '../Pools/Components/Countdown';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import { ethers } from 'ethers';

const DepositComplete = () => {
    const { ticketsBalance, setNewTime, dateEnd, dateStart, setModalType } = useContext(AppContext);
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
        
        
        setPercentageTimePassed(Math.floor(((new Date().getTime() - dateStart) / (dateEnd - dateStart)) * 100));
        
        if (percentageTimePassed >= 100) {
            clearInterval(interval);
            setModalType('PA');
        }

        return () => {
            clearInterval(interval);
        };
    }, [countdown, percentageTimePassed, dateStart, dateEnd, setNewTime, setModalType]);

    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Deposit Complete' />
            <div className='box-content'>
                <div className='box-inner'>
                    <h1 className='modal-title'>Deposit Complete</h1>
                   {ticketsBalance ? <h4 className='modal-description'>You got total of {ethers.utils.formatEther(ticketsBalance)} tickets</h4> : null}
                    <p className='prize-will-be-awarded-in'>The prize will be awarded in:</p>
                    <Countdown countdown={countdown} />
                </div>
            </div>
        </div>
    )
}

export default DepositComplete
