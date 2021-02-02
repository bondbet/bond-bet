import React, {useContext, useEffect, useState} from 'react';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import walletIcon from '../../assets/images/wallet-sm.svg';
import logo from '../../assets/images/onlyLogo.svg';
import closeIcon from '../../assets/images/close.svg';
import minusIcon from '../../assets/images/minus.svg';
import AppContext from '../../ContextAPI';
import validator from 'validator';
import * as ethers from 'ethers';
import EtherscanLink from '../Shared/EtherscanLink';
import {connect} from 'react-redux'



const GetTickets = ({getTicketsLoading, mainTokenBalance, allowTicketHandler, getTicketsTxId, mainTokenAllowance,totalTicketAmount, ticketDepositHandler, ticketsBalance, connected}) => {

	const [tokenIsEnabled, setTokenIsEnabled] = useState(false);
	const [maxAmountSelected, setMaxAmountSelected] = useState(false);
    const [inputValid, setInputValid] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');

    useEffect(() => {

        if(mainTokenAllowance ){
            setTokenIsEnabled(mainTokenAllowance.gt(0) )
        }
    },[mainTokenAllowance])
    const handleTicketInputChange = (value) => {
        
        if(value === '' || (validator.isNumeric(value) && !value.startsWith('0'))) {
            setDepositAmount(value);
            const balanceInBigNumber = ethers.utils.parseEther(value || '0');
            const hasEnoughBond = ethers.utils.parseEther(value || '0').lte(mainTokenBalance);
            setInputValid(balanceInBigNumber.gt('0') && hasEnoughBond);
            if(hasEnoughBond) {
                setMaxAmountSelected(balanceInBigNumber.eq(ethers.BigNumber.from(mainTokenBalance)));
            }
        }
    
    };

    const getOdds = () => {

        const currentTotalTickets = +depositAmount + +ethers.utils.formatEther(totalTicketAmount);
        const currentTicketsBalance = +depositAmount +  +ethers.utils.formatEther(ticketsBalance);
        return ((currentTotalTickets ? currentTotalTickets : 1)/ (currentTicketsBalance ? currentTicketsBalance : 1)).toFixed(2);
    }
    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Get Tickets' />
            <div className='box-content'>
                <div className='box-inner'>
                    <h1 className='modal-title'>Get Tickets</h1>
                    <h4 className='modal-description'>1 BOND = 1 ticket</h4>
                    <br/>
                    {getTicketsLoading ? <EtherscanLink txId={getTicketsTxId}> </EtherscanLink> : null }
                    {connected &&
                        <div className='token'>
                            <h1>
                                <img src={logo} alt='App Logo' /> Bond
                            </h1>
                        
                            <h2>{ tokenIsEnabled ? 'Token enabled' : 'Enable token'}
                                <input
                                    checked={tokenIsEnabled}
                                    onChange={allowTicketHandler}
                                    disabled={tokenIsEnabled || getTicketsLoading}
                                    className='switch-checkbox'
                                    id={'switch-new'+'RP'}
                                    type='checkbox'
                                />
                                <label
                                    style={{ background:  tokenIsEnabled  && '#28D879' }}
                                    className='switch-label'
                                    htmlFor={'switch-new'+"RP"}
                                >
                                    <span className='switch-button'>
                                        {
                                            (tokenIsEnabled ? <img src={minusIcon} alt='Minus' /> : <img src={closeIcon} alt='Close' />) 
                                        }
                                    </span>
                                </label>
                            </h2>
                        </div>
                    }
                    <div className='ticket-amount'>
                        <div className='ticket-amount-label'>
                            <div>Ticket amount:</div>
                            {connected &&
                                <div>
                                    <img src={walletIcon} alt='Wallet' /> {`${ethers.utils.formatEther(mainTokenBalance)} BOND`}
                                </div>
                            }
                        </div>
                        <div className='ticket-amount-input'>
                            <input
                                type='text'
                                disabled={!(connected  && tokenIsEnabled) }
                                onChange={ (event) => {
                                    if(event && event.target) {
                                            handleTicketInputChange(event.target.value)                        
                                    }
                            
                                }
                                   
                                }
                                value={depositAmount}
                            />
                            {connected && mainTokenBalance.gt('0')?
                                (tokenIsEnabled && !maxAmountSelected) && <button className='max-btn' onClick={() => { 
                                   
                                        setDepositAmount(+ethers.utils.formatEther(mainTokenBalance)); 
                                        setInputValid(true); 
                                        setMaxAmountSelected(true) 
                              
                                 }}>MAX</button> : null
                            }
                        </div>
                    </div>
                    {
                        totalTicketAmount !== undefined && ticketsBalance !== undefined ?  
                        <div className='odds'>
                            { depositAmount > 0 ? <div>New odds of winning:</div> : <div>Odds of winning:</div>}
                            
                            <div>1 in {getOdds()}</div>
                        </div>
                        : null
                    }
                   
                </div>
            </div>

            <div className='continue-btn'>
                {<button onClick={() => ticketDepositHandler(depositAmount, maxAmountSelected)} disabled={!inputValid}>Deposit</button>}
            </div>
        </div>
    )
}
const mapStateToProps = 
(state, {poolType}) => 
(
    {
        connected: state.connected, 
        allowTicketHandler: state[poolType].allowTicketHandler,
        getTicketsLoading: state[poolType].getTicketsLoading, 
        getTicketsTxId: state[poolType].getTicketsTxId, 
        totalTicketAmount: state[poolType].totalTicketAmount, 
        ticketsBalance: state[poolType].ticketsBalance, 
        mainTokenBalance: state[poolType].mainTokenBalance, 
        mainTokenAllowance: state[poolType].mainTokenAllowance,
        ticketDepositHandler: state[poolType].ticketDepositHandler
    })

export default connect(mapStateToProps)(GetTickets)
