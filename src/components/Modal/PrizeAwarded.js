import React from 'react'
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader'
import prizeAwardedImg from '../../assets/images/prize-awarded.svg'
import youWonImg from '../../assets/images/you-won.svg'
import { useHistory } from 'react-router-dom'
import {connect} from 'react-redux';
import { ACTION_TYPE } from '../../store/action-type'

const PrizeAwarded = ({setOpenModal, setSelectedMenuItem}) => {
    const history = useHistory();

    const PLACEHOLDER_WINNER = false;
    const PLACEHOLDER_BONDS = 13.48;

    return (
        <div className='pools-box'>
            {!PLACEHOLDER_WINNER ? 
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
                                <div className='pools-box-screen-inner'>{`${PLACEHOLDER_BONDS} bond`}</div>
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
const mapDispatchToProps = dispatch => ({
    setOpenModal: value => dispatch({type: ACTION_TYPE.MODAL_OPEN, value}),
    setSelectedMenuItem: value => dispatch({type: ACTION_TYPE.SELECTED_MENU_ITEM, value})
})
export default connect(null, mapDispatchToProps)(PrizeAwarded)
