import React, { useContext, useState, useEffect } from 'react';
import * as ethers from 'ethers';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import logo from '../../assets/images/onlyLogo.svg';
import diamond from '../../assets/images/diamond.svg';
import { useHistory } from 'react-router-dom';
import Table from '../Table/Table';
import AppContext from '../../ContextAPI';
import { formatEtherWithDecimals } from '../../helpers/format-utils';
import { setNewTime } from '../../helpers/countdown-setter';
import { formatTimestampToTimeAgo } from '../../helpers/date';
import { connect } from 'react-redux';
import { ACTION_TYPE } from '../../store/action-type';
import MyAccountDetails from './MyAccountDetails';
import { POOL_INFORMATION } from '../../constants/pool-information';
import { POOL_TYPE } from '../../store/pool-type';

const MyAccount = () => {


    return (

            <div className='my-account-section'>
            <h1 className='my-account-title'>My account</h1>
            <MyAccountDetails poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}></MyAccountDetails>
            <MyAccountDetails poolType={POOL_TYPE.NEW_POOL}></MyAccountDetails>

        </div>
    )
}

export default (MyAccount);