import React from 'react'
import onlyLogo from '../../../assets/images/onlyLogo.svg';
import Countdown from './Countdown';
import ProgressBar from './ProgressBar';
import {connect} from 'react-redux';


const PoolBoxContent = ({title, bonds, poolType}) => {

    return (
        <div className='pools-box-inner'>
            <h1 className='pools-box-inner-title'>
                <img src={onlyLogo} alt={title} /> {title}
            </h1>

            <div className='pools-box-screen'>
                <div className='pools-box-screen-inner'>{bonds}</div>
            </div>
            <ProgressBar poolType={poolType}/>
            <Countdown poolType={poolType}/>
        </div>
    )
}

const mapStateToProps = ({percentageTimePassed}) => ({
    percentageTimePassed
})

export default connect(mapStateToProps)(PoolBoxContent)
