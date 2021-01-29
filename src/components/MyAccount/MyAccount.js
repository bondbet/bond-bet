import React, { useContext, useState, useEffect } from 'react';
import * as ethers from 'ethers';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import logo from '../../assets/images/onlyLogo.svg';
import diamond from '../../assets/images/diamond.svg';
import { useHistory } from 'react-router-dom';
import Table from '../Table/Table';
import AppContext from '../../ContextAPI';
import { formatEtherWithDecimals } from '../../helpers/format-utils';
import { setNewTime } from '../../helpers/countdown-setter';
import { formatTimestampToTimeAgo } from '../../helpers/date';
import { connect } from 'react-redux';
import { ACTION_TYPE } from '../../store/action-type';

const MyAccount = (
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
    }) => {
    const history = useHistory();

    const {
        setSelectedMenuItem,

        bondBalance,
        connectedWalletAddress

    } = useContext(AppContext);

    const [odds, setOdds] = useState(1);

    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [userTxData, setUserTxData] = useState([]);

    const [totalAwards, setTotalAwards] = useState(0);
    const [numberOfAwards, setNumberOfAwards] = useState(0);

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
        <div className='my-account-section'>
            <h1 className='my-account-title'>My account</h1>
            <div className='pools-box'>
                <PoolBoxHeader title='Community Reward Pool' />
                <div className='my-account-pool-box-content'>
                    <div className='my-account-pool-details'>
                        <h1 className='show-on-mobile'>
                            <img src={logo} alt='Bond Logo' /> Bond
                        </h1>
                        <div className='my-account-pool-details-head'>
                            <h1>
                                <img src={diamond} alt='Diamond' className='diamond' /> Community Reward Pool</h1>
                            <h1>
                                <img src={logo} alt='Bond Logo' /> Bond
                            </h1>
                        </div>
                        <div className='my-account-pool-buttons'>
                            <button onClick={() => { setSelectedMenuItem(0); history.push('/community-reward-pool/details') }}>Pool Details</button>
                            <button onClick={() => { setOpenModal(true); setModalType('GT'); }}>Get More Tickets</button>
                            <button onClick={withdraw}>Withdraw</button>
                        </div>
                    </div>
                    <div className='my-account-stats'>
                        <div><b>{formatEtherWithDecimals(ticketsBalance, 2)} Tickets /  {formatEtherWithDecimals(bondBalance, 2)} BOND</b></div>
                        <div>Current week prize <b>{`${currentWeekPrice ? formatEtherWithDecimals(currentWeekPrice, 2) : 0} BOND`}</b></div>
                        <div>Odds <b>1</b> in <b>{odds}</b></div>
                        <div><b>1</b> winner</div>
                        <div><b>Prize in {countdown.days + 'd:' + countdown.hours + 'h:' + countdown.minutes + 'm:' + countdown.seconds + 's'}</b></div>
                    </div>
                </div>
            </div>

            <div className='my-account-totals'>
                <div>
                    <div className='pools-box'>
                        <PoolBoxHeader title='Total Rewards' />
                        <div className='pools-box-content required-changes'>
                            <div className='pools-box-inner required-changes'>
                                <div className='pools-box-screen required-changes'>
                                    <div className='pools-box-screen-inner required-changes'>{`${formatEtherWithDecimals(totalAwards, 2)} bond`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='pools-box'>
                        <PoolBoxHeader title='Total Winnings' />
                        <div className='pools-box-content required-changes'>
                            <div className='pools-box-inner required-changes'>
                                <div className='pools-box-screen required-changes'>
                                    <div className='pools-box-screen-inner required-changes'>{`${numberOfAwards} times`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='transactions'>
                <Table title='My Transactions' data={userTxData} columns={PLACEHOLDER_COLUMNS} pageSize={4} />
            </div>
        </div>
    )
}
const mapStateToProps = ({ prizePeriodEnds, currentWeekPrice, totalTicketAmount,ticketsBalance, previousAwards, allDeposits, allWithdraws }) =>
                        ({ prizePeriodEnds, currentWeekPrice, totalTicketAmount, ticketsBalance, previousAwards, allDeposits, allWithdraws  })

const mapDispatchToProps = dispatch => ({
    setModalType: value => dispatch({ type: ACTION_TYPE.MODAL_TYPE, value }),
    setOpenModal: value => dispatch({ type: ACTION_TYPE.MODAL_OPEN, value }),

})


export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);