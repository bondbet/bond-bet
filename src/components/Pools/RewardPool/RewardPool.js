import React from 'react'
import { useHistory } from 'react-router-dom';
import PoolBoxHeader from '../Components/PoolBoxHeader';
import PoolBoxContent from '../Components/PoolBoxContent';

const RewardPool = ({ percentageTimePassed, countdown }) => {
    const history = useHistory();

    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Community Reward Pool' />
            <div className='pools-box-content'>
                <PoolBoxContent
                    title='Community Reward Pool'
                    bonds='13.48 bond'
                    percentageTimePassed={percentageTimePassed}
                    countdown={countdown}
                />

                <div className='pools-box-buttons'>
                    <button>Get Tickets</button>
                    <button onClick={() => history.push('/community-reward-pool/details')}>Pool Details</button>
                </div>
            </div>
        </div>
    )
}

export default RewardPool
