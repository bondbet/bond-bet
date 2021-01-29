import React, { useState, useEffect, useCallback } from 'react';
import AppContext from '../ContextAPI';
import Router from '../Router';
import { BARN_PRIZE_POOL_ADDRESS, BOND_TICKETS_CONTRACT_ADDRESS } from '../constants/contracts';
import { BigNumber } from 'ethers';
import * as ethers from 'ethers';
import CountdownPercantageUpdater from './Shared/PercentageUpdater';
import { getEventsTimestamps } from '../helpers/ethers';
import { ACTION_TYPE } from '../store/action-type';
import { connect } from 'react-redux';

const Main = (
    {
        connectedWalletAddress,
        connected,
        disconnectWalletHandler,
        connectedWalletName,
        provider,
        connectWalletHandler,
        connectedNetwork,

        setGetTicketsLoading,
        setGetTicketsTxId,
        setModalType,
        setPrizePeriodEnds,
        setPrizePeriodStartedAt,
        setPrizePoolRemainingSeconds,
        setCurrentWeekPrice,

        prizePoolContract,
        mainAssetTokenContract,
        ticketsContract,
        prizeStrategyContract,
        mainAssetContract
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
            if (mainAssetTokenContract && connectedWalletAddress) {
                console.log('main ass', mainAssetContract)
                const bondTokenBalance = await mainAssetTokenContract.balanceOf(connectedWalletAddress)
                setBondBalance(bondTokenBalance);

                const allowance = await mainAssetTokenContract.allowance(connectedWalletAddress, BARN_PRIZE_POOL_ADDRESS);
                setBondAllowance(allowance);
            }
            if (ticketsContract && connectedWalletAddress) {
                const bondTicketsBalance = await ticketsContract.balanceOf(connectedWalletAddress);
                setTicketsBalance(bondTicketsBalance);
            }
        } catch (e) {
            alert('Something went wrong.')
        }
    }, [mainAssetTokenContract, ticketsContract, connectedWalletAddress, connectedNetwork])

    useEffect(async () => {
        if (prizeStrategyContract) {
            try {
                console.log('prize str', prizeStrategyContract)
                setPrizePeriodEnds(await prizeStrategyContract.prizePeriodEndAt());
                setPrizePeriodStartedAt(await prizeStrategyContract.prizePeriodStartedAt())
                setPrizePoolRemainingSeconds(await prizeStrategyContract.prizePeriodRemainingSeconds())
            } catch (e) {
                alert('Something went wrong.')
            }

        }
    }, [prizeStrategyContract])

    useEffect(async () => {
        if (prizePoolContract) {
            try {
                updatePrizePoolDependantState(prizePoolContract);
                subscribeToPrizePoolEvents(prizePoolContract);
            } catch (e) {
                alert("Something went wrong.")
            }

        }
    }, [prizePoolContract, connectedWalletAddress]);


    const allowBondHandler = useCallback(async () => {

        try {
            const approveTx = await mainAssetTokenContract.approve(BARN_PRIZE_POOL_ADDRESS, ethers.constants.MaxUint256)
            setGetTicketsLoading(true);
            setGetTicketsTxId(approveTx.hash);
            await approveTx.wait();
            setBondAllowance(BigNumber.from(Number.MAX_SAFE_INTEGER + ''));
            setGetTicketsLoading(false);
            setGetTicketsTxId('');

        } catch (e) {
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

    const subscribeToPrizePoolEvents = useCallback(async (prizePoolContract) => {
        prizePoolContract.on('Deposited', async () => {
            updateDeposits(prizePoolContract);
            setTotalTicketAmount(await prizePoolContract.accountedBalance())

        });
        prizePoolContract.on('InstantWithdrawal', async () => {
            updateWithdraws(prizePoolContract);
            setTotalTicketAmount(await prizePoolContract.accountedBalance())

        })
        prizePoolContract.on('Awarded', () => {
            updateAwards(prizePoolContract);
        })
    })
    const updatePrizePoolDependantState = useCallback(async (prizePoolContract) => {


        console.log('prize pool', prizePoolContract)
        const totalTickets = await prizePoolContract.accountedBalance();
        const totalBalance = await mainAssetContract.balanceOf(BARN_PRIZE_POOL_ADDRESS);
        const owedAward = await prizePoolContract.owedReward();

        const currentWeekPrize = totalBalance.add(owedAward).sub(totalTickets);

        setTotalTicketAmount(totalTickets);
        setCurrentWeekPrice(currentWeekPrize);

        updateDeposits(prizePoolContract);
        updateWithdraws(prizePoolContract);
        updateAwards(prizePoolContract);


    })
    const updateDeposits = useCallback(async (prizePoolContract) => {
        const allDeposits = await prizePoolContract.queryFilter('Deposited');
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

    const updateWithdraws = useCallback(async (prizePoolContract) => {
        const allWithdraws = await prizePoolContract.queryFilter('InstantWithdrawal');
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

    const updateAwards = useCallback(async (prizePoolContract) => {

        const allAwardEvents = await prizePoolContract.queryFilter('Awarded');
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
            const depositTx = await prizePoolContract.depositTo(connectedWalletAddress, depositAmount, BOND_TICKETS_CONTRACT_ADDRESS, "0x0000000000000000000000000000000000000000");
            setGetTicketsLoading(true);
            setGetTicketsTxId(depositTx.hash)
            const deposit = await depositTx.wait();
            setTicketsBalance(ticketsBalance.add(depositAmount + ''))
            setBondBalance(bondBalance.sub(depositAmount + ''));

            setGetTicketsLoading(false);
            setGetTicketsTxId('');
            setModalType('DC');
        } catch (e) {
            alert('Something went wrong.')
        }



    })

    const ticketWithdrawHandler = useCallback(async (amount, maxAmountSelected) => {
        try {
            const withdrawAmount = maxAmountSelected ? ticketsBalance : ethers.utils.parseEther(amount);

            setModalType('CWD')
            const withdrawTx = await prizePoolContract.withdrawInstantlyFrom(connectedWalletAddress, withdrawAmount, BOND_TICKETS_CONTRACT_ADDRESS, 0)
            setWithdrawLoading(true);
            setWithdrawTxId(withdrawTx.hash);

            const withdraw = await withdrawTx.wait();
            setTicketsBalance(ticketsBalance.sub(withdrawAmount));
            setBondBalance(bondBalance.add(withdrawAmount));

            setWithdrawLoading(false);
            setWithdrawTxId('');
            setModalType('WDC');
        } catch (e) {
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
            <Router />
        </AppContext.Provider>
    );
}

const mapStateToProps = ({
    prizePoolContract,
    mainAssetTokenContract,
    ticketsContract,
    prizeStrategyContract,
    mainAssetContract
}) => ({
    prizePoolContract,
    mainAssetTokenContract,
    ticketsContract,
    prizeStrategyContract,
    mainAssetContract
})

const mapDispatchToProps = dispatch => ({
    setGetTicketsLoading: value => dispatch({ type: ACTION_TYPE.GET_TICKETS_LOADING, value }),
    setGetTicketsTxId: value => dispatch({ type: ACTION_TYPE.GET_TICKETS_TX_ID, value }),
    setModalType: value => dispatch({ type: ACTION_TYPE.MODAL_TYPE, value }),
    setOpenModal: value => dispatch({ type: ACTION_TYPE.MODAL_OPEN, value }),
    setPrizePeriodEnds: value => dispatch({ type: ACTION_TYPE.PRIZE_PERIOD_ENDS, value }),
    setPrizePeriodStartedAt: value => dispatch({ type: ACTION_TYPE.PRIZE_PERIOD_STARTED_AT, value }),
    setPrizePoolRemainingSeconds: value => dispatch({ type: ACTION_TYPE.PRIZE_POOL_REMAINING_SECONDS, value }),
    setCurrentWeekPrice: value => dispatch({ type: ACTION_TYPE.CURRENT_WEEK_PRIZE, value }),
})
export default connect(mapStateToProps, mapDispatchToProps)(Main);
