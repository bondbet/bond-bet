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
import { getProviderDescription } from 'web3modal';




const GetTickets = () => {
    const {
        bondAllowance,
        allowBondHandler,
        bondBalance,
        connected,
        ticketDepositHandler,
        getTicketsLoading,
        getTicketsTxId,
        totalTicketAmount,
        ticketsBalance
    } = useContext(AppContext);

	const [tokenIsEnabled, setTokenIsEnabled] = useState(false);
	const [maxAmountSelected, setMaxAmountSelected] = useState(false);
	const [withdrawAmount, setWithdrawAmount] = useState('');
    const [inputValid, setInputValid] = useState(false);
    const [depositAmount, setDepositAmount] = useState(0);

    useEffect(() => {
        if(bondAllowance ){
            setTokenIsEnabled(bondAllowance.gt(0) )
        }
    },[bondAllowance])
    const handleTicketInputChange = (value) => {
        
        if(value === '' || (validator.isNumeric(value) && !value.startsWith('0'))) {
            setDepositAmount(value);
            const balanceInBigNumber = ethers.utils.parseEther(value || '0');
            const hasEnoughBond = ethers.utils.parseEther(value || '0').lte(bondBalance);
            setInputValid(balanceInBigNumber.gt('0') && hasEnoughBond);
            if(hasEnoughBond) {
                setMaxAmountSelected(balanceInBigNumber.eq(ethers.BigNumber.from(bondBalance)));
            }
        }
    
    };

    console.log()
    console.log( +depositAmount +  +ethers.utils.formatEther(ticketsBalance))
    const getOdds = () => {

        const currentTotalTickets = +depositAmount + +ethers.utils.formatEther(totalTicketAmount);
        const currentTicketsBalance = +depositAmount +  +ethers.utils.formatEther(ticketsBalance);

        return (currentTotalTickets / currentTicketsBalance).toFixed(2);
    }
    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Get Tickets' />
            <div className='box-content'>
                <div className='box-inner'>
                    <h1 className='modal-title'>Get Tickets</h1>
                    <h4 className='modal-description'>1 BOND = 1 ticket</h4>
                    {connected &&
                        <div className='token'>
                            <h1>
                                <img src={logo} alt='App Logo' /> Bond
                            </h1>
                            {getTicketsLoading ? <EtherscanLink txId={getTicketsTxId}> </EtherscanLink> : null }
                            <h2>{ tokenIsEnabled ? 'Token enabled' : 'Enable token'}
                                <input
                                    checked={tokenIsEnabled}
                                    onChange={allowBondHandler}
                                    disabled={tokenIsEnabled}
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
                                    <img src={walletIcon} alt='Wallet' /> {`${ethers.utils.formatEther(bondBalance)} BOND`}
                                </div>
                            }
                        </div>
                        <div className='ticket-amount-input'>
                            <input
                                type='text'
                                disabled={!(connected  && tokenIsEnabled ) }
                                onChange={ (event) => {
                                    if(event && event.target) {
                                            handleTicketInputChange(event.target.value)                        
                                    }
                            
                                }
                                   
                                }
                                value={depositAmount}
                            />
                            {connected ?
                                (tokenIsEnabled && !maxAmountSelected) && <button className='max-btn' onClick={() => { setDepositAmount(+ethers.utils.formatEther(bondBalance)); setInputValid(true); setMaxAmountSelected(true) }}>MAX</button> : null
                            }
                        </div>
                    </div>
                    {
                        totalTicketAmount && ticketsBalance ?  
                        <div className='odds'>
                            { depositAmount > 0 ? <div>New odds of winning:</div> : <div>Odds of winning:</div>}
                            
                            <div>1 in {getOdds()}</div>
                        </div>
                        : null
                    }
                   
                </div>
            </div>

            <div className='continue-btn'>
                {<button onClick={() => ticketDepositHandler(depositAmount)} disabled={!inputValid}>Deposit</button>}
            </div>
        </div>
    )
}

export default GetTickets
