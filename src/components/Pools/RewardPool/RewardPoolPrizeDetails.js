import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import onlyLogo from '../../../assets/images/onlyLogo.png'
import arrowToRight from '../../../assets/images/arrowToRight.png'
import { Link } from 'react-router-dom'
import AppContext from '../../../ContextAPI'

const RewardPoolPrizeDetails = () => {
    const { id } = useParams();
    const { setSelectedMenuItem } = useContext(AppContext);
    return (
        <div className='reward-pool-details-section'>
            <h1 className='reward-pool-details-title'>
                <img src={onlyLogo} alt='Community Reward Pool' /> Community Reward Pool
            </h1>
            <div className='breadcrumbs'>
                <Link to='/leaderboard' onClick={() => setSelectedMenuItem(2)}>Leaderboard</Link>
                <img src={arrowToRight} alt='Right Arrow' />
                <label>Prize #{id}</label>
            </div>
        </div>
    )
}

export default RewardPoolPrizeDetails
