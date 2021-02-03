import React, {useEffect, useState, useContext} from 'react'
import AppContext from '../../ContextAPI';
import RewardPool from './RewardPool/RewardPool';
import PoolBoxHeader from './Components/PoolBoxHeader';

const Pools = () => {
    const multiplePools = false;
    useEffect(() => {
        document.title = 'Pools'
    }, [])

    return (
        <div className='lottery-pools-container'>
            <h1 className='title'>Lottery Pools</h1>
            <div className='pools-box' style={{ marginBottom: '30px' }}>
                <PoolBoxHeader title='Overview' />
                <div className='pools-box-content required-changes'>
                    <div className='pools-box-inner required-changes'>
                        <h1 className='pools-box-inner-title required-changes'>Overview</h1>
                        <p className='pools-box-inner-description'>We are happy to present you our first no loss lottery pool. We are allocating X BOND for X weeks from BarnBridge treasury. 1 BOND = 1 BOND (1 ticket).</p>
                    </div>
                </div>
            </div>
            <div className='lottery-pools-section' style={{ gridGap: multiplePools ? 30 : 0 }}>
                <RewardPool />
            </div>
        </div>
    )   
}

export default Pools;