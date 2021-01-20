import React, {useContext} from 'react';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import walletIcon from '../../assets/images/wallet-sm.svg';
import logo from '../../assets/images/onlyLogo.svg';
import closeIcon from '../../assets/images/close.svg';
import minusIcon from '../../assets/images/minus.svg';
import AppContext from '../../ContextAPI';
import validator from 'validator';
import * as ethers from 'ethers';
const GetTickets = () => {
    const {
        bondBalance,
        connected,
        setModalType,
        ticketAmountRP,
		setTicketAmountRP,
        tokenIsEnabledRP,
		setTokenIsEnabledRP,
		ticketAmountSP,
		setTicketAmountSP,
		tokenIsEnabledSP,
		setTokenIsEnabledSP,
        poolType,
        maxAmountSelected,
        setMaxAmountSelected,
        totalTicketAmountRP,
		setTotalTicketAmountRP,
		totalTicketAmountSP,
		setTotalTicketAmountSP
    } = useContext(AppContext);


    const handleChange = (e) => {
        if (e.target.value === '' || (validator.isNumeric(e.target.value) && !e.target.value.startsWith('0'))) {
            poolType === 'RP' ? setTicketAmountRP(e.target.value) : setTicketAmountSP(e.target.value)
        }
    };

    const handleContinue = () => {
        poolType === 'RP' ? (ticketAmountRP ? setModalType('CW') : alert('Please enter ticket amount.')) :  
        ticketAmountSP ? setModalType('CW') : alert('Please enter ticket amount.')
    }

    const handleDeposit = () => {
        if (poolType === 'RP') {
            if (ticketAmountRP) {
                setModalType('CD')
                setTimeout(() => {
                    setModalType('DC');
                    poolType === 'RP' ? setTotalTicketAmountRP(Number(totalTicketAmountRP) + Number(ticketAmountRP)) : setTotalTicketAmountSP(Number(totalTicketAmountSP) + Number(ticketAmountSP))
                }, 5000)
            } else {
                alert('Please enter ticket amount.')
            }
        } else {
            if (ticketAmountSP) {
                setModalType('CD')
                setTimeout(() => {
                    setModalType('DC');
                    poolType === 'RP' ? setTotalTicketAmountRP(Number(totalTicketAmountRP) + Number(ticketAmountRP)) : setTotalTicketAmountSP(Number(totalTicketAmountSP) + Number(ticketAmountSP))
                }, 5000)
            } else {
                alert('Please enter ticket amount.')
            }
        }
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
                            <h2>Enable token
                                <input
                                    checked={poolType === 'RP' ? tokenIsEnabledRP : tokenIsEnabledSP}
                                    onChange={() =>
                                        poolType === 'RP' ?
                                            (setTokenIsEnabledRP(!tokenIsEnabledRP), setMaxAmountSelected(false), setTicketAmountRP('')) :
                                            (setTokenIsEnabledSP(!tokenIsEnabledSP), setMaxAmountSelected(false), setTicketAmountSP(''))
                                    }
                                    className='switch-checkbox'
                                    id={'switch-new'+poolType}
                                    type='checkbox'
                                />
                                <label
                                    style={{ background: poolType === 'RP' ? tokenIsEnabledRP && '#28D879' : tokenIsEnabledSP && '#28D879' }}
                                    className='switch-label'
                                    htmlFor={'switch-new'+poolType}
                                >
                                    <span className='switch-button'>
                                        {
                                            poolType === 'RP' ? (tokenIsEnabledRP ? <img src={minusIcon} alt='Minus' /> : <img src={closeIcon} alt='Close' />) :
                                            tokenIsEnabledSP ? <img src={minusIcon} alt='Minus' /> : <img src={closeIcon} alt='Close' />
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
                                disabled={connected && poolType === 'RP' ? (tokenIsEnabledRP && !maxAmountSelected) && true : (tokenIsEnabledSP && !maxAmountSelected) && true}
                                onChange={handleChange}
                                value={poolType === 'RP' ? ticketAmountRP : ticketAmountSP}
                            />
                            {connected && poolType === 'RP' ?
                                (tokenIsEnabledRP && !maxAmountSelected) && <button className='max-btn' onClick={() => { setTicketAmountRP(bondBalance); setMaxAmountSelected(true) }}>MAX</button> :
                                (tokenIsEnabledSP && !maxAmountSelected) && <button className='max-btn' onClick={() => { setTicketAmountSP(bondBalance); setMaxAmountSelected(true) }}>MAX</button>
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
                {connected ?
                    <button onClick={handleDeposit}>Deposit</button> :
                    <button onClick={handleContinue}>Continue</button>
                }
            </div>
        </div>
    )
}

export default GetTickets
