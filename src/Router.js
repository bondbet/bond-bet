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
						<Route exact path="/community-reward-pool/prize/:id" component={() =>  <RewardPoolPrizeDetails />} />
						<Route exact path="/community-reward-pool/player/:id" component={() =>  <RewardPoolPlayerDetails />} />
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
