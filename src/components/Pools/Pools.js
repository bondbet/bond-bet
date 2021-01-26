import React, {useEffect, useState, useContext} from 'react'
import AppContext from '../../ContextAPI';
import RewardPool from './RewardPool/RewardPool';

const Pools = () => {


    return (
            <div className='lottery-pools-container'>
                <h1 className='title'>Lottery Pools</h1>
                <div className='lottery-pools-section'>
                    <RewardPool />
                </div>
            </div>    )   
}

export default Pools;