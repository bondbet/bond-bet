import React from 'react'
import Countdown from './Countdown';
import ProgressBar from './ProgressBar';

const RewardPool = ({percentageTimePassed, countdown}) => {
    return (
        <div className='pools-box'>

            <div className='pools-box-header'>
                <div className='pools-box-header-text-left-lines'>
                    <div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
                <div className='pools-box-header-text'>Community Reward Pool</div>
                <div className='pools-box-header-text-right-lines'>
                    <div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
            </div>

            <div className='pools-box-content'>
                <div className='pools-box-inner'>
                    <h1 className='pools-box-inner-title'>Community Reward Pool</h1>

                    <div className='pools-box-screen'>
                        <div className='pools-box-screen-inner'>
                            13.48 bond
                        </div>
                    </div>
                    <ProgressBar percentageTimePassed={percentageTimePassed} />
                    <Countdown countdown={countdown} />
                </div>

                <div className='pools-box-buttons'>
                    <button>Get Tickets</button>
                    <button>Pool Details</button>
                </div>
            </div>
        </div>
    )
}

export default RewardPool
