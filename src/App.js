import React, { useState, useEffect, useCallback } from 'react';
import './assets/css/App.css';
import './assets/css/Responsive.css';
import { Web3Provider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';
import { getChainData } from './helpers/chain-utils';
import { getProviderOptions } from './constants/provider-options';
import Main from './components/Main';
import BarnBridgeToken from './constants/abis/BarnBridgeToken.json'
import { getContract } from './helpers/ethers'
import { BARN_PRIZE_POOL_ADDRESS, PRIZE_STRATEGY_CONTRACT_ADDRESS, BOND_TICKETS_CONTRACT_ADDRESS } from './constants/contracts'
import BarnPrizePool from './constants/abis/BarnPrizePool.json'
import MultipleWinners from './constants/abis/MultipleWinners.json';
import ControlledToken from './constants/abis/ControlledToken.json';
import BarnFacetMock from './constants/abis/BarnFacetMock.json';
import { connect } from 'react-redux';
import { ACTION_TYPE } from './store/action-type';


const App = (
	{
		setPrizePoolContract,
		setMainAssetTokenContract,
		setTicketsContract,
		setPrizeStrategyContract,
		setMainAssetContract,

		setProvider,
		setConnected,
		setConnectedNetwork,
		setConnectedWalletAddress,
		setConnectedWalletName,
		setChainId,
		connectedWalletAddress,
		connected,
		connectedWalletName,
		provider,
		connectedNetwork,
		chainId,
	}) => {



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
		try {


			if (!firstInit) {
				web3Modal.clearCachedProvider();

			}
			firstInit = false;

			let newProvider = await web3Modal.connect();

			const library = new Web3Provider(newProvider);
			const network = await library.getNetwork();

			const address = newProvider.selectedAddress ? newProvider.selectedAddress : newProvider?.accounts[0];

			const barnPrizePoolContractCode = await library.getCode(BARN_PRIZE_POOL_ADDRESS);
			if (barnPrizePoolContractCode.length > 2) {
				const newBarnPrizePoolContract = getContract(BARN_PRIZE_POOL_ADDRESS, BarnPrizePool.abi, library, address);


				const bondTokenAddress = await newBarnPrizePoolContract.token();

				const newBondTokenContract = getContract(bondTokenAddress, BarnBridgeToken.abi, library, address);
				const newPrizeStrategyContract = getContract(PRIZE_STRATEGY_CONTRACT_ADDRESS, MultipleWinners.abi, library, address);
				const newBondTicketsContract = getContract(BOND_TICKETS_CONTRACT_ADDRESS, ControlledToken.abi, library, address);
				const barnTokenAddress = await newBarnPrizePoolContract.barn();

				const newBarnContract = getContract(barnTokenAddress, BarnFacetMock.abi, library, address);



				setMainAssetContract(newBarnContract);
				setPrizeStrategyContract(newPrizeStrategyContract);
				setPrizePoolContract(newBarnPrizePoolContract);
				setMainAssetTokenContract(newBondTokenContract);
				setTicketsContract(newBondTicketsContract);
			}


			setConnectedWalletAddress(address);
			setConnectedNetwork(network.name);
			setConnectedWalletName(library.connection.url === 'metamask' ? 'MetaMask' : 'WalletConnect')
			setConnected(true);
			setProvider(newProvider)
			await subscribeToProviderEvents(newProvider);
		} catch (e) {
			alert('Something went wrong when connecting the contracts. Please check your connected network.')
		}
	});

	const disconnectWalletHandler = useCallback(async (provider) => {

		web3Modal.clearCachedProvider();

		localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
		localStorage.removeItem("walletconnect");


		setPrizePoolContract(null);
		setMainAssetTokenContract(null);
		setTicketsContract(null);
		setPrizeStrategyContract(null);
		setMainAssetContract(null);
		setConnectedWalletAddress("");
		setConnectedNetwork(null);
		setConnectedWalletName("");
		setConnected(false);
		setProvider(null)

	});

	const changedAccount = (accounts) => {
		if (Array.isArray(accounts) && accounts.length > 0) {
			setConnectedWalletAddress(accounts[0]);
		} else {
			disconnectWalletHandler()
		}
	}

	const networkChanged = useCallback(async (provider) => {
		try {
			const library = new Web3Provider(provider);
			const network = await library.getNetwork();
			const chainId = network.chainId;


			setChainId(chainId);
			setConnectedNetwork(network.name);
		} catch (e) {
			alert('Smething went wrong when chaning network, please refresh')
		}

	});
	const subscribeToProviderEvents = (provider) => {

		if (provider) {
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
const mapStateToProps = (
	{
		connectedWalletAddress,
		connected,
		connectedWalletName,
		provider,
		connectedNetwork,
		chainId,
	}
) => (
	{
		connectedWalletAddress,
		connected,
		connectedWalletName,
		provider,
		connectedNetwork,
		chainId,
	}
)
const mapDispatchToProps = dispatch => ({
	setPrizePoolContract: value => dispatch({ type: ACTION_TYPE.PRIZE_POOL_CONTRACT, value }),
	setMainAssetTokenContract: value => dispatch({ type: ACTION_TYPE.MAIN_ASSET_TOKEN_CONTRACT, value }),
	setTicketsContract: value => dispatch({ type: ACTION_TYPE.TICKETS_CONTRACT, value }),
	setPrizeStrategyContract: value => dispatch({ type: ACTION_TYPE.PRIZE_STRATEGY_CONTRACT, value }),
	setMainAssetContract: value => dispatch({ type: ACTION_TYPE.MAIN_ASSET_CONTRACT, value }),
	setProvider: value => dispatch({ type: ACTION_TYPE.PROVIDER, value }),
	setConnected: value => dispatch({ type: ACTION_TYPE.CONNECTED, value }),
	setConnectedNetwork: value => dispatch({ type: ACTION_TYPE.CONNECTED_NETWORK, value }),
	setConnectedWalletAddress: value => dispatch({ type: ACTION_TYPE.CONNECTED_WALLET_ADDRESS, value }),
	setConnectedWalletName: value => dispatch({ type: ACTION_TYPE.CONNECTED_WALLET_NAME, value }),
	setChainId: value => dispatch({ type: ACTION_TYPE.CHAIN_ID, value })
})
export default connect(mapStateToProps, mapDispatchToProps)(App);





