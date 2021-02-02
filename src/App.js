import React, { useEffect, useCallback } from 'react';
import './assets/css/App.css';
import './assets/css/Responsive.css';
import { Web3Provider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';
import { getChainData } from './helpers/chain-utils';
import { getProviderOptions } from './constants/provider-options';
import Main from './components/Main';
import { connect } from 'react-redux';
import { ACTION_TYPE } from './store/action-type';
import { POOL_TYPE } from './store/pool-type';
import PoolContractsResolver from './components/PoolContractsResolver';
import {BARN_PRIZE_POOL_RINKEBY_ADDRESS, BOND_TICKETS_RINKEBY_CONTRACT_ADDRESS, BOND_UNDELYING_TOKEN_ADDRESS, PRIZE_POOL_MAIN_NET_ADDRESS, PRIZE_STRATEGY_CONTRACT_ADDRESS, PRIZE_STRATEGY_MAIN_NET_ADDRESS, PRIZE_STRATEGY_RINKEBY_CONTRACT_ADDRESS, STAKE_POOL_RINKEBY_PRIZE_POOL_ADDRESS, STAKE_POOL_RINKEBY_PRIZE_STRATEGY_ADDRESS, STAKE_POOL_RINKEBY_TICKET_ADDRESS, STAKE_POOL_RINKEBY_UNDELYING_TOKEN_ADDRESS, TICKETS_MAIN_NET_ADDRESS, UNDERLYING_TOKEN_MAIN_NET } from './constants/contracts';
import Router from './Router';
import BarnPrizePool from './constants/abis/BarnPrizePool.json'
import StakePrizePool from './constants/abis/StakePrizePool.json'

import AppContext from './ContextAPI'
const App = (
	{
		setProvider,
		setConnected,
		setConnectedNetwork,
		setConnectedWalletAddress,
		setConnectedWalletName,
		setLibrary,
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


			setConnectedWalletAddress(address);
			setConnectedNetwork(network.name);
			setConnectedWalletName(library.connection.url === 'metamask' ? 'MetaMask' : 'WalletConnect')
			setConnected(true);
			setProvider(newProvider);
			setLibrary(library);
			await subscribeToProviderEvents(newProvider);
		} catch (e) {
			console.log(e)
			alert('Something went wrong when connecting the contracts. Please check your connected network.')
		}
	});

	const disconnectWalletHandler = useCallback(async (provider) => {

		web3Modal.clearCachedProvider();

		localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
		localStorage.removeItem("walletconnect");

		setConnectedWalletAddress("");
		setConnectedNetwork(null);
		setConnectedWalletName("");
		setConnected(false);
		setProvider(null)
		setLibrary(null);
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
			setLibrary(library);
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


	return ( <div>
	
	<AppContext.Provider
            value={{
                
                disconnectWalletHandler,
                connectWalletHandler,

            }}
        >
		
		<Main
			provider={provider}
			connectedNetwork={connectedNetwork}
			connectedWalletAddress={connectedWalletAddress}
			connectedWalletName={connectedWalletName}
			connected={connected}

			

			poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}
		></Main>
		<Main
				provider={provider}
				connectedNetwork={connectedNetwork}
				connectedWalletAddress={connectedWalletAddress}
				connectedWalletName={connectedWalletName}
				connected={connected}
 
			poolType={POOL_TYPE.NEW_POOL}
		></Main>

		<PoolContractsResolver 
			poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}
			prizePoolAddress={BARN_PRIZE_POOL_RINKEBY_ADDRESS}
			
			underlyingTokenAddress={BOND_UNDELYING_TOKEN_ADDRESS}
			prizeStrategyAddress={PRIZE_STRATEGY_RINKEBY_CONTRACT_ADDRESS}
			prizePoolAbi={BarnPrizePool.abi}
			ticketsAddress={BOND_TICKETS_RINKEBY_CONTRACT_ADDRESS}></PoolContractsResolver>

<PoolContractsResolver 
			poolType={POOL_TYPE.NEW_POOL}
			prizePoolAddress={STAKE_POOL_RINKEBY_PRIZE_POOL_ADDRESS}
			
			underlyingTokenAddress={STAKE_POOL_RINKEBY_UNDELYING_TOKEN_ADDRESS}
			prizeStrategyAddress={STAKE_POOL_RINKEBY_PRIZE_STRATEGY_ADDRESS}
			prizePoolAbi={StakePrizePool.abi}
			ticketsAddress={STAKE_POOL_RINKEBY_TICKET_ADDRESS}></PoolContractsResolver>


				{/* <PoolContractsResolver 
			poolType={POOL_TYPE.NEW_POOL}
			prizePoolAddress={PRIZE_POOL_MAIN_NET_ADDRESS}
			
			underlyingTokenAddress={UNDERLYING_TOKEN_MAIN_NET}
			prizePoolAbi={StakePrizePool.abi}
			prizeStrategyAddress={PRIZE_STRATEGY_MAIN_NET_ADDRESS}
			ticketsAddress={TICKETS_MAIN_NET_ADDRESS}></PoolContractsResolver> */}
					<Router />
			    </AppContext.Provider>
		
		</div>
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
const mapDispatchToProps = (dispatch) => {


	const poolType = POOL_TYPE.COMMUNITY_REWARD_POOL;
	return {
		setPrizePoolContract: value => dispatch({ type: ACTION_TYPE.PRIZE_POOL_CONTRACT, value,poolType }),
		setMainAssetTokenContract: value => dispatch({ type: ACTION_TYPE.MAIN_ASSET_TOKEN_CONTRACT, value,poolType }),
		setTicketsContract: value => dispatch({ type: ACTION_TYPE.TICKETS_CONTRACT, value,poolType }),
		setPrizeStrategyContract: value => dispatch({ type: ACTION_TYPE.PRIZE_STRATEGY_CONTRACT, value,poolType }),
		setMainAssetContract: value => dispatch({ type: ACTION_TYPE.MAIN_ASSET_CONTRACT, value,poolType }),
		setProvider: value => dispatch({ type: ACTION_TYPE.PROVIDER, value }),
		setConnected: value => dispatch({ type: ACTION_TYPE.CONNECTED, value }),
		setConnectedNetwork: value => dispatch({ type: ACTION_TYPE.CONNECTED_NETWORK, value }),
		setConnectedWalletAddress: value => dispatch({ type: ACTION_TYPE.CONNECTED_WALLET_ADDRESS, value }),
		setConnectedWalletName: value => dispatch({ type: ACTION_TYPE.CONNECTED_WALLET_NAME, value }),
		setChainId: value => dispatch({ type: ACTION_TYPE.CHAIN_ID, value }),
		setLibrary: value => dispatch({type: ACTION_TYPE.LIBRARY, value})
	}
	
}
export default connect(mapStateToProps, mapDispatchToProps)(App);





