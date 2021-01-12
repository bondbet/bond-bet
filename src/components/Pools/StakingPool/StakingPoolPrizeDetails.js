import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import onlyLogo from '../../../assets/images/onlyLogo.svg'
import arrowToRight from '../../../assets/images/arrowToRight.svg'
import { Link } from 'react-router-dom'
import AppContext from '../../../ContextAPI'

const StakingPoolPrizeDetails = () => {
    const { id } = useParams();
    const { setSelectedMenuItem } = useContext(AppContext);
    return (
        <div className='reward-pool-details-section'>
            <h1 className='reward-pool-details-title'>
                <img src={onlyLogo} alt='DAO Staking Pool' /> DAO Staking Pool
            </h1>
            <div className='breadcrumbs'>
                <Link to='/leaderboard' onClick={() => setSelectedMenuItem(2)}>Leaderboard</Link>
                <img src={arrowToRight} alt='Right Arrow' />
                <label>Prize #{id}</label>
            </div>
        </div>
    )
}

export default StakingPoolPrizeDetails
