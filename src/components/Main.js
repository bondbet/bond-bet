import React, { useState, useEffect, useCallback } from 'react';
import AppContext from '../ContextAPI';
import Router from '../Router';
import { BARN_PRIZE_POOL_ADDRESS, BOND_TICKETS_CONTRACT_ADDRESS } from '../constants/contracts';
import { BigNumber } from 'ethers';
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
        setPrizePoolRemainingSeconds, 
        barnContract,
        setCurrentWeekPrice
    }) => {

    const [selectedMenuItem, setSelectedMenuItem] = useState(0);
    const [bondBalance, setBondBalance] = useState(0);
    const [bondAllowance, setBondAllowance] = useState(0);
    const [withdrawLoading, setWithdrawLoading] = useState(false);
    const [withdrawTxId, setWithdrawTxId] = useState(false);
    const [ticketsBalance, setTicketsBalance] = useState(0);
    const [totalTicketAmount, setTotalTicketAmount] = useState(0);
    const [previousAwards, setPreviousAwards] = useState([]);
    const [allDeposits, setAllDeposits] = useState([]);
    const [allWithdraws, setAllWithdraws] = useState([]);




    useEffect(async () => {
        try {
            if (bondTokenContract && connectedWalletAddress) {
                const bondTokenBalance = await bondTokenContract.balanceOf(connectedWalletAddress)
                setBondBalance(bondTokenBalance);

                const allowance = await bondTokenContract.allowance(connectedWalletAddress, BARN_PRIZE_POOL_ADDRESS);
                setBondAllowance(allowance);
                console.log(bondTokenBalance)
            }
            if (bondTicketsContract && connectedWalletAddress) {
                const bondTicketsBalance = await bondTicketsContract.balanceOf(connectedWalletAddress);
                setTicketsBalance(bondTicketsBalance);
            }
        }  catch(e) {
            alert('Something went wrong.')
        }
    }, [bondTokenContract, bondTicketsContract, connectedWalletAddress, connectedNetwork])

    useEffect(async () => {
        if (prizeStrategyContract) {
            try {
                // await prizeStrategyContract.startAward()
                setPrizePeriodEnds(await prizeStrategyContract.prizePeriodEndAt());
                setPrizePeriodStartedAt(await prizeStrategyContract.prizePeriodStartedAt())
                setPrizePoolRemainingSeconds(await prizeStrategyContract.prizePeriodRemainingSeconds())
            } catch(e) {
                alert('Something went wrong.')
            }

        }
    }, [prizeStrategyContract])

    useEffect(async () => {
        if (barnPrizePoolContract) {
            try {
                updatePrizePoolDependantState(barnPrizePoolContract);
                subscribeToPrizePoolEvents(barnPrizePoolContract);
            } catch(e) {
                alert("Something went wrong.")
            }

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
       

        const totalTickets = await barnPrizePoolContract.accountedBalance();
        const totalBalance = await barnContract.balanceOf(BARN_PRIZE_POOL_ADDRESS);
        const owedAward = await barnPrizePoolContract.owedReward();

        const currentWeekPrize = totalBalance.add(owedAward).sub(totalTickets);
   
        setTotalTicketAmount(totalTickets);
            setCurrentWeekPrice(currentWeekPrize);

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
    const ticketDepositHandler = useCallback(async (ticketAmount, maxAmountSelected) => {
        try {
            const depositAmount = maxAmountSelected ? bondBalance : ethers.utils.parseEther(ticketAmount);
            setModalType('CD')
            const depositTx = await barnPrizePoolContract.depositTo(connectedWalletAddress, depositAmount, BOND_TICKETS_CONTRACT_ADDRESS, "0x0000000000000000000000000000000000000000");
            setGetTicketsLoading(true);
            setGetTicketsTxId(depositTx.hash)
            const deposit = await depositTx.wait();
            setTicketsBalance(ticketsBalance.add(depositAmount + ''))
            setBondBalance(bondBalance.sub(depositAmount + ''));
    
            setGetTicketsLoading(false);
            setGetTicketsTxId('');
            setModalType('DC');
        }catch(e) {
            alert('Something went wrong.')
        }
       


    })

    const ticketWithdrawHandler = useCallback(async (amount, maxAmountSelected) => {
        try{
            const withdrawAmount = maxAmountSelected ? ticketsBalance : ethers.utils.parseEther(amount);

            setModalType('CWD')
            const withdrawTx = await barnPrizePoolContract.withdrawInstantlyFrom(connectedWalletAddress, withdrawAmount, BOND_TICKETS_CONTRACT_ADDRESS, 0)
            setWithdrawLoading(true);
            setWithdrawTxId(withdrawTx.hash);

            const withdraw = await withdrawTx.wait();
            setTicketsBalance(ticketsBalance.sub(withdrawAmount));
            setBondBalance(bondBalance.add(withdrawAmount));

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
    setCurrentWeekPrice: value => dispatch({type: ACTION_TYPE.CURRENT_WEEK_PRIZE, value}),
})
export default connect(null, mapDispatchToProps)(Main);
