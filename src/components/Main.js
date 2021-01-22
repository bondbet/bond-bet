import React, { useState, useEffect, useCallback } from 'react';
import userEvent from '@testing-library/user-event';
import AppContext from '../ContextAPI';
import Router from '../Router';
import { BARN_PRIZE_POOL_ADDRESS, CONTROLLED_TOKEN_ADDRESS } from '../constants/contracts';
import {BigNumber} from 'ethers';
import * as ethers from 'ethers';

const Main = (props) => {
    
    const dateStart = new Date("12/23/2020 12:00:00").getTime()
	const dateEnd = new Date("01/30/2021 12:00:00").getTime();
	const [selectedMenuItem, setSelectedMenuItem] = useState(0);
	const [toggleSidebar, setToggleSidebar] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [modalType, setModalType] = useState('');
    const [bondBalance, setBondBalance] = useState(0);
    const [bondAllowance, setBondAllowance] = useState(0);
    const [getTicketsLoading, setGetTicketsLoading] = useState(false);
    const [getTicketsTxId, setGetTicketsTxId] = useState(false);
    const [ticketsBalance, setTicketsBalance] = useState(0);
    
    useEffect(async () => {
        if(props.bondTokenContract && props.connectedWalletAddress) {
            console.log('tokens', ethers.utils.formatEther(await props.barnPrizePoolContract.liquidityCap()))

            setBondBalance(await props.bondTokenContract.balanceOf(props.connectedWalletAddress));
            const allowance = await props.bondTokenContract.allowance(props.connectedWalletAddress, BARN_PRIZE_POOL_ADDRESS);
            
            console.log(await props.prizeStrategyContract)
            setBondAllowance(BigNumber.from('0'));
        } 
        
    }, [props.connectedWalletAddress, props.bondTokenContract, props.connectedNetwork])

    const allowBondHandler = useCallback(async ()=> {
        try {
            const approveTx = await props.bondTokenContract.approve(BARN_PRIZE_POOL_ADDRESS, Number.MAX_SAFE_INTEGER + '')
            setGetTicketsLoading(true);
            setGetTicketsTxId(approveTx.hash);
            await approveTx.wait()
        } catch(e) {

        }


        // Set timeout to be removed
        setTimeout(async () => {
            setBondAllowance(BigNumber.from(Number.MAX_SAFE_INTEGER + ''));
            setGetTicketsLoading(false);
            setGetTicketsTxId('')
        }, 2000);

    })
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

    const ticketDepositHandler = useCallback(async (ticketAmount) => {
        const depositTx = await props.barnPrizePoolContract.depositTo(props.connectedWalletAddress, ethers.utils.parseEther(ticketAmount), CONTROLLED_TOKEN_ADDRESS, "0x0000000000000000000000000000000000000000");
        setModalType('CD')
        const deposit = await depositTx.wait();
     
            setTimeout(() => {
                setModalType('DC');
                
            }, 3000)


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

                ticketDepositHandler,
                getTicketsLoading,
                getTicketsTxId,
                bondAllowance,
                allowBondHandler,
                bondBalance,
                dateStart,
				dateEnd,
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
