import React, {useContext} from 'react'
import PoolBoxHeader from '../Components/PoolBoxHeader';
import PoolBoxContent from '../Components/PoolBoxContent';
import { useHistory } from 'react-router-dom';
import AppContext from '../../../ContextAPI';

const StakingPool = ({ percentageTimePassed, countdown }) => {
    const { setOpenModal, setModalType, setPoolType } = useContext(AppContext);
    const history = useHistory();

    return (
        <div className='pools-box'>
            <PoolBoxHeader title='DAO Staking Pool' />
            <div className='pools-box-content'>
                <PoolBoxContent
                    title='DAO Staking Pool'
                    bonds='13.48 bond'
                    percentageTimePassed={percentageTimePassed}
                    countdown={countdown}
                />

                <div className='pools-box-buttons'>
                    <button onClick={() => { setOpenModal(true); setModalType('GT'); setPoolType('SP') }}>Get Tickets</button>
                    <button onClick={() => history.push('/dao-staking-pool/details')}>Pool Details</button>
                </div>
            </div>
        </div>
    )
}

export default StakingPool
