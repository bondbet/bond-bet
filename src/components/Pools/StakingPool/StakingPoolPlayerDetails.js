import React, {useContext} from 'react'
import { useParams } from 'react-router-dom';
import onlyLogo from '../../../assets/images/onlyLogo.svg';
import arrowToRight from '../../../assets/images/arrowToRight.svg';
import playerImg from '../../../assets/images/players.svg';
import presentImg from '../../../assets/images/present.svg';
import cupImg from '../../../assets/images/cup.svg';
import ticketImg from '../../../assets/images/ticket.svg';
import { Link } from 'react-router-dom';
import AppContext from '../../../ContextAPI';
import PoolBoxHeader from '../Components/PoolBoxHeader';

const StakingPoolPlayerDetails = () => {
    const { id } = useParams();
    const { setSelectedMenuItem } = useContext(AppContext);

    return (
        <div className='reward-pool-details-section'>
            <h1 className='reward-pool-details-title'>
                <img src={onlyLogo} alt='DAO Staking Pool' /> DAO Staking Pool
            </h1>
            <div className='breadcrumbs'>
                <Link to='/' onClick={() => setSelectedMenuItem(0)}>Pools</Link>
                <img src={arrowToRight} alt='Right Arrow' />
                <label>Player {id.substring(0,6) + '..' + id.substring(id.length - 4)}</label>
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
                                <img src={presentImg} alt='Player' />Prize: <p className='player-info-box-value'>13.48 BOND in 01d : 18h : 55m : 07s</p>
                            </h3>
                        </div>
                        <div>
                            <h3>
                                <img src={cupImg} alt='Player' />Winning odds: <p className='player-info-box-value'>1 in 3.12</p>
                            </h3>
                        </div>
                        <div>
                            <h3>
                                <img src={ticketImg} alt='Player' />Player tickets: <p className='player-info-box-value'>202,485</p>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StakingPoolPlayerDetails
