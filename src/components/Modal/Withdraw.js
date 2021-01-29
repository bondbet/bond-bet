import React, {useContext, useState} from 'react'
import AppContext from '../../ContextAPI';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader'
import walletIcon from '../../assets/images/wallet-sm.svg';
import validator from 'validator';
import * as ethers from 'ethers';
import {connect}  from 'react-redux';

const Withdraw = ({ticketsBalance, connected}) => {
    const {
        ticketWithdrawHandler,
    } = useContext(AppContext);

    const [inputValid, setInputValid] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
	const [maxAmountSelected, setMaxAmountSelected] = useState(false);

    const handleTicketInputChange = (value) => {
        
        if(value === '' || (validator.isNumeric(value) && !value.startsWith('0'))) {
            setWithdrawAmount(value);
            const balanceInBigNumber = ethers.utils.parseEther(value || '0');
            const hasEnoughTickets = ethers.utils.parseEther(value || '0').lte(ticketsBalance);
            setInputValid(balanceInBigNumber.gt('0') && hasEnoughTickets);
            if(hasEnoughTickets) {
                setMaxAmountSelected(balanceInBigNumber.eq(ethers.BigNumber.from(ticketsBalance)));
            }
        }
    
    };

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
                                    <img src={walletIcon} alt='Wallet' /> {ethers.utils.formatEther(ticketsBalance)} Tickets
                                </div>
                            }
                        </div>
                        <div className='ticket-amount-input'>
                            <input
                                type='text'
                                disabled={!(connected ) }
                                onChange={ (event) => {
                                    if(event && event.target) {
                                            handleTicketInputChange(event.target.value)                        
                                    }
                            
                                }}
                                value={withdrawAmount}

                            />
                            {connected ?
                                ( !maxAmountSelected) && <button className='max-btn' onClick={() => { setWithdrawAmount(+ethers.utils.formatEther(ticketsBalance)); setInputValid(true); setMaxAmountSelected(true) }}>MAX</button> : null
                            }
                        </div>
                    </div>
                </div>
        
            </div> 
            <div className='continue-btn'>
                {<button onClick={() => ticketWithdrawHandler(withdrawAmount, maxAmountSelected)} disabled={!inputValid}>Withdraw</button>}
            </div>
        </div>
    )
}
const mapStateToProps = ({ticketsBalance, connected}) => ({ticketsBalance, connected})

export default connect(mapStateToProps)(Withdraw)
