import React from 'react'
import cupImg from '../../../assets/images/cup.svg'
import playersImg from '../../../assets/images/players.svg'
import ticketImg from '../../../assets/images/ticket.svg'

const PoolBoxStats = ({winners, players, totalTickets}) => {
    return (
        <div className='pools-box-content required-changes'>
            <div className='pools-box-inner required-changes grid'>
                <div>
                    <h1 className='pools-box-inner-title required-changes'>
                        <img src={cupImg} alt='Winners' /> Winners
                    </h1>
                    <div className='pools-box-screen required-changes'>
                        <div className='pools-box-screen-inner'>{winners}</div>
                    </div>
                </div>
                <div>
                    <h1 className='pools-box-inner-title required-changes'>
                        <img src={playersImg} alt='Players' /> Players
                    </h1>
                    <div className='pools-box-screen required-changes'>
                        <div className='pools-box-screen-inner'>{players}</div>
                    </div>
                </div>
                <div>
                    <h1 className='pools-box-inner-title required-changes'>
                        <img src={ticketImg} alt='Total tickets' /> Total tickets
                    </h1>
                    <div className='pools-box-screen required-changes'>
                        <div className='pools-box-screen-inner'>{totalTickets}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PoolBoxStats
