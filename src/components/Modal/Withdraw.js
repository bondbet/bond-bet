import React, {useContext} from 'react'
import AppContext from '../../ContextAPI';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader'
import walletIcon from '../../assets/images/wallet-sm.svg';
import validator from 'validator';

const Withdraw = () => {
    const {
        connected,
        withdrawAmountRP,
        setWithdrawAmountRP,
        setModalType,
        totalTicketAmountRP,
        setTotalTicketAmountRP,
    } = useContext(AppContext);

    const handleChange = (e) => {
        if (e.target.value === '' || (validator.isNumeric(e.target.value) && !e.target.value.startsWith('0'))) {
       
                if (e.target.value <= totalTicketAmountRP) {
                    setWithdrawAmountRP(e.target.value)
                } else {
                    alert('Max amount should be ' + totalTicketAmountRP)
                }
            
        }
    };

    const handleContinue = () => {

            if (withdrawAmountRP) {
                setModalType('CWD')
                setTotalTicketAmountRP(old => Number(old) - Number(withdrawAmountRP))

            } else {
                alert('Please enter ticket amount.')
            }
        
    }

    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Withdraw' />
            <div className='box-content'>
                <div className='box-inner'>
                    <h1 className='modal-title'>Withdraw</h1>

                    <div className='ticket-amount'>
                        <div className='ticket-amount-label'>
                            <div>Ticket amount:</div>
                            {connected &&
                                <div>
                                    <img src={walletIcon} alt='Wallet' /> {totalTicketAmountRP} Tickets/BOND
                                </div>
                            }
                        </div>
                        <div className='ticket-amount-input'>
                            <input
                                type='text'
                                onChange={handleChange}
                                value={withdrawAmountRP}
                            />
                            {connected ?
                                <button className='max-btn' onClick={() => setWithdrawAmountRP(totalTicketAmountRP) }>MAX</button>
                                : null
                            }
                        </div>
                    </div>
                </div>
                <div className='view-leaderboard'>
                    <button onClick={handleContinue}>Continue</button>
                </div>
            </div> 
        </div>
    )
}

export default Withdraw
