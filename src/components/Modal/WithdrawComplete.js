import React from 'react'
import { useHistory } from 'react-router-dom';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import * as ethers from 'ethers';
import {connect} from 'react-redux';
import { ACTION_TYPE } from '../../store/action-type'

const WithdrawComplete = ({ setOpenModal,ticketsBalance,setSelectedMenuItem}) => {

    const history = useHistory();
    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Complete' />
            <div className='box-content'>
                <div className='box-inner withdraw'>
                    <h1 className='modal-title required-changes'>Withdrawal Complete</h1>
                    <h4 className='modal-description withdraw'>Your balance: <b>{ethers.utils.formatEther(ticketsBalance)} tickets</b></h4>
                </div>
                <div className='view-leaderboard'>
                    <button onClick={() => { setSelectedMenuItem(1); setOpenModal(false); history.push('/my-account');  }}>Back to My account</button>
                </div>
            </div> 
        </div>
    )
}
const mapStateToProps = (state, {poolType}) =>  ({ticketsBalance: state[poolType].ticketsBalance});

const mapDispatchToProps = dispatch => ({
    setOpenModal: value => dispatch({type: ACTION_TYPE.MODAL_OPEN, value}),
    setSelectedMenuItem: value => dispatch({type: ACTION_TYPE.SELECTED_MENU_ITEM, value})
})
export default connect(mapStateToProps, mapDispatchToProps)(WithdrawComplete)
