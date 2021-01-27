import React, { useState, useEffect, useCallback } from 'react';
import AppContext from '../ContextAPI';
import Router from '../Router';
import { BARN_PRIZE_POOL_ADDRESS, BOND_TICKETS_CONTRACT_ADDRESS } from '../constants/contracts';
import { BigNumber } from 'ethers';
import { getUtcTimestamp } from './../helpers/date';

import * as ethers from 'ethers';
import CountdownPercantageUpdater from './Shared/PercentageUpdater';
import { getEventsTimestamps } from '../helpers/ethers';
import { ACTION_TYPE } from '../store/action-type';
import {connect} from 'react-redux';

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
        bondTicketsContract,
        setGetTicketsLoading,
        setGetTicketsTxId,
        setModalType,
        setPrizePeriodEnds,
        setPrizePeriodStartedAt,
        setPrizePoolRemainingSeconds
    }) => {

        console.log('mian')
    const [selectedMenuItem, setSelectedMenuItem] = useState(0);
    const [bondBalance, setBondBalance] = useState(0);
    const [bondAllowance, setBondAllowance] = useState(0);
    const [withdrawLoading, setWithdrawLoading] = useState(false);
    const [withdrawTxId, setWithdrawTxId] = useState(false);
    const [ticketsBalance, setTicketsBalance] = useState(0);

    const [totalTicketAmount, setTotalTicketAmount] = useState(0);
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
    }, [connectedWalletAddress, bondTokenContract, bondTicketsContract, connectedNetwork])

    useEffect(async () => {
        if (prizeStrategyContract) {
                        // await prizeStrategyContract.completeAward()

            setPrizePeriodEnds(await prizeStrategyContract.prizePeriodEndAt());
            setPrizePeriodStartedAt(await prizeStrategyContract.prizePeriodStartedAt())
            console.log('about to set', await prizeStrategyContract.prizePeriodRemainingSeconds())
            setPrizePoolRemainingSeconds(await prizeStrategyContract.prizePeriodRemainingSeconds())
        }
    }, [prizeStrategyContract])

    useEffect(async () => {
        if (barnPrizePoolContract) {

           updatePrizePoolDependantState(barnPrizePoolContract);
            subscribeToPrizePoolEvents(barnPrizePoolContract);
        }
    }, [barnPrizePoolContract, connectedWalletAddress]);


    const allowBondHandler = useCallback(async () => {

        try {
            const approveTx = await bondTokenContract.approve(BARN_PRIZE_POOL_ADDRESS, ethers.constants.MaxUint256)
            setGetTicketsLoading(true);
            setGetTicketsTxId(approveTx.hash);
            await approveTx.wait();
            setBondAllowance(BigNumber.from(Number.MAX_SAFE_INTEGER + ''));
            setGetTicketsLoading(false);
            setGetTicketsTxId('');
       
        } catch(e) {
            alert('Something went wrong.')
        }
       

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

    const subscribeToPrizePoolEvents = useCallback(async (barnPrizePoolContract) => {
        barnPrizePoolContract.on('Deposited', async () => {
            updateDeposits(barnPrizePoolContract);
            setTotalTicketAmount(await barnPrizePoolContract.accountedBalance())

        });
        barnPrizePoolContract.on('InstantWithdrawal', async () => {
            updateWithdraws(barnPrizePoolContract);
            setTotalTicketAmount(await barnPrizePoolContract.accountedBalance())

        })
        barnPrizePoolContract.on('Awarded', () => {
            updateAwards(barnPrizePoolContract);
        })
    })
    const updatePrizePoolDependantState = useCallback(async (barnPrizePoolContract) => {
        setTotalTicketAmount(await barnPrizePoolContract.accountedBalance())
        console.log(await barnPrizePoolContract.owedReward())
        setCurrentWeekPrice(await barnPrizePoolContract.owedReward());

        updateDeposits(barnPrizePoolContract);
        updateWithdraws(barnPrizePoolContract);
        updateAwards(barnPrizePoolContract);


    })
    const updateDeposits = useCallback(async (barnPrizePoolContract) => {
        const allDeposits = await barnPrizePoolContract.queryFilter('Deposited');
        const depositTimestamps = await getEventsTimestamps(allDeposits);
        const deposits = allDeposits.map((deposit, index) => ({
            amount: deposit.args.amount,
            address: deposit.args.to,
            timestamp: depositTimestamps[index],
            hash: deposit.transactionHash,
            type: 'Deposit'
        }))
        setAllDeposits(deposits);
    });

    const updateWithdraws = useCallback(async (barnPrizePoolContract) => {
        const allWithdraws = await barnPrizePoolContract.queryFilter('InstantWithdrawal');
        const withdrawTimestamps = await getEventsTimestamps(allWithdraws);
        const withdraws = allWithdraws.map((withdraw, index) => ({
            amount: withdraw.args.amount,
            address: withdraw.args.from,
            timestamp: withdrawTimestamps[index],
            hash: withdraw.transactionHash,
            type: 'Withdraw'
        }));
         
        setAllWithdraws(withdraws)

    });

    const updateAwards = useCallback(async (barnPrizePoolContract) => {

        const allAwardEvents = await barnPrizePoolContract.queryFilter('Awarded');
        const awardTimestamps = await getEventsTimestamps(allAwardEvents);
        const prizeDetails = allAwardEvents.map((award, index) => ({
            amount: award.args.amount,
            awardedTo: award.args.winner,
            timestamp: awardTimestamps[index]
        }));
        setPreviousAwards(prizeDetails);
    })
    const ticketDepositHandler = useCallback(async (ticketAmount) => {
        try {
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
        }catch(e) {
            alert('Something went wrong.')
        }
       


    })

    const ticketWithdrawHandler = useCallback(async (amount) => {
        try{
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
        }catch(e) {
            alert('Something went wrong.')
        }
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
                totalTicketAmount,
                ticketsBalance,
                ticketDepositHandler,
                bondAllowance,
                allowBondHandler,
                bondBalance,
                selectedMenuItem,
                setSelectedMenuItem
            }}
        >
            <CountdownPercantageUpdater />
            <Router/>
        </AppContext.Provider>
    );
}

const mapDispatchToProps = dispatch => ({
    setGetTicketsLoading: (value) => dispatch({type: ACTION_TYPE.GET_TICKETS_LOADING, value}),
    setGetTicketsTxId: value => dispatch({type: ACTION_TYPE.GET_TICKETS_TX_ID, value}),
    setModalType: value => dispatch({type: ACTION_TYPE.MODAL_TYPE, value}),
    setOpenModal: value => dispatch({type: ACTION_TYPE.MODAL_OPEN, value}),
    setPrizePeriodEnds: value => dispatch({type: ACTION_TYPE.PRIZE_PERIOD_ENDS, value}),
    setPrizePeriodStartedAt: value => dispatch({type: ACTION_TYPE.PRIZE_PERIOD_STARTED_AT, value}),
    setPrizePoolRemainingSeconds: value => dispatch({type: ACTION_TYPE.PRIZE_POOL_REMAINING_SECONDS, value}),
})
export default connect(null, mapDispatchToProps)(Main);
