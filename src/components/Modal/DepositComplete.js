import React, {useContext, useState, useEffect} from 'react'
import AppContext from '../../ContextAPI';
import Countdown from '../Pools/Components/Countdown';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import validator from 'validator';

const DepositComplete = () => {
    const { ticketAmountRP, ticketAmountSP, poolType, setNewTime, dateEnd, dateStart, setModalType } = useContext(AppContext);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [percentageTimePassed, setPercentageTimePassed] = useState();
    const [email, setEmail] = useState('');
    
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

    const checkEmail = () => {
        if (!validator.isEmail(email)) {
            alert("Incorrect email format!")
        }
    };

    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Deposit Complete' />
            <div className='box-content'>
                <div className='box-inner'>
                    <h1 className='modal-title'>Deposit Complete</h1>
                    <h4 className='modal-description'>You got {poolType === 'RP' ? ticketAmountRP : ticketAmountSP} tickets</h4>
                    <p className='prize-will-be-awarded-in'>The prize will be awarded in:</p>
                    <Countdown countdown={countdown} />
                </div>
                <div className='get-notified'>
                    <div className='get-notified-label'>Get notified about the winner by email</div>
                    <div className='get-notified-field'>
                        <input type='text' placeholder='Enter your email adress' onChange={(e) => setEmail(e.target.value)} value={email} />
                        <button onClick={checkEmail}>Get notified</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepositComplete
