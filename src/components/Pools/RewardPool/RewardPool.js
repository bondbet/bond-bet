import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom';
import PoolBoxHeader from '../Components/PoolBoxHeader';
import PoolBoxContent from '../Components/PoolBoxContent';
import AppContext from '../../../ContextAPI';
import * as ethers from 'ethers';

const RewardPool = () => {
    const { setOpenModal, setModalType, connected, connectWalletHandler , totalTicketAmount, countdown, percentageTimePassed} = useContext(AppContext);
    const history = useHistory();

    return (
        
            <div className='pools-box'>
                <PoolBoxHeader title='Community Reward Pool' />
                <div className='pools-box-content'>
                    <PoolBoxContent
                        title='Community Reward Pool'
                        bonds={`${ethers.utils.formatEther(totalTicketAmount)} bond`}
                        percentageTimePassed={percentageTimePassed}
                        countdown={countdown}
                    />

                    <div className='pools-box-buttons'>
                        <button onClick={async () => { 
                            if(!connected){
                                await connectWalletHandler(true);
                            
                            } 
                            setOpenModal(true); 
                            setModalType('GT'); 
                            }
                            }>Get Tickets</button>
                        <button onClick={() => history.push('/community-reward-pool/details')}>Pool Details</button>
                    </div>
                </div>
            </div>
    
    )
}

export default RewardPool
