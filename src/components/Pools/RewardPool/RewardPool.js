import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom';
import PoolBoxHeader from '../Components/PoolBoxHeader';
import PoolBoxContent from '../Components/PoolBoxContent';
import AppContext from '../../../ContextAPI';
import { formatEtherWithDecimals } from '../../../helpers/format-utils';
import {connect} from 'react-redux';
import { ACTION_TYPE } from '../../../store/action-type';

const RewardPool = ({setOpenModal, setModalType, totalTicketAmount, connected, poolType, POOL_URL, POOL_TITLE}) => {
    const { connectWalletHandler} = useContext(AppContext);
    const history = useHistory();
    return (
        
            <div className='pools-box'>
                <PoolBoxHeader title={POOL_TITLE} poolType={poolType}/>
                <div className='pools-box-content'>
                    <PoolBoxContent
                        poolType={poolType}
                        title={POOL_TITLE}
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
                        <button onClick={() => history.push(`/${POOL_URL}/details`)}>Pool Details</button>
                    </div>
                </div>
            </div>
    
    )
}
const mapStateToProps = (state, {poolType}) => ({totalTicketAmount: state[poolType].totalTicketAmount, connected: state.connected, POOL_URL: state[poolType].URL, POOL_TITLE: state[poolType].TITLE});

const mapDispatchToProps = (dispatch, {poolType}) => ({
    setModalType: value => dispatch({type: ACTION_TYPE.MODAL_TYPE, value: {modalType: value, poolType}}),
    setOpenModal: value => dispatch({type: ACTION_TYPE.MODAL_OPEN, value})
})

export default connect(mapStateToProps, mapDispatchToProps)(RewardPool)
