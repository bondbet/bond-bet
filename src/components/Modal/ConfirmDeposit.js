import React, {useContext} from 'react';
import AppContext from '../../ContextAPI';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import loading from '../../assets/images/loading.png';

const ConfirmDeposit = () => {
    const { ticketAmountRP, ticketAmountSP, poolType } = useContext(AppContext);

    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Confirm deposit' />
            <div className='box-content'>
                <div className='box-inner'>
                    <h1 className='modal-title'>Confirm deposit in your wallet</h1>
                    <h4 className='modal-description'>Deposit {poolType === 'RP' ? ticketAmountRP : ticketAmountSP} BOND for {poolType === 'RP' ? ticketAmountRP : ticketAmountSP} tickets</h4>
                    <div className='confirm-deposit-loading'>
                        <img src={loading} alt='Loading...' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeposit
