import React, {useEffect, useState, useContext} from 'react'
import AppContext from '../../ContextAPI';
import { POOL_TYPE } from '../../store/pool-type';
import RewardPool from './RewardPool/RewardPool';

const Pools = () => {


    return (
            <div className='lottery-pools-container'>
                <h1 className='title'>Lottery Pools</h1>
                <div className='lottery-pools-section'>
                    <RewardPool poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}/>
                    <RewardPool poolType={POOL_TYPE.NEW_POOL}/>
                </div>
            </div>    )   
}

export default Pools;