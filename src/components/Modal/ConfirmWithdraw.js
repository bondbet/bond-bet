import React, {useContext} from 'react'
import AppContext from '../../ContextAPI';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import EtherscanLink from '../Shared/EtherscanLink';

const ConfirmWithdraw = () => {
    const {
        withdrawLoading, withdrawTxId
    } = useContext(AppContext);

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

export default ConfirmWithdraw
