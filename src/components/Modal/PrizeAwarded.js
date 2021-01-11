import React, {useContext, useEffect, useState} from 'react'
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader'
import prizeAwardedImg from '../../assets/images/prize-awarded.png'
import youWonImg from '../../assets/images/you-won.png'
import { useHistory } from 'react-router-dom'
import AppContext from '../../ContextAPI'

const PrizeAwarded = () => {
    const { setSelectedMenuItem, setOpenModal } = useContext(AppContext);
    const history = useHistory();
    const [winner, setWinner] = useState(false);
    
    useEffect(() => {
        if (window.location.pathname === '/prize-awarded/won') {
            setWinner(true)
        }
        if (window.location.pathname === '/prize-awarded/loss') {
            setWinner(false)
        }
    }, [setWinner])

    return (
        <div className='pools-box'>
            {!winner ? 
                <>
                    <PoolBoxHeader title='Results' />
                    <div className='box-content'>
                        <div className='box-inner'>
                            <div className='prize-awarded-img'>
                                <div>
                                    <img src={prizeAwardedImg} alt='Prize Awarded' />
                                </div>
                            </div>
                            <h1 className='modal-title'>The prize has been awarded</h1>
                            <h4 className='modal-description'>You didn't win the prize but you still kept all your money!</h4>
                            <p className='modal-description-sm'>Your tickets are perpetual and you're automatically eligible to win the next prize.</p>
                        </div>
                        <div className='view-leaderboard'>
                            <button onClick={() => { setSelectedMenuItem(2); setOpenModal(false); history.push('/leaderboard') }}>View Leaderboard</button>
                        </div>
                    </div> 
                </> : 
                <>
                    <PoolBoxHeader title='Congratulations' />
                    <div className='box-content'>
                        <div className='box-inner'>
                            <div className='prize-awarded-img'>
                                <div>
                                    <img src={youWonImg} alt='Congratulations! You Won!' />
                                </div>
                            </div>
                            <h4 className='modal-description required-changes'>The prize has been awarded. You are the winner!</h4>
                            <h1 className='modal-title required-changes'>Congratulations! You won</h1>
                            <div className='pools-box-screen required-changes'>
                                <div className='pools-box-screen-inner'>
                                    13.48 bond
                                </div>
                            </div>
                            <p className='modal-description-sm required-changes'>Your tickets are perpetual and you're automatically eligible to win the next prize.</p>
                        </div>
                        <div className='view-leaderboard-withdraw required-changes'>
                            <button onClick={() => { setSelectedMenuItem(2); setOpenModal(false); history.push('/leaderboard') }}>View Leaderboard</button>
                            <button>Withdraw</button>
                        </div>
                    </div> 
                </>
            }
        </div>
    )
}

export default PrizeAwarded
