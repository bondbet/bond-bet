import React from 'react';
import MyAccountDetails from './MyAccountDetails';
import { POOL_TYPE } from '../../store/pool-type';

const MyAccount = () => {


    return (

            <div className='my-account-section'>
            <h1 className='my-account-title'>My account</h1>
           
            <div className="my-account-container">
             <MyAccountDetails poolType={POOL_TYPE.COMMUNITY_REWARD_POOL} ></MyAccountDetails>
            </div>

            <div className="my-account-container">
             <MyAccountDetails poolType={POOL_TYPE.NEW_POOL} className="my-account-container"></MyAccountDetails>
            </div>
        </div>
    )
}

export default (MyAccount);