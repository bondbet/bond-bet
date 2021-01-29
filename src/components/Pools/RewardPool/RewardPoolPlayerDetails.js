import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import onlyLogo from '../../../assets/images/onlyLogo.svg';
import arrowToRight from '../../../assets/images/arrowToRight.svg';
import playerImg from '../../../assets/images/players.svg';
import presentImg from '../../../assets/images/present.svg';
import cupImg from '../../../assets/images/cup.svg';
import ticketImg from '../../../assets/images/ticket.svg';
import { Link } from 'react-router-dom';
import PoolBoxHeader from '../Components/PoolBoxHeader';
import { connect } from 'react-redux';
import { setNewTime } from '../../../helpers/countdown-setter';
import { formatEtherWithDecimals } from '../../../helpers/format-utils';

const RewardPoolPlayerDetails = ({ playerData, prizePeriodEnds, currentWeekPrice, setSelectedMenuItem }) => {
    const { id } = useParams();

    const [chosenPlayerData, setChosenPlayerData] = useState({
        ticketsBalance: 0,
        odds: 1,
        address: ''
    });

    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setNewTime(setCountdown, prizePeriodEnds);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [prizePeriodEnds])



    useEffect(() => {
        if (playerData) {
            setChosenPlayerData(playerData.filter(x => x.address.toUpperCase() === id.toUpperCase())[0])
        }
    }, [playerData])


    return (
        <div className='reward-pool-details-section'>
            <h1 className='reward-pool-details-title'>
                <img src={onlyLogo} alt='Community Reward Pool' /> Community Reward Pool
            </h1>
            <div className='breadcrumbs'>
                <Link to='/' onClick={() => setSelectedMenuItem(0)}>Pools</Link>
                <img src={arrowToRight} alt='Right Arrow' />
                <label>Player {id.substring(0, 6) + '..' + id.substring(id.length - 4)}</label>
            </div>

            <div className='pools-box required-changes'>
                <PoolBoxHeader title='Player' />
                <div className='pools-box-content required-changes'>
                    <div className='player-full-hash'>
                        <h1 className='pools-box-inner-title required-changes'>
                            <img src={playerImg} alt='Player' /> Player: <p className='full-hash'>{id}</p>
                        </h1>
                    </div>
                    <div className='player-info-box'>
                        <div>
                            <h3>
                                <img src={presentImg} alt='Player' />Prize: <p className='player-info-box-value'> {`${formatEtherWithDecimals(currentWeekPrice, 5)} BOND in ${countdown.days}d : ${countdown.hours}h : ${countdown.minutes}m : ${countdown.seconds}s`}</p>
                            </h3>
                        </div>
                        <div>
                            <h3>
                                <img src={cupImg} alt='Player' />Winning odds: <p className='player-info-box-value'>{`${1} in ${chosenPlayerData.odds}`}</p>
                            </h3>
                        </div>
                        <div>
                            <h3>
                                <img src={ticketImg} alt='Player' />Player tickets: <p className='player-info-box-value'>{chosenPlayerData.ticketsBalance}</p>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ playerData, prizePeriodEnds, currentWeekPrice }) =>
    ({ playerData, prizePeriodEnds, currentWeekPrice })
const mapDispatchToProps = (dispatch) => ({
    setSelectedMenuItem: value => dispatch({ type: ACTION_TYPE.SELECTED_MENU_ITEM, value })
})
export default connect(mapStateToProps, mapDispatchToProps)(RewardPoolPlayerDetails)
