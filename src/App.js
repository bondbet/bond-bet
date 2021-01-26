import React, { useState, useEffect, useCallback } from 'react';
import './assets/css/App.css';
import './assets/css/Responsive.css';
import { Web3Provider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';
import { getChainData } from './helpers/chain-utils';
import { getProviderOptions } from './constants/provider-options';
import Main from './components/Main';
import BarnBridgeToken from './constants/abis/BarnBridgeToken.json'
import {getContract} from './helpers/ethers'
import {BARN_PRIZE_POOL_ADDRESS, PRIZE_STRATEGY_CONTRACT_ADDRESS, BOND_TICKETS_CONTRACT_ADDRESS} from './constants/contracts'
import BarnPrizePool from './constants/abis/BarnPrizePool.json'
import PrizeStrategy from './constants/abis/PeriodicPrizeStrategy.json';
import ControlledToken from './constants/abis/ControlledToken.json';

const App = () => {
	const [provider, setProvider] = useState(null);
	const [connected, setConnected] = useState(false);
	const [connectedNetwork, setConnectedNetwork] = useState('');
	const [connectedWalletAddress, setConnectedWalletAddress] = useState('');
	const [connectedWalletName, setConnectedWalletName] = useState('');
	const [chainId, setChainId] = useState(1);
	const [barnPrizePoolContract, setBarnPrizePoolContract] = useState(null)
	const [bondTokenContract, setBondTokenContract] = useState(null);
	const [bondTicketsContract, setBondTicketsContrat] = useState(null);
	const [prizeStrategyContract, setPrizeStrategyContract] = useState(null);

	const getNetwork = () => getChainData(chainId).network;

	const web3Modal = new Web3Modal({
		network: getNetwork(),
		cacheProvider: true,
		providerOptions: getProviderOptions()
	  });

	
 
	useEffect(() => {
		if (web3Modal.cachedProvider) {
			connectWalletHandler()
		  }
	}, []);

	let firstInit = true;
	const connectWalletHandler = useCallback(async () => {
		if(!firstInit) {
			web3Modal.clearCachedProvider();
			
		}
		firstInit = false;
		let newProvider =  await web3Modal.connect();

		const library = new Web3Provider(newProvider);
		const network = await library.getNetwork();
	
		const address = newProvider.selectedAddress ? newProvider.selectedAddress : newProvider?.accounts[0];

		const barnPrizePoolContractCode = await  library.getCode(BARN_PRIZE_POOL_ADDRESS);
		if(barnPrizePoolContractCode.length > 2) {
			const newBarnPrizePoolContract = getContract(BARN_PRIZE_POOL_ADDRESS, BarnPrizePool.abi, library, address);

	
			const bondTokenAddress = await newBarnPrizePoolContract.token();
		
			const newBondTokenContract = getContract(bondTokenAddress, BarnBridgeToken.abi, library, address);
			const newPrizeStrategyContract = getContract(PRIZE_STRATEGY_CONTRACT_ADDRESS, PrizeStrategy.abi, library, address);
			const newBondTicketsContract = getContract(BOND_TICKETS_CONTRACT_ADDRESS, ControlledToken.abi, library, address);

			setPrizeStrategyContract(newPrizeStrategyContract);
			setBarnPrizePoolContract(newBarnPrizePoolContract);
			setBondTokenContract(newBondTokenContract);
			setBondTicketsContrat(newBondTicketsContract);
		}
		

		setConnectedWalletAddress(address);
		setConnectedNetwork(network.name);
		setConnectedWalletName(library.connection.url === 'metamask' ? 'MetaMask' : 'WalletConnect')
		setConnected(true);
		setProvider(newProvider)
		await subscribeToProviderEvents(newProvider);

	});

	const disconnectWalletHandler = useCallback(async (provider) => {

		web3Modal.clearCachedProvider();
		   
		localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
		localStorage.removeItem("walletconnect");


		setBarnPrizePoolContract(null);
		setBondTokenContract(null);
		setBondTicketsContrat(null);
		setPrizeStrategyContract(null);
		setConnectedWalletAddress("");
		setConnectedNetwork(null);
		setConnectedWalletName("");
		setConnected(false);
		setProvider(null)		
		
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
		setConnectedNetwork(network.name);
	  });
	const subscribeToProviderEvents = (provider) => {

		if(provider) {
			if (!provider.on) {
				return;
			  }

			  provider.on("accountsChanged", changedAccount);
			  provider.on("disconnect", disconnect);
			  provider.on("networkChanged", () => networkChanged(provider));
		}
		
	};
	const disconnect = async (err) => {
		disconnectWalletHandler();
	  }


	return (
		<Main 
			bondTicketsContract={bondTicketsContract}
			prizeStrategyContract={prizeStrategyContract}
			barnPrizePoolContract={barnPrizePoolContract}
			bondTokenContract={bondTokenContract}
			provider={provider} 
			connectedNetwork={connectedNetwork} 
			connectedWalletAddress={connectedWalletAddress}
			connectedWalletName={connectedWalletName}
			connected={connected}
			disconnectWalletHandler={disconnectWalletHandler}
			connectWalletHandler={connectWalletHandler}
		></Main>
	)

}

export default App;





