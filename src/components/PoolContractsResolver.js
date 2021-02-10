import React, {  useEffect } from 'react';
import BarnBridgeToken from '../constants/abis/BarnBridgeToken.json'
import { getContract } from '../helpers/ethers'
import MultipleWinners from '../constants/abis/MultipleWinners.json';
import ControlledToken from '../constants/abis/ControlledToken.json';
import BarnFacetMock from '../constants/abis/BarnFacetMock.json';
import { connect } from 'react-redux';
import { ACTION_TYPE } from '../store/action-type';
import { POOL_TYPE } from '../store/pool-type';


const PoolContractsResolver = (
	{
		setPrizePoolContract,
		setMainAssetTokenContract,
		setTicketsContract,
		setPrizeStrategyContract,
		setMainAssetContract,

		connectedWalletAddress,
		connected,
		connectedWalletName,
		provider,
		connectedNetwork,
		library,
		
		prizePoolAddress,
		prizePoolAbi,
		prizeStrategyAddress,
		ticketsAddress,
		underlyingTokenAddress,
		poolType
	}) => {


	useEffect(async () => { 

		if(connected && provider && library && connectedWalletAddress && connectedNetwork) {
			try {	

				const prizePoolContractCode = await library.getCode(prizePoolAddress);
				if (prizePoolContractCode.length > 2) {
					const newBarnPrizePoolContract = getContract(prizePoolAddress, prizePoolAbi, library, connectedWalletAddress);
	
	
					const newTokenContract = getContract(underlyingTokenAddress, BarnBridgeToken.abi, library, connectedWalletAddress);
					const newPrizeStrategyContract = getContract(prizeStrategyAddress, MultipleWinners.abi, library, connectedWalletAddress);
					const newTicketsContract = getContract(ticketsAddress, ControlledToken.abi, library, connectedWalletAddress);
					
					
					let mainAssetTokenAddress;
	
					mainAssetTokenAddress = poolType === POOL_TYPE.COMMUNITY_REWARD_POOL ? await newBarnPrizePoolContract.barn() : underlyingTokenAddress;
					const newMainAssetContract = getContract(mainAssetTokenAddress, BarnFacetMock.abi, library, connectedWalletAddress);

					setMainAssetContract(newMainAssetContract);
					setPrizeStrategyContract(newPrizeStrategyContract);
					setPrizePoolContract(newBarnPrizePoolContract);
					setMainAssetTokenContract(newTokenContract);
					setTicketsContract(newTicketsContract);
				}
			} catch (e) {

				alert('Something went wrong when connecting the contracts. Please check your connected network.')
			}
		}

	},[provider, library, connectedWalletAddress, connectedWalletName, connectedNetwork, connected]);

	useEffect(async () => {
		if(!connected && provider && library && connectedWalletAddress && connectedNetwork) {

		setPrizePoolContract(null);
		setMainAssetTokenContract(null);
		setTicketsContract(null);
		setPrizeStrategyContract(null);
		setMainAssetContract(null);
		}
	},[provider, library, connectedWalletAddress, connectedWalletName, connectedNetwork, connected]);



	return (
	<div></div>
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
		library
	}
) => (
	{
		connectedWalletAddress,
		connected,
		connectedWalletName,
		provider,
		connectedNetwork,
		chainId,
		library
	}
)

const mapDispatchToProps = (dispatch, {poolType}) => {
	return {
		setPrizePoolContract: value => dispatch({ type: ACTION_TYPE.PRIZE_POOL_CONTRACT, value,poolType }),
		setMainAssetTokenContract: value => dispatch({ type: ACTION_TYPE.MAIN_ASSET_TOKEN_CONTRACT, value,poolType }),
		setTicketsContract: value => dispatch({ type: ACTION_TYPE.TICKETS_CONTRACT, value,poolType }),
		setPrizeStrategyContract: value => dispatch({ type: ACTION_TYPE.PRIZE_STRATEGY_CONTRACT, value,poolType }),
		setMainAssetContract: value => dispatch({ type: ACTION_TYPE.MAIN_ASSET_CONTRACT, value,poolType }),
	}
	
}
export default connect(mapStateToProps, mapDispatchToProps)(PoolContractsResolver);





