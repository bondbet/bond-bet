import React, { useState, useEffect, useCallback } from 'react';
import './assets/css/App.css';
import './assets/css/Responsive.css';
import AppContext from './ContextAPI';
import Router from './Router';
import * as ethers from 'ethers'
import { Web3Provider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';
import { getChainData, getNetwork } from './helpers/chain-utils';
import { getProviderOptions } from './constants/provider-options';
import userEvent from '@testing-library/user-event';
import { BARN_PRIZE_POOL_ADDRESS } from './constants/contracts';
import BarnPrizePool from './constants/abis/BarnPrizePool.json'

import BarnBridgeToken from './constants/abis/BarnBridgeToken.json'
import BarnFacetMock from './constants/abis/BarnFacetMock.json'
import {getContract} from './helpers/ethers'

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
	const [chainId, setChainId] = useState(1);
	const [library, setLibrary] = useState(null);
	const [connectedNetwork, setConnectedNetwork] = useState('');

	const [provider, setProvider] = useState(null)
	const [connectedWalletAddress, setConnectedWalletAddress] = useState('');
	const [connectedWalletName, setConnectedWalletName] = useState('');
	const [bondBalance, setBondBalance] = useState(0);
	const [bondTokenContract, setBondTokenContract] = useState(null)
	const [barnPrizePoolContract, setBarnPrizePoolContract] = useState(null)
	
	const getNetwork = () => getChainData(chainId).network;

	const web3Modal = new Web3Modal({
		network: getNetwork(),
		cacheProvider: true,
		providerOptions: getProviderOptions()
	  });

	const setNewTime = useCallback((setCountdown) => { 
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
	},[]);
	
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
 
	useEffect(() => {
		if (web3Modal.cachedProvider) {
			connectWalletHandler()
		  }
	}, []);

	let firstInit = true;
	const connectWalletHandler = useCallback(async (goToGetTicketsModal) => {
		if(!firstInit) {
			web3Modal.clearCachedProvider();
			
		}
		firstInit = false;
		let newProvider =  await web3Modal.connect();

		const library = new Web3Provider(newProvider);
		const network = await library.getNetwork();
	
		const address = newProvider.selectedAddress ? newProvider.selectedAddress : newProvider?.accounts[0];


		const barnPrizePoolContract = getContract(BARN_PRIZE_POOL_ADDRESS, BarnPrizePool.abi, library, address);

		const bondTokenAddress = await barnPrizePoolContract.token();
	
		const bondTokenContract = getContract(bondTokenAddress, BarnBridgeToken.abi, library, address);


		setBarnPrizePoolContract(barnPrizePoolContract)
		setBondTokenContract(bondTokenContract)
		setBondBalance(await bondTokenContract.balanceOf(address));
		setConnectedWalletAddress(address);
		setLibrary(library);
		setConnectedNetwork(network.name);
		setConnectedWalletName(library.connection.url === 'metamask' ? 'MetaMask' : 'WalletConnect')
		setConnected(true);
		setProvider(newProvider)
		await subscribeToProviderEvents(newProvider);
		if(goToGetTicketsModal) {
			setOpenModal(true); setModalType('GT'); setPoolType('RP') 
		}
	});

	const disconnectWalletHandler = useCallback(async (provider) => {

		web3Modal.clearCachedProvider();
		   
		localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
		localStorage.removeItem("walletconnect");

		
		setConnectedWalletAddress("");
		setLibrary(null);
		setBondBalance(0);
		setConnectedNetwork(null);
		setConnectedWalletName("");
		setConnected(false);
		setProvider(null)
		await unsubscribeToProviderEvents(provider);
		
		
	});

	const changedAccount = (accounts) => {
		if(Array.isArray(accounts) && accounts.length >0) {
			setConnectedWalletAddress(accounts[0]);
		} else {
			disconnectWalletHandler()
		}
	}

	const networkChanged = useCallback(async (provider) => {
		const library = new Web3Provider(provider);
		const network = await library.getNetwork();
		const chainId = network.chainId;
  

		setChainId(chainId);
		setLibrary(library);
		setConnectedNetwork(network.name);
	  });
	const subscribeToProviderEvents = (provider) => {

		if(provider) {
			if (!provider.on) {
				return;
			  }

			  provider.on("close", disconnect);
			  provider.on("accountsChanged", changedAccount);
			  provider.on("disconnect", disconnect);
			  provider.on("networkChanged", () => networkChanged(provider));
		}
		
	};
	const disconnect = async (err) => {
		disconnectWalletHandler();
	  }

	const unsubscribeToProviderEvents = (provider) => {
		if (!provider) {
			return;
		  }
		  console.log(provider)

		  provider.off("accountsChanged", changedAccount);
		  provider.off("networkChanged", () => networkChanged(provider));
		  provider.off("disconnect", disconnect);
		  provider.off("close", disconnect);
	}
	return (
		<AppContext.Provider
			value={{
				bondTokenContract,
				barnPrizePoolContract,
				bondBalance,
				provider,
				connectedNetwork,
				connectedWalletAddress,
				connectWalletHandler,
				connectedWalletName,
				disconnectWalletHandler,
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





