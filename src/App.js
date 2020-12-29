import React, { useState, useEffect } from 'react';
import './assets/css/App.css';
import './assets/css/Header.css';
import './assets/css/Sidebar.css';
import './assets/css/Pools.css';
import './assets/css/PoolDetails.css';
import './assets/css/MyAccount.css';
import './assets/css/Leaderboard.css';
import './assets/css/Modal.css';
import './assets/css/Responsive.css';
import { BrowserRouter as Routes, Route, Switch  } from 'react-router-dom';
import Pools from './components/Pools/Pools';
import MyAccount from './components/MyAccount/MyAccount';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import RewardPoolDetails from './components/Pools/RewardPool/RewardPoolDetails';
import StakingPoolDetails from './components/Pools/StakingPool/StakingPoolDetails';
import Modal from './components/Modal/Modal';
import AppContext from './ContextAPI';

const App = () => {
	const dateEnd = new Date("01/30/2021 12:00:00").getTime();
	const [selectedMenuItem, setSelectedMenuItem] = useState(0);
	const [toggleSidebar, setToggleSidebar] = useState(false);
	const [connected, setConnected] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [modalType, setModalType] = useState('');
	const [ticketAmountRP, setTicketAmountRP] = useState(1);
	const [tokenIsEnabledRP, setTokenIsEnabledRP] = useState(false);
	const [ticketAmountSP, setTicketAmountSP] = useState(1);
	const [tokenIsEnabledSP, setTokenIsEnabledSP] = useState(false);
	const [poolType, setPoolType] = useState('');

	const setNewTime = (setCountdown) => {
        const currentTime = new Date().getTime();
        const countdownDate = dateEnd;

        let distanceToDate = countdownDate - currentTime;

        let daysLeft = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
        let hoursLeft = Math.floor((distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutesLeft = Math.floor((distanceToDate % (1000 * 60 * 60)) / (1000 * 60));
        let secondsLeft = Math.floor((distanceToDate % (1000 * 60)) / 1000);

        setCountdown({
            days: daysLeft,
            hours: hoursLeft,
            minutes: minutesLeft,
            seconds: secondsLeft,
        });
	};
	
	useEffect(() => {
		switch (window.location.pathname) {
			case '/my-account': 
				setSelectedMenuItem(1);
				break;
			case '/leaderboard': 
				setSelectedMenuItem(2);
				break;
			default: 
				setSelectedMenuItem(0);
		}
	}, [])

	return (
		<AppContext.Provider
			value={{
				dateEnd,
				selectedMenuItem,
				setSelectedMenuItem,
				connected,
				setConnected,
				openModal,
				setOpenModal,
				modalType,
				setModalType,
				setNewTime,
				toggleSidebar,
				setToggleSidebar,
				ticketAmountRP,
				setTicketAmountRP,
				tokenIsEnabledRP,
				setTokenIsEnabledRP,
				ticketAmountSP,
				setTicketAmountSP,
				tokenIsEnabledSP,
				setTokenIsEnabledSP,
				poolType,
				setPoolType
			}}
		>
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
							<Route path="*" component={() => <Pools />} />
						</Switch>
					</div>
				</div>
				{openModal &&
					<Modal />
				}
			</Routes>
		</AppContext.Provider>
	);
}

export default App;
