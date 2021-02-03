import React, {useEffect, useState} from 'react'
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader'
import walletIcon from '../../assets/images/wallet-sm.svg';
import validator from 'validator';
import * as ethers from 'ethers';
import {connect}  from 'react-redux';
import { POOL_TYPE } from '../../store/pool-type';
import { formatEtherWithDecimals, toFixed } from '../../helpers/format-utils';

const Withdraw = ({ticketsBalance, connected, ticketWithdrawHandler, calculateEarlyExitFee, poolType}) => {

    const [inputValid, setInputValid] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
	const [maxAmountSelected, setMaxAmountSelected] = useState(false);
    const [exitFee, setExitFee] = useState(ethers.BigNumber.from('0'));
    const [exitFeeCalculated, setExitFeeCalculated] = useState(false);
    
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

    useEffect(async ()=> {
      
        if(poolType === POOL_TYPE.NEW_POOL && calculateEarlyExitFee && inputValid) {
            const fee = await calculateEarlyExitFee(withdrawAmount);
            setExitFeeCalculated(true);
            setExitFee(fee)
        }
    
    }, [withdrawAmount]) 
        
      
    

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
                                    <img src={walletIcon} alt='Wallet' /> {toFixed(ethers.utils.formatEther(ticketsBalance), 4)} Tickets
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
                                ( !maxAmountSelected) && <button className='max-btn' onClick={() => { setWithdrawAmount(toFixed(+ethers.utils.formatEther(ticketsBalance), 4)); setInputValid(true); setMaxAmountSelected(true) }}>MAX</button> : null
                            }
                        </div>
                    </div>
                </div>
        
            </div> 
            
       <div className='continue-btn'>
            {<button onClick={() => ticketWithdrawHandler(withdrawAmount, maxAmountSelected, exitFee)} disabled={!inputValid || !exitFeeCalculated && poolType === POOL_TYPE.NEW_POOL}>Withdraw</button>}
        </div>
       {exitFeeCalculated ?  <div className='fee-info'> Exit fee: {formatEtherWithDecimals(exitFee, 2) }</div> : null}
        </div>
    )
}
const mapStateToProps = (state, {poolType}) => ({ticketsBalance: state[poolType].ticketsBalance, calculateEarlyExitFee: state[poolType].calculateEarlyExitFee, ticketWithdrawHandler:state[poolType].ticketWithdrawHandler, connected: state.connected})

export default connect(mapStateToProps)(Withdraw)
