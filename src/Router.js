import React from 'react'
import { BrowserRouter as Routes, Redirect, Route, Switch  } from 'react-router-dom';
import Pools from './components/Pools/Pools';
import MyAccount from './components/MyAccount/MyAccount';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Modal from './components/Modal/Modal';
import RewardPoolPrizeDetails from './components/Pools/RewardPool/RewardPoolPrizeDetails'
import RewardPoolPlayerDetails from './components/Pools/RewardPool/RewardPoolPlayerDetails'
import RewardPoolDetails from './components/Pools/RewardPool/RewardPoolDetails'
import {connect} from 'react-redux';
import { POOL_TYPE } from './store/pool-type';
import { POOL_INFORMATION } from './constants/pool-information';

function Router({openModal}) {
    return (

        <Routes>
			<Header />
			<div className='app-wrapper'>
				<Sidebar />
				<div className='app-content'>
					<Switch>
						<Route exact path="/" component={() => <div>{document.title = 'Pools'}<Pools /></div>} />
						<Route exact path="/my-account" component={() => <div>{document.title = 'My Account'}<MyAccount poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}/></div>} />
						<Route exact path="/leaderboard" component={() => <div>{document.title = 'Leaderboard'}<LeaderBoard poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}/></div>} />
						<Route exact path={`/${POOL_INFORMATION.COMMUNITY_REWARD_POOL.URL}/details`} component={() => <div>{document.title = 'Community Reward Pool'}<RewardPoolDetails poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}/></div>} />
						<Route exact path={`/${POOL_INFORMATION.COMMUNITY_REWARD_POOL.URL}/prize/:id`} component={() =>  <div>{document.title = 'Community Reward Pool'}<RewardPoolPrizeDetails poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}/></div>} />
						<Route exact path={`/${POOL_INFORMATION.COMMUNITY_REWARD_POOL.URL}/player/:id`} component={() =>  <div>{document.title = 'Community Reward Pool'}<RewardPoolPlayerDetails poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}/></div>} />
						
						<Route exact path={`/${POOL_INFORMATION.STAKE_POOL.URL}/details`} component={() => <div>{document.title = POOL_INFORMATION.STAKE_POOL.TITLE}<RewardPoolDetails poolType={POOL_TYPE.NEW_POOL}/></div>} />
						<Route exact path={`/${POOL_INFORMATION.STAKE_POOL.URL}/prize/:id`} component={() =>  <div>{document.title =  POOL_INFORMATION.STAKE_POOL.TITLE}<RewardPoolPrizeDetails poolType={POOL_TYPE.NEW_POOL}/></div>} />
						<Route exact path={`/${POOL_INFORMATION.STAKE_POOL.URL}/player/:id`} component={() =>  <div>{document.title =  POOL_INFORMATION.STAKE_POOL.TITLE}<RewardPoolPlayerDetails poolType={POOL_TYPE.NEW_POOL}/></div>} />
						
						<Route path="*" component={() => <Redirect to='/' />} />
					</Switch>
				</div>
			</div>
			{openModal &&
				<Modal />
			}
		</Routes>

    )
}
const mapStateToProps = ({openModal}) => ({openModal})
export default connect(mapStateToProps)(Router)
