import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom';
import PoolBoxHeader from '../Components/PoolBoxHeader';
import PoolBoxContent from '../Components/PoolBoxContent';
import AppContext from '../../../ContextAPI';
import * as ethers from 'ethers';
import { formatEtherWithDecimals } from '../../../helpers/format-utils';

const RewardPool = () => {
    const { setOpenModal, setModalType, connected, connectWalletHandler , totalTicketAmount} = useContext(AppContext);
    const history = useHistory();

    return (
        
            <div className='pools-box'>
                <PoolBoxHeader title='Community Reward Pool' />
                <div className='pools-box-content'>
                    <PoolBoxContent
                        title='Community Reward Pool'
                        bonds={`${formatEtherWithDecimals(totalTicketAmount, 2)} bond`}
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
