import React from 'react'
import inRoadImg from '../../../assets/images/in-road.svg';
import {connect} from 'react-redux';


const ProgressBar = ({percentageTimePassed}) => {
    return (
        <div className='pools-box-progress required-changes'>
            <p className='in-road' style={{['text-align']: percentageTimePassed > 50 ? 'left' : 'right'}} >In road: {percentageTimePassed}%</p>
            <div className='progress-bar' >
                <img src={inRoadImg} alt='In Road' style={{ left: `calc(${percentageTimePassed}% - 37px)` }} />
                <div className='progress-bar-fill' style={{ width: percentageTimePassed+'%' }}></div>
            </div>
        </div>
    )
}
const mapStateToProps = (state, {poolType}) => ({
    percentageTimePassed: state[poolType].percentageTimePassed,
    
})

export default connect(mapStateToProps)(ProgressBar)
