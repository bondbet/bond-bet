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




const GetTickets = () => {
    const {
        bondAllowance,
        allowBondHandler,
        bondBalance,
        connected,
        setModalType,
        ticketDepositHandler,
        getTicketsLoading,
        getTicketsTxId,
    } = useContext(AppContext);

    const [ticketAmountRP, setTicketAmountRP] = useState('');
	// const [totalTicketAmountRP, setTotalTicketAmountRP] = useState(0);
	const [tokenIsEnabledRP, setTokenIsEnabledRP] = useState(false);
	const [maxAmountSelected, setMaxAmountSelected] = useState(false);
	const [withdrawAmountRP, setWithdrawAmountRP] = useState('');
    const [inputValid, setInputValid] = useState(false);
   
    useEffect(() => {
        if(bondAllowance){
            setTokenIsEnabledRP(bondAllowance.gt(0))
        }
    },[bondAllowance])
    const handleTicketInputChange = (value) => {
        
        if(value === '' || (validator.isNumeric(value) && !value.startsWith('0'))) {
            setTicketAmountRP(value);
            const balanceInBigNumber = ethers.utils.parseEther(value || '0');
            const hasEnoughBond = ethers.utils.parseEther(value || '0').lte(bondBalance);
            setInputValid(balanceInBigNumber.gt('0') && hasEnoughBond);
            if(hasEnoughBond) {
                setMaxAmountSelected(balanceInBigNumber.eq(ethers.BigNumber.from(bondBalance)));
            }
        }
    
    };

    const handleContinue = (value) => {
       
       ticketAmountRP ? setModalType('CW') : alert('Please enter ticket amount.')
    }
    const PLACEHOLDER_ODDS = 1;
    const PLACEHOLDER_COMMON_ODDS = '1,232,233.23';

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
                            <h2>{ tokenIsEnabledRP ? 'Token enabled' : 'Enable token'}
                                <input
                                    checked={tokenIsEnabledRP}
                                    onChange={allowBondHandler}
                                    disabled={tokenIsEnabledRP}
                                    className='switch-checkbox'
                                    id={'switch-new'+'RP'}
                                    type='checkbox'
                                />
                                <label
                                    style={{ background:  tokenIsEnabledRP  && '#28D879' }}
                                    className='switch-label'
                                    htmlFor={'switch-new'+"RP"}
                                >
                                    <span className='switch-button'>
                                        {
                                            (tokenIsEnabledRP ? <img src={minusIcon} alt='Minus' /> : <img src={closeIcon} alt='Close' />) 
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
                                disabled={!(connected  && tokenIsEnabledRP ) }
                                onChange={ (event) => {
                                    if(event && event.target) {
                                            handleTicketInputChange(event.target.value)                        
                                    }
                            
                                }
                                   
                                }
                                value={ticketAmountRP}
                            />
                            {connected ?
                                (tokenIsEnabledRP && !maxAmountSelected) && <button className='max-btn' onClick={() => { setTicketAmountRP(+ethers.utils.formatEther(bondBalance)); setInputValid(true); setMaxAmountSelected(true) }}>MAX</button> : null
                            }
                        </div>
                    </div>
                    <div className='odds'>
                        <div>New odds of winning:</div>
                        <div>{PLACEHOLDER_ODDS} in {PLACEHOLDER_COMMON_ODDS}</div>
                    </div>
                </div>
            </div>

            <div className='continue-btn'>
                {<button onClick={() => ticketDepositHandler(ticketAmountRP)} disabled={!inputValid}>Deposit</button>}
            </div>
        </div>
    )
}

export default GetTickets
