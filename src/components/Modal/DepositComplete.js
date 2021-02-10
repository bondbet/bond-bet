import React, {useContext, useState, useEffect} from 'react';
import AppContext from '../../ContextAPI';
import Countdown from '../Pools/Components/Countdown';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import { ethers } from 'ethers';
import { formatEtherWithDecimals } from '../../helpers/format-utils';
import {connect}  from 'react-redux';

const DepositComplete = ({ticketsBalance, poolType}) => {


    return (
      
                <div className='pools-box'>
                    <PoolBoxHeader title='Deposit Complete' />
                    <div className='box-content'>
                        <div className='box-inner'>
                            <h1 className='modal-title'>Deposit Complete</h1>
                        {ticketsBalance ? <h4 className='modal-description'>You got total of {formatEtherWithDecimals(ticketsBalance, 2)} tickets</h4> : null}
                            <p className='prize-will-be-awarded-in'>The prize will be awarded in:</p>
                            <Countdown poolType={poolType}/>
                        </div>
                    </div>
                </div>

    )
}
const mapStateToProps = (state, {poolType}) => ({ticketsBalance: state[poolType].ticketsBalance})

export default connect(mapStateToProps)(DepositComplete)
