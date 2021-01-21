import React, { useState, useEffect, useCallback } from 'react';
import userEvent from '@testing-library/user-event';
import AppContext from '../ContextAPI';
import Router from '../Router';

const Main = (props) => {
    
    const dateStart = new Date("12/23/2020 12:00:00").getTime()
	const dateEnd = new Date("01/30/2021 12:00:00").getTime();
	const [selectedMenuItem, setSelectedMenuItem] = useState(0);
	const [toggleSidebar, setToggleSidebar] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [modalType, setModalType] = useState('');
	const [ticketAmountRP, setTicketAmountRP] = useState('');
	const [totalTicketAmountRP, setTotalTicketAmountRP] = useState(0);
	const [tokenIsEnabledRP, setTokenIsEnabledRP] = useState(false);
	const [maxAmountSelected, setMaxAmountSelected] = useState(false);
	const [withdrawAmountRP, setWithdrawAmountRP] = useState('');
	


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
				ticketAmountRP,
				setTicketAmountRP,
				tokenIsEnabledRP,
				setTokenIsEnabledRP,
				maxAmountSelected,
				setMaxAmountSelected,
				totalTicketAmountRP,
				setTotalTicketAmountRP,
				withdrawAmountRP,
				setWithdrawAmountRP
			}}
		>
			<Router openModal={openModal} />
		</AppContext.Provider>
    );
}

export default Main;
