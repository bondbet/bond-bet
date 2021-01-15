import React from 'react'
import { BrowserRouter as Routes, Redirect, Route, Switch  } from 'react-router-dom';
import Pools from './components/Pools/Pools';
import MyAccount from './components/MyAccount/MyAccount';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import RewardPoolDetails from './components/Pools/RewardPool/RewardPoolDetails';
import StakingPoolDetails from './components/Pools/StakingPool/StakingPoolDetails';
import Modal from './components/Modal/Modal';
import RewardPoolPrizeDetails from './components/Pools/RewardPool/RewardPoolPrizeDetails';
import StakingPoolPrizeDetails from './components/Pools/StakingPool/StakingPoolPrizeDetails';
import RewardPoolPlayerDetails from './components/Pools/RewardPool/RewardPoolPlayerDetails';
import StakingPoolPlayerDetails from './components/Pools/StakingPool/StakingPoolPlayerDetails';

function Router({openModal}) {
    return (
        <Routes>
			<Header />
			<div className='app-wrapper'>
				<Sidebar />
				<div className='app-content'>
					<Switch>
						<Route exact path="/" component={() => <Pools />} />
						<Route exact path="/my-account" component={() => <MyAccount />} />
						<Route exact path="/leaderboard" component={() => <LeaderBoard />} />
						<Route exact path="/community-reward-pool/details" component={() => <RewardPoolDetails />} />
						<Route exact path="/dao-staking-pool/details" component={() => <StakingPoolDetails />} />
						<Route exact path="/community-reward-pool/prize/:id" component={() => <RewardPoolPrizeDetails />} />
						<Route exact path="/dao-staking-pool/prize/:id" component={() => <StakingPoolPrizeDetails />} />
						<Route exact path="/community-reward-pool/player/:id" component={() => <RewardPoolPlayerDetails />} />
						<Route exact path="/dao-staking-pool/player/:id" component={() => <StakingPoolPlayerDetails />} />
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

export default Router
