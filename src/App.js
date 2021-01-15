import React, { useState, useEffect } from 'react';
import './assets/css/App.css';
import './assets/css/Responsive.css';
import AppContext from './ContextAPI';
import Router from './Router';

import { Web3Provider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';

import WalletConnectProvider from '@walletconnect/web3-provider';
import { getChainData } from './helpers/utilities';

const  getNetwork = () => getChainData(this.state.chainId).network;


const web3Modal = new Web3Modal({
	network: getNetwork(),
	cacheProvider: true,
	providerOptions: getProviderOptions()
  });

const getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "3ee53f30c759434fbee4aec9d1a3da39"
        }
      }
    };
    return providerOptions;
  }; 
const App = () => {
	const dateStart = new Date("12/23/2020 12:00:00").getTime()
	const dateEnd = new Date("01/30/2021 12:00:00").getTime();
	const [connected, setConnected] = useState(false);
	const [selectedMenuItem, setSelectedMenuItem] = useState(0);
	const [toggleSidebar, setToggleSidebar] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [modalType, setModalType] = useState('');
	const [ticketAmountRP, setTicketAmountRP] = useState('');
	const [totalTicketAmountRP, setTotalTicketAmountRP] = useState(0);
	const [tokenIsEnabledRP, setTokenIsEnabledRP] = useState(false);
	const [ticketAmountSP, setTicketAmountSP] = useState('');
	const [totalTicketAmountSP, setTotalTicketAmountSP] = useState(0);
	const [tokenIsEnabledSP, setTokenIsEnabledSP] = useState(false);
	const [poolType, setPoolType] = useState('');
	const [maxAmountSelected, setMaxAmountSelected] = useState(false);
	const [withdrawAmountRP, setWithdrawAmountRP] = useState('');
	const [withdrawAmountSP, setWithdrawAmountSP] = useState('');
	
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

	const subscribeProvider = async (provider) => {
		if (!provider.on) {
		  return;
		}
		provider.on("close", () => this.resetApp());
		provider.on("accountsChanged", async (accounts) => {
		  await this.setState({ address: accounts[0] });
		});
	
		provider.on("networkChanged", async (networkId) => {
		  const library = new Web3Provider(provider);
		  const network = await library.getNetwork();
		  const chainId = network.chainId;
	
		  await this.setState({ chainId, library });
		});
	  };


	const connectedWalletAddress = 'asdas';
	const connectWalletHandler = async () => {
		const provider = await web3Modal.connect();

		await subscribeProvider(provider);
	
		const library = new Web3Provider(provider);
		const network = await library.getNetwork();
	
		const address = provider.selectedAddress ? provider.selectedAddress : provider?.accounts[0];

		console.log(network, address)
		setConnected(true)
	}
	return (
		<AppContext.Provider
			value={{
				connectedWalletAddress,
				connectWalletHandler,
				dateStart,
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
				setPoolType,
				maxAmountSelected,
				setMaxAmountSelected,
				totalTicketAmountRP,
				setTotalTicketAmountRP,
				totalTicketAmountSP,
				setTotalTicketAmountSP,
				withdrawAmountRP,
				setWithdrawAmountRP,
				withdrawAmountSP,
				setWithdrawAmountSP
			}}
		>
			<Router openModal={openModal} />
		</AppContext.Provider>
	);
}

export default App;
