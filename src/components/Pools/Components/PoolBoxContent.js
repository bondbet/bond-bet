import React, { useContext } from 'react'
import onlyLogo from '../../../assets/images/onlyLogo.svg';
import AppContext from '../../../ContextAPI';
import Countdown from './Countdown';
import ProgressBar from './ProgressBar';

const PoolBoxContent = ({title, bonds}) => {
    const { percentageTimePassed} = useContext(AppContext);

    return (
        <div className='pools-box-inner'>
            <h1 className='pools-box-inner-title'>
                <img src={onlyLogo} alt={title} /> {title}
            </h1>

            <div className='pools-box-screen'>
                <div className='pools-box-screen-inner'>{bonds}</div>
            </div>
            <ProgressBar percentageTimePassed={percentageTimePassed} />
            <Countdown />
        </div>
    )
}

export default PoolBoxContent
