import React, { useState, useEffect, useCallback } from 'react';
import AppContext from '../ContextAPI';
import Router from '../Router';
import { BARN_PRIZE_POOL_ADDRESS, BOND_TICKETS_CONTRACT_ADDRESS } from '../constants/contracts';
import {BigNumber} from 'ethers';
import {getUtcTimestamp} from './../helpers/date';

import * as ethers from 'ethers';

const Main = (props) => {
    
	const [selectedMenuItem, setSelectedMenuItem] = useState(0);
	const [toggleSidebar, setToggleSidebar] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [modalType, setModalType] = useState('');
    const [bondBalance, setBondBalance] = useState(0);
    const [bondAllowance, setBondAllowance] = useState(0);
    const [getTicketsLoading, setGetTicketsLoading] = useState(false); 
    const [getTicketsTxId, setGetTicketsTxId] = useState(false);
    const [ticketsBalance, setTicketsBalance] = useState(0);
    const [prizePeriodStartedAt, setPrizePeriodStartedAt] = useState(0);
    const [prizePeriodEnds, setPrizePeriodEnds] = useState(0);
    const [prizePoolRemainingSeconds, setPrizePoolRemainingSeconds] = useState(0);
    const [totalTicketAmount, setTotalTicketAmount] = useState(0);

    useEffect(async () => {
        if(props.bondTokenContract && props.connectedWalletAddress) {
            const bondTokenBalance = await props.bondTokenContract.balanceOf(props.connectedWalletAddress)
            setBondBalance(bondTokenBalance);

            const allowance = await props.bondTokenContract.allowance(props.connectedWalletAddress, BARN_PRIZE_POOL_ADDRESS);
            setBondAllowance(allowance);
        } 
       if(props.bondTicketsContract && props.connectedWalletAddress) {
           const bondTicketsBalance = await props.bondTicketsContract.balanceOf(props.connectedWalletAddress);
           setTicketsBalance(bondTicketsBalance);
       }
    }, [props.connectedWalletAddress, props.bondTokenContract, props.connectedNetwork])

    useEffect(async () => {
        if(props.prizeStrategyContract) {
            setPrizePeriodEnds(await props.prizeStrategyContract.prizePeriodEndAt());
            setPrizePeriodStartedAt(await props.prizeStrategyContract.prizePeriodStartedAt())
            setPrizePoolRemainingSeconds(await props.prizeStrategyContract.prizePeriodRemainingSeconds())
        }
    }, [props.prizeStrategyContract])

    useEffect(async () => {
        if(props.barnPrizePoolContract) {
            setTotalTicketAmount(await props.barnPrizePoolContract.accountedBalance())
        }
    }, [props.barnPrizePoolContract])
    const allowBondHandler = useCallback(async ()=> {

            const approveTx = await props.bondTokenContract.approve(BARN_PRIZE_POOL_ADDRESS, ethers.constants.MaxUint256)
            setGetTicketsLoading(true);
            setGetTicketsTxId(approveTx.hash);
            await approveTx.wait();
            setBondAllowance(BigNumber.from(Number.MAX_SAFE_INTEGER + ''));
            setGetTicketsLoading(false);
            setGetTicketsTxId('')

    })
    const setNewTime = (setCountdown) => { 
            const currentTime = getUtcTimestamp();
            const countdownDate = prizePeriodEnds.toNumber();
    
           
            let distanceToDateInMilliseconds = (countdownDate - currentTime) * 1000;

            let daysLeft = Math.floor(distanceToDateInMilliseconds / (1000 * 60 * 60 * 24));
            let hoursLeft = Math.floor((distanceToDateInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutesLeft = Math.floor((distanceToDateInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
            let secondsLeft = Math.floor((distanceToDateInMilliseconds % (1000 * 60)) / 1000);
    
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

    const ticketDepositHandler = useCallback(async (ticketAmount) => {
        setModalType('CD')
        const depositTx = await props.barnPrizePoolContract.depositTo(props.connectedWalletAddress, ethers.utils.parseEther(ticketAmount), BOND_TICKETS_CONTRACT_ADDRESS, "0x0000000000000000000000000000000000000000");
        setGetTicketsLoading(true);
        setGetTicketsTxId(depositTx.hash)
        const deposit = await depositTx.wait();
        setTicketsBalance(ticketsBalance.add(ethers.utils.parseEther(ticketAmount + '')))
        setGetTicketsLoading(false);
        setGetTicketsTxId('');
        setModalType('DC');

    })
    return (
		<AppContext.Provider
			value={{
				provider: props.provider,
				connectedNetwork: props.connectedNetwork,
				connectedWalletAddress: props.connectedWalletAddress,
				connectWalletHandler: props.connectWalletHandler,
				connectedWalletName: props.connectedWalletName,
                disconnectWalletHandler: props.disconnectWalletHandler,
                connected: props.connected,

                totalTicketAmount,
                ticketsBalance,
                prizePoolRemainingSeconds,
                ticketDepositHandler,
                getTicketsLoading,
                getTicketsTxId,
                bondAllowance,
                allowBondHandler,
                bondBalance,
                prizePeriodStartedAt,
				prizePeriodEnds,
				selectedMenuItem,
				setSelectedMenuItem,				
				openModal,
				setOpenModal,
				modalType,
				setModalType,
				setNewTime,
				toggleSidebar,
                setToggleSidebar,
			}}
		>
			<Router openModal={openModal} />
		</AppContext.Provider>
    );
}

export default Main;
