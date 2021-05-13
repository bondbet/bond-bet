/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import * as ethers from 'ethers';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import logo from '../../assets/images/onlyLogo.svg';
import diamond from '../../assets/images/diamond.svg';
import { useHistory } from 'react-router-dom';
import { formatEtherWithDecimals } from '../../helpers/format-utils';
import { setNewTime } from '../../helpers/countdown-setter';
import { formatTimestampToTimeAgo } from '../../helpers/date';
import { connect } from 'react-redux';
import { ACTION_TYPE } from '../../store/action-type';

const MyAccountDetails = (
    {
        setOpenModal,
        setModalType,
        prizePeriodEnds,
        currentWeekPrice,
        totalTicketAmount,
        ticketsBalance,
        previousAwards,
        allDeposits,
        allWithdraws,
        mainTokenBalance,
        connectedWalletAddress,
        setSelectedMenuItem,
        numberOfWinners,
        POOL_URL,
        POOL_TITLE
    }) => {
    const history = useHistory();


    const [odds, setOdds] = useState(1);

    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [, setUserTxData] = useState([]);

    const [, setTotalAwards] = useState(0);
    const [, setNumberOfAwards] = useState(0);

    useEffect(() => {
        if (previousAwards && connectedWalletAddress) {
            const userAwards = previousAwards.filter(x => x.awardedTo.toUpperCase() === connectedWalletAddress.toUpperCase());
            setNumberOfAwards(userAwards.length)
            setTotalAwards(
                userAwards.reduce((acc, x) => acc.add(x.amount), ethers.BigNumber.from('0'))
            )
        }
    }, [previousAwards, connectedWalletAddress])
    useEffect(() => {

        if (allDeposits && allWithdraws) {
            const allUserTxs = [
                ...allDeposits.filter(x => x.address.toLowerCase() === connectedWalletAddress.toLowerCase()),
                ...allWithdraws.filter(x => x.address.toLowerCase() === connectedWalletAddress.toLowerCase())
            ].sort((a, b) => b.timestamp - a.timestamp)

            setUserTxData(
                allUserTxs.map(x => ({
                    col1: formatEtherWithDecimals(x.amount, 2),
                    col2: x.hash,
                    col3: formatTimestampToTimeAgo(x.timestamp),
                    col4: x.type
                }))
            )
        }
    }, [allDeposits, allWithdraws])
    useEffect(() => {
        const interval = setInterval(() => {
            setNewTime(setCountdown, prizePeriodEnds);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [prizePeriodEnds])

    useEffect(() => {
        if (totalTicketAmount && ticketsBalance) {
            const odds = +ethers.utils.formatEther(totalTicketAmount) / +ethers.utils.formatEther(ticketsBalance);
            setOdds(odds.toFixed(2))
        }

    }, [totalTicketAmount, ticketsBalance])
    const withdraw = () => {

        if (ticketsBalance > 0) {
            setOpenModal(true);
            setModalType('WD');
        } else {
            alert('Sorry. Not enough tickets!')
        }

    }

    // eslint-disable-next-line no-unused-vars
    const PLACEHOLDER_COLUMNS = React.useMemo(() => [
        {
            Header: 'Tickets / BOND',
            accessor: 'col1',
        },
        {
            Header: 'TX Hash',
            accessor: 'col2',
            Cell: ({ row }) => (row.values.col2.substring(0, 6) + '..' + row.values.col2.substring(row.values.col2.length - 4))
        },
        {
            Header: 'Time',
            accessor: 'col3',
        },
        {
            Header: 'Type',
            accessor: 'col4',
        },
    ], [])

    return (
        <div>
            <div className='pools-box'>
                <PoolBoxHeader title={POOL_TITLE} />
                <div className='my-account-pool-box-content'>
                    <div className='my-account-pool-details'>
                        <h1 className='show-on-mobile'>
                            <img src={logo} alt='Bond Logo' /> Bond
                        </h1>
                        <div className='my-account-pool-details-head'>
                            <h1>
                                <img src={diamond} alt='Diamond' className='diamond' /> {POOL_TITLE}</h1>
                            <h1>
                                <img src={logo} alt='Bond Logo' /> Bond
                            </h1>
                        </div>
                        <div className='my-account-pool-buttons'>
                            <button onClick={() => { setSelectedMenuItem(0); history.push(`/${POOL_URL}/details`) }}>Pool Details</button>
                            <button onClick={() => { setOpenModal(true); setModalType('GT'); }}>Get More Tickets</button>
                            <button onClick={withdraw}>Withdraw</button>
                        </div>
                    </div>
                    <div className='my-account-stats'>
                        <div><b>{formatEtherWithDecimals(ticketsBalance, 2)} Tickets /  {formatEtherWithDecimals(mainTokenBalance, 2)} BOND</b></div>
                        <div>Current week prize <b>{`${currentWeekPrice ? formatEtherWithDecimals(currentWeekPrice, 2) : 0} BOND`}</b></div>
                        <div>Odds <b>1</b> in <b>{odds}</b></div>
                        <div><b>{numberOfWinners.toString()}</b> winners</div>
                        <div><b>Prize in {countdown.days + 'd:' + countdown.hours + 'h:' + countdown.minutes + 'm:' + countdown.seconds + 's'}</b></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state, {poolType}) =>
                        (
                            { 
                                prizePeriodEnds: state[poolType].prizePeriodEnds, 
                                currentWeekPrice: state[poolType].currentWeekPrice, 
                                totalTicketAmount: state[poolType].totalTicketAmount, 
                                ticketsBalance: state[poolType].ticketsBalance, 
                                previousAwards: state[poolType].previousAwards, 
                                POOL_URL: state[poolType].URL,
                                POOL_TITLE: state[poolType].TITLE,
                                allDeposits: state[poolType].allDeposits, 
                                allWithdraws: state[poolType].allWithdraws, 
                                mainTokenBalance: state.mainTokenBalance, 
                                connectedWalletAddress: state.connectedWalletAddress,
                                numberOfWinners: state[poolType].numberOfWinners
                            })

const mapDispatchToProps = (dispatch, {poolType}) => ({
    setModalType: value => dispatch({ type: ACTION_TYPE.MODAL_TYPE, value: {modalType: value, poolType} }),
    setOpenModal: value => dispatch({ type: ACTION_TYPE.MODAL_OPEN, value }),
    setSelectedMenuItem: value => dispatch({type: ACTION_TYPE.SELECTED_MENU_ITEM, value})
})


export default connect(mapStateToProps, mapDispatchToProps)(MyAccountDetails);