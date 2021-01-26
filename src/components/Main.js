import React, { useState, useEffect, useCallback } from 'react';
import AppContext from '../ContextAPI';
import Router from '../Router';
import { BARN_PRIZE_POOL_ADDRESS, BOND_TICKETS_CONTRACT_ADDRESS } from '../constants/contracts';
import { BigNumber } from 'ethers';
import { getUtcTimestamp } from './../helpers/date';

import * as ethers from 'ethers';
import CountdownPercantageUpdater from './Shared/PercentageUpdater';
import { getEventsTimestamps } from '../helpers/ethers';

const Main = (
    {
        connectedWalletAddress,
        connected,
        disconnectWalletHandler,
        connectedWalletName,
        bondTokenContract,
        provider,
        connectWalletHandler,
        barnPrizePoolContract,
        prizeStrategyContract,
        connectedNetwork,
        bondTicketsContract
    }) => {

    const [selectedMenuItem, setSelectedMenuItem] = useState(0);
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [bondBalance, setBondBalance] = useState(0);
    const [bondAllowance, setBondAllowance] = useState(0);
    const [getTicketsLoading, setGetTicketsLoading] = useState(false);
    const [getTicketsTxId, setGetTicketsTxId] = useState(false);
    const [withdrawLoading, setWithdrawLoading] = useState(false);
    const [withdrawTxId, setWithdrawTxId] = useState(false);
    const [ticketsBalance, setTicketsBalance] = useState(0);
    const [prizePeriodStartedAt, setPrizePeriodStartedAt] = useState(0);
    const [prizePeriodEnds, setPrizePeriodEnds] = useState(0);
    const [prizePoolRemainingSeconds, setPrizePoolRemainingSeconds] = useState(0);
    const [totalTicketAmount, setTotalTicketAmount] = useState(0);
    const [percentageTimePassed, setPercentageTimePassed] = useState(0);
    const [currentWeekPrice, setCurrentWeekPrice] = useState(0)
    const [previousAwards, setPreviousAwards] = useState([]);
    const [allDeposits, setAllDeposits] = useState([]);
    const [allWithdraws, setAllWithdraws] = useState([]);

    useEffect(async () => {
        if (bondTokenContract && connectedWalletAddress) {
            const bondTokenBalance = await bondTokenContract.balanceOf(connectedWalletAddress)
            setBondBalance(bondTokenBalance);

            const allowance = await bondTokenContract.allowance(connectedWalletAddress, BARN_PRIZE_POOL_ADDRESS);
            setBondAllowance(allowance);
        }
        if (bondTicketsContract && connectedWalletAddress) {
            const bondTicketsBalance = await bondTicketsContract.balanceOf(connectedWalletAddress);
            setTicketsBalance(bondTicketsBalance);
        }
    }, [connectedWalletAddress, bondTokenContract, connectedNetwork])

    useEffect(async () => {
        if (prizeStrategyContract) {
            setPrizePeriodEnds(await prizeStrategyContract.prizePeriodEndAt());
            setPrizePeriodStartedAt(await prizeStrategyContract.prizePeriodStartedAt())
            setPrizePoolRemainingSeconds(await prizeStrategyContract.prizePeriodRemainingSeconds())
        }
    }, [prizeStrategyContract])

    useEffect(async () => {
        if (barnPrizePoolContract) {

            setTotalTicketAmount(await barnPrizePoolContract.accountedBalance())
            setCurrentWeekPrice(await barnPrizePoolContract.awardBalance());



            const allDeposits = await barnPrizePoolContract.queryFilter('Deposited');

            const depositTimestamps = await getEventsTimestamps(allDeposits);
            const deposits = allDeposits.map((deposit, index) => ({
                amount: deposit.args.amount,
                address: deposit.args.to,
                timestamp: depositTimestamps[index]
            }))


            const allWithdraws = await barnPrizePoolContract.queryFilter('InstantWithdrawal');
            const withdrawTimestamps = await getEventsTimestamps(allWithdraws);
            const withdraws = allWithdraws.map((withdraw, index) => ({
                amount: withdraw.args.amount,
                address: withdraw.args.from,
                timestamp: withdrawTimestamps[index]
            }))


            const allAwardEvents = await barnPrizePoolContract.queryFilter('Awarded');

            const awardTimestamps = await getEventsTimestamps(allAwardEvents);
            const prizeDetails = allAwardEvents.map((award, index) => ({
                amount: award.args.amount,
                awardedTo: award.args.winner,
                timestamp: awardTimestamps[index]
            }));

            setAllDeposits(deposits);
            setAllWithdraws(withdraws)
            setPreviousAwards(prizeDetails);
        }
    }, [barnPrizePoolContract, connectedWalletAddress])
    const allowBondHandler = useCallback(async () => {

        const approveTx = await bondTokenContract.approve(BARN_PRIZE_POOL_ADDRESS, ethers.constants.MaxUint256)
        setGetTicketsLoading(true);
        setGetTicketsTxId(approveTx.hash);
        await approveTx.wait();
        setBondAllowance(BigNumber.from(Number.MAX_SAFE_INTEGER + ''));
        setGetTicketsLoading(false);
        setGetTicketsTxId('')

    })



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
        const depositTx = await barnPrizePoolContract.depositTo(connectedWalletAddress, ethers.utils.parseEther(ticketAmount), BOND_TICKETS_CONTRACT_ADDRESS, "0x0000000000000000000000000000000000000000");
        setGetTicketsLoading(true);
        setGetTicketsTxId(depositTx.hash)
        const deposit = await depositTx.wait();
        setTicketsBalance(ticketsBalance.add(ethers.utils.parseEther(ticketAmount + '')))
        setBondBalance(bondBalance.sub(ethers.utils.parseEther(ticketAmount + '')));

        setGetTicketsLoading(false);
        setGetTicketsTxId('');
        setModalType('DC');

    })

    const ticketWithdrawHandler = useCallback(async (amount) => {
        setModalType('CWD')
        const withdrawTx = await barnPrizePoolContract.withdrawInstantlyFrom(connectedWalletAddress, ethers.utils.parseEther(amount), BOND_TICKETS_CONTRACT_ADDRESS, 0)
        setWithdrawLoading(true);
        setWithdrawTxId(withdrawTx.hash);

        const withdraw = await withdrawTx.wait();
        setTicketsBalance(ticketsBalance.sub(ethers.utils.parseEther(amount + '')));
        setBondBalance(bondBalance.add(ethers.utils.parseEther(amount + '')));

        setWithdrawLoading(false);
        setWithdrawTxId('');
        setModalType('WDC');
    })
    return (
        <AppContext.Provider
            value={{
                provider,
                connectedNetwork,
                connectedWalletAddress,
                connectWalletHandler,
                connectedWalletName,
                disconnectWalletHandler,
                connected,


                allDeposits,
                allWithdraws,
                previousAwards,
                withdrawTxId,
                withdrawLoading,
                ticketWithdrawHandler,
                currentWeekPrice,
                percentageTimePassed,
                setPercentageTimePassed,
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
                toggleSidebar,
                setToggleSidebar,
            }}
        >
            <CountdownPercantageUpdater />
            <Router openModal={openModal} />
        </AppContext.Provider>
    );
}

export default Main;
