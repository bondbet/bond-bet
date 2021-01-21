import React, {useContext} from 'react';
import AppContext from '../../ContextAPI';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import loading from '../../assets/images/loading.svg';

const ConfirmDeposit = () => {
    const { ticketAmountRP, poolType } = useContext(AppContext);

    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Confirm deposit' />
            <div className='box-content'>
                <div className='box-inner'>
                    <h1 className='modal-title'>Confirm deposit in your wallet</h1>
                    <h4 className='modal-description'>Deposit {ticketAmountRP} BOND for {ticketAmountRP} tickets</h4>
                    <div className='confirm-deposit-loading'>
                        <img src={loading} alt='Loading...' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeposit
