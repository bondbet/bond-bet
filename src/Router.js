import React from 'react'
import { BrowserRouter as Routes, Route, Switch  } from 'react-router-dom';
import Pools from './components/Pools/Pools';
import MyAccount from './components/MyAccount/MyAccount';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import RewardPoolDetails from './components/Pools/RewardPool/RewardPoolDetails';
import StakingPoolDetails from './components/Pools/StakingPool/StakingPoolDetails';
import Modal from './components/Modal/Modal';
import YouWon from './components/Test/YouWon';
import YouLoss from './components/Test/YouLoss';

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
						<Route exact path="/prize-awarded/won" component={() => <YouWon /> } />
						<Route exact path="/prize-awarded/loss" component={() => <YouLoss />} />
						<Route path="*" component={() => <Pools />} />
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