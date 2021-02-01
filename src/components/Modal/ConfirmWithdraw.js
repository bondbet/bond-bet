import React from 'react';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import EtherscanLink from '../Shared/EtherscanLink';
import {connect} from 'react-redux';

const ConfirmWithdraw = ( {withdrawLoading, withdrawTxId}) => {
console.log('withdrawLoading', withdrawLoading)
    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Confirm' />
            <div className='box-content'>
                <div className='box-inner withdraw'>
                {!withdrawLoading ? <div>
                    <h1 className='modal-title required-changes'>Confirm withdrawal in your wallet</h1>
                    <p className='modal-description-sm withdraw'>Withdrawing everything will make you ineligible to win</p>
                    </div> :
                    <div>

                    <h4 className='modal-description'>Withdrawing...</h4>
                    <EtherscanLink txId={withdrawTxId}> </EtherscanLink> 

                    
                </div>
                }
               
                </div>
            </div> 
        </div>
    )
}
const mapStateToProps = (state, {poolType}) => ({ withdrawLoading: state[poolType].withdrawLoading, withdrawTxId: state[poolType].withdrawTxId})
export default connect(mapStateToProps)(ConfirmWithdraw)
