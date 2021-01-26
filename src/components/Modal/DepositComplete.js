import React, {useContext, useState, useEffect} from 'react';
import AppContext from '../../ContextAPI';
import Countdown from '../Pools/Components/Countdown';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import { ethers } from 'ethers';

const DepositComplete = () => {
    const { ticketsBalance } = useContext(AppContext);


    return (
      
                <div className='pools-box'>
                    <PoolBoxHeader title='Deposit Complete' />
                    <div className='box-content'>
                        <div className='box-inner'>
                            <h1 className='modal-title'>Deposit Complete</h1>
                        {ticketsBalance ? <h4 className='modal-description'>You got total of {ethers.utils.formatEther(ticketsBalance)} tickets</h4> : null}
                            <p className='prize-will-be-awarded-in'>The prize will be awarded in:</p>
                            <Countdown/>
                        </div>
                    </div>
                </div>

    )
}

export default DepositComplete
