import React from 'react'

const PoolBoxStats = ({winners, players, totalTickets}) => {
    return (
        <div className='pools-box-content required-changes'>
            <div className='pools-box-inner required-changes grid'>
                <div>
                    <h1 className='pools-box-inner-title required-changes'>Winners</h1>
                    <div className='pools-box-screen required-changes'>
                        <div className='pools-box-screen-inner'>{winners}</div>
                    </div>
                </div>
                <div>
                    <h1 className='pools-box-inner-title required-changes'>Players</h1>
                    <div className='pools-box-screen required-changes'>
                        <div className='pools-box-screen-inner'>{players}</div>
                    </div>
                </div>
                <div>
                    <h1 className='pools-box-inner-title required-changes'>Total tickets</h1>
                    <div className='pools-box-screen required-changes'>
                        <div className='pools-box-screen-inner'>{totalTickets}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PoolBoxStats
