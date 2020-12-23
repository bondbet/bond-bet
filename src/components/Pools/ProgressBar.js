import React from 'react'
import inRoadImg from '../../assets/images/in-road.png';

const ProgressBar = ({percentageTimePassed}) => {

    return (
        <div className='pools-box-progress'>
            <p className='in-road'>In road: {percentageTimePassed}%</p>
            <div className='progress-bar'>
                <img src={inRoadImg} alt='In Road' style={{ left: `calc(${percentageTimePassed}% - 37px)` }} />
                <div className='progress-bar-fill' style={{ width: percentageTimePassed+'%' }}></div>
            </div>
        </div>
    )
}

export default ProgressBar
