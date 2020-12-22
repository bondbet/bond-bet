import { useState } from 'react';
import './App.css';
import { BrowserRouter as Routes, Route, Redirect } from 'react-router-dom';
import Pools from './components/Pools/Pools';
import MyAccount from './components/MyAccount/MyAccount';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
	const [selectedMenuItem, setSelectedMenuItem] = useState(0);

	return (
	  	<Routes>
			<Header selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem} />
			<div className='app-wrapper'>
				<Sidebar selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem} />
				<div className='app-content'>
					<Route path="/" component={Pools} exact />
					<Route path="/my-account" component={MyAccount} exact />
					<Route path="/leaderboard" component={LeaderBoard} exact />
					<Route render={() => <Redirect to="/" />} />
				</div>
			</div>
		</Routes>
	);
}

export default App;
