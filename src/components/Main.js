import React, { useEffect, useCallback } from 'react';
import { BigNumber } from 'ethers';
import * as ethers from 'ethers';
import CountdownPercantageUpdater from './Shared/PercentageUpdater';
import { getEventsTimestamps } from '../helpers/ethers';
import { ACTION_TYPE } from '../store/action-type';
import { connect } from 'react-redux';
import { POOL_TYPE } from '../store/pool-type';

const Main = (
    {
        connectedWalletAddress,
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
        mainAssetContract,

        ticketsBalance,
        setTicketsBalance,
        setTotalTicketAmount,
        setPreviousAwards,
        setAllDeposits,
        setAllWithdraws,
        setNumberOfWinners,
        mainTokenBalance,

        setMainTokenAllowance,
        setMainTokenBalance,
        setWithdrawTxId,
        setWithdrawLoading,
        setSelectedMenuItem,

        poolType,

        setTicketDepositHandler,
        setAllowTicketHandler,
        setTicketWithdrawHandler,
        setCalculateEarlyExitFee

    }) => {

    useEffect(async () => {
        try {
       
            if (mainAssetTokenContract && connectedWalletAddress) {
                const bondTokenBalance = await mainAssetTokenContract.balanceOf(connectedWalletAddress)
                setMainTokenBalance(bondTokenBalance);

                const allowance = await mainAssetTokenContract.allowance(connectedWalletAddress, prizePoolContract.address);
                setMainTokenAllowance(allowance);
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
                setNumberOfWinners(await prizeStrategyContract.numberOfWinners())

                setPrizePeriodEnds(await prizeStrategyContract.prizePeriodEndAt());
                setPrizePeriodStartedAt(await prizeStrategyContract.prizePeriodStartedAt())
                setPrizePoolRemainingSeconds(await prizeStrategyContract.prizePeriodRemainingSeconds())
            } catch (e) {
                alert('Something went wrong.')
            }

        }
    }, [prizeStrategyContract])

    useEffect(async () => {
        if (prizePoolContract && mainAssetTokenContract) {
            try {
                updatePrizePoolDependantState(prizePoolContract, mainAssetTokenContract);
                subscribeToPrizePoolEvents(prizePoolContract);
            } catch (e) {
                alert("Something went wrong.")
            }

        }
    }, [prizePoolContract, connectedWalletAddress, mainAssetTokenContract]);


    const allowBondHandler = useCallback(async () => {

        try {
           
            const approveTx = await mainAssetTokenContract.approve(prizePoolContract.address, ethers.constants.MaxUint256)
            setGetTicketsLoading(true);
            setGetTicketsTxId(approveTx.hash);
            await approveTx.wait();
            setMainTokenAllowance(BigNumber.from(Number.MAX_SAFE_INTEGER + ''));
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
    const updatePrizePoolDependantState = useCallback(async (prizePoolContract, mainAssetTokenContract) => {

        const totalTickets = await prizePoolContract.accountedBalance();

       
       

        let currentWeekPrize;

        if(poolType === POOL_TYPE.COMMUNITY_REWARD_POOL) {
            const totalBalance = await mainAssetContract.balanceOf(prizePoolContract.address);
            const owedAward = await prizePoolContract.owedReward();
            currentWeekPrize = totalBalance.add(owedAward).sub(totalTickets);
        } else {
            currentWeekPrize = (await mainAssetTokenContract.balanceOf(prizePoolContract.address)).sub(totalTickets);
        }
        

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
            console.log(ticketAmount)
            const depositAmount = maxAmountSelected ? mainTokenBalance : ethers.utils.parseEther(ticketAmount);
            console.log(depositAmount.toString())
            setModalType('CD')
            const depositTx = await prizePoolContract.depositTo(connectedWalletAddress, depositAmount, ticketsContract.address, "0x0000000000000000000000000000000000000000");
            setGetTicketsLoading(true);
            setGetTicketsTxId(depositTx.hash)
            const deposit = await depositTx.wait();
            setTicketsBalance(ticketsBalance.add(depositAmount + ''))
            setMainTokenBalance(mainTokenBalance.sub(depositAmount + ''));

            setGetTicketsLoading(false);
            setGetTicketsTxId('');
            setModalType('DC');
        } catch (e) {
            alert('Something went wrong.')
        }



    })

    const ticketWithdrawHandler = useCallback(async (amount, maxAmountSelected, exitFee) => {
        try {
            const withdrawAmount = maxAmountSelected ? ticketsBalance : ethers.utils.parseEther(amount);

            setModalType('CWD')
            setWithdrawLoading(false);
            
            
            const withdrawTx = await prizePoolContract.withdrawInstantlyFrom(connectedWalletAddress, withdrawAmount, ticketsContract.address, exitFee ? exitFee : BigNumber.from('0'))
            setWithdrawLoading(true);
            setWithdrawTxId(withdrawTx.hash);

            const withdraw = await withdrawTx.wait();
            setTicketsBalance(ticketsBalance.sub(withdrawAmount));
            setMainTokenBalance(mainTokenBalance.add(withdrawAmount));

            setWithdrawLoading(false);
            setWithdrawTxId('');
            setModalType('WDC');
        } catch (e) {
            alert('Something went wrong.')
        }
    })

    const calculateEarlyExitFee = useCallback(async (desiredWithdrawAmount) => {
        // try {

            const exitFeeTx = await prizePoolContract.callStatic.calculateEarlyExitFee(connectedWalletAddress, ticketsContract.address, ethers.utils.parseEther(desiredWithdrawAmount + ''));
            setWithdrawLoading(true);
            setWithdrawTxId(exitFeeTx.hash);

            return exitFeeTx.exitFee;
        // }catch(e) {
        //     alert('Something went wrong.')
        // }
    })

    useEffect(() => {
        setTicketDepositHandler(ticketDepositHandler);
        setAllowTicketHandler(allowBondHandler);
        setTicketWithdrawHandler(ticketWithdrawHandler);
        setCalculateEarlyExitFee(calculateEarlyExitFee);
    })


    return (
       
            <CountdownPercantageUpdater poolType={poolType}/>
	
    
    );
}

const mapStateToProps = (state, {poolType}) => ({
    prizePoolContract: state[poolType].prizePoolContract,
    mainAssetTokenContract: state[poolType].mainAssetTokenContract,
    ticketsContract: state[poolType].ticketsContract,
    prizeStrategyContract: state[poolType].prizeStrategyContract,
    mainAssetContract: state[poolType].mainAssetContract,
    ticketsBalance: state[poolType].ticketsBalance,
    mainTokenBalance: state[poolType].mainTokenBalance,
    connectedWalletAddress: state.connectedWalletAddress,
    connectedNetwork: state.connectedNetwork
})

const mapDispatchToProps = (dispatch, {poolType}) => {

    if(!poolType) {
        throw new Error('Should provide pool type as prop');
    }

    return {
        setTicketDepositHandler: value => dispatch({type: ACTION_TYPE.TICKET_DEPOSIT_HANDLER, value, poolType}),
        setAllowTicketHandler: value => dispatch({type: ACTION_TYPE.ALLOW_TICKET_HANDLER, value, poolType}),
        setCalculateEarlyExitFee: value => dispatch({type: ACTION_TYPE.CALCULATE_EARLY_EXIT_FEE, value, poolType}),

        setTicketWithdrawHandler: value => dispatch({type: ACTION_TYPE.TICKET_WITHDRAW_HANDLER, value, poolType}),

        setGetTicketsLoading: value => dispatch({ type: ACTION_TYPE.GET_TICKETS_LOADING, value,poolType }),
        setGetTicketsTxId: value => dispatch({ type: ACTION_TYPE.GET_TICKETS_TX_ID, value,poolType }),
        setModalType: value => dispatch({ type: ACTION_TYPE.MODAL_TYPE, value: {modalType: value, poolType}}),
        setOpenModal: value => dispatch({ type: ACTION_TYPE.MODAL_OPEN, value }),
        setPrizePeriodEnds: value => dispatch({ type: ACTION_TYPE.PRIZE_PERIOD_ENDS, value,poolType }),
        setPrizePeriodStartedAt: value => dispatch({ type: ACTION_TYPE.PRIZE_PERIOD_STARTED_AT, value,poolType }),
        setPrizePoolRemainingSeconds: value => dispatch({ type: ACTION_TYPE.PRIZE_POOL_REMAINING_SECONDS, value,poolType }),
        setCurrentWeekPrice: value => dispatch({ type: ACTION_TYPE.CURRENT_WEEK_PRIZE, value,poolType }),
    
        setTicketsBalance: value => dispatch({type: ACTION_TYPE.TICKETS_BALANCE, value,poolType}),
        setTotalTicketAmount: value => dispatch({type: ACTION_TYPE.TOTAL_TICKET_AMOUNT, value,poolType}),
        setPreviousAwards: value => dispatch({type: ACTION_TYPE.PREVIOUS_AWARDS, value,poolType}),
        setAllDeposits: value => dispatch({type: ACTION_TYPE.ALL_DEPOSITS, value,poolType}),
        setAllWithdraws: value => dispatch({type: ACTION_TYPE.ALL_WITHDRAWS, value,poolType}),
        setNumberOfWinners: value => dispatch({type: ACTION_TYPE.NUMBER_OF_WINNERS, value, poolType}),
    
        setMainTokenAllowance: value => dispatch({type: ACTION_TYPE.MAIN_TOKEN_ALLOWANCE, value,poolType}),
        setMainTokenBalance: value => dispatch({type: ACTION_TYPE.MAIN_TOKEN_BALANCE, value,poolType}),
        setWithdrawTxId: value => dispatch({type: ACTION_TYPE.WITHDRAW_TX_ID, value,poolType}),
        setWithdrawLoading: value => dispatch({type: ACTION_TYPE.WITHDRAW_LOADING, value,poolType}),
        setSelectedMenuItem: value => dispatch({type: ACTION_TYPE.SELECTED_MENU_ITEM, value,poolType})
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
