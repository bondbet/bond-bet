import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom';
import PoolBoxHeader from '../Components/PoolBoxHeader';
import PoolBoxContent from '../Components/PoolBoxContent';
import AppContext from '../../../ContextAPI';

const RewardPool = ({percentageTimePassed, countdown}) => {
    const { setOpenModal, setModalType, setPoolType } = useContext(AppContext);
    const history = useHistory();

    const PLACEHOLDER_BONDS = 13.48;

    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Community Reward Pool' />
            <div className='pools-box-content'>
                <PoolBoxContent
                    title='Community Reward Pool'
                    bonds={`${PLACEHOLDER_BONDS} bond`}
                    percentageTimePassed={percentageTimePassed}
                    countdown={countdown}
                />

                <div className='pools-box-buttons'>
                    <button onClick={() => { setOpenModal(true); setModalType('GT'); setPoolType('RP') }}>Get Tickets</button>
                    <button onClick={() => history.push('/community-reward-pool/details')}>Pool Details</button>
                </div>
            </div>
        </div>
    )
}

export default RewardPool
