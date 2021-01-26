import React, {useContext, useState, useEffect} from 'react'
import * as ethers from 'ethers'
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader'
import logo from '../../assets/images/onlyLogo.svg';
import diamond from '../../assets/images/diamond.svg';
import { useHistory } from 'react-router-dom';
import Table from '../Table/Table';
import AppContext from '../../ContextAPI';
import { formatEtherWithDecimals } from '../../helpers/format-utils';
import { setNewTime } from '../../helpers/countdown-setter';

const MyAccount = () => {
    const history = useHistory();

    const {
        setSelectedMenuItem,
        setOpenModal,
        setModalType,
        totalTicketAmount,
        ticketsBalance,
        bondBalance,
        currentWeekPrice,
        prizePeriodEnds
    } = useContext(AppContext);

    const [odds, setOdds] = useState(1);

    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes:0 ,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setNewTime(setCountdown, prizePeriodEnds);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [prizePeriodEnds])

    useEffect(()=> {
        if(totalTicketAmount && ticketsBalance) {
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

    const PLACEHOLDER_BOND = 13.48;
    const PLACEHOLDER_TIMES = 3;

    const PLACEHOLDER_DATA = React.useMemo(() => [
        {
            col1: 'DAO Staking Pool',
            col2: '10',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: 'about 2 hours ago',
            col5: 'Deposit',
        },
        {
            col1: 'DAO Staking Pool',
            col2: '5',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '3 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
    ], [])
    
    const PLACEHOLDER_COLUMNS = React.useMemo(() => [
        {
            Header: 'Pool',
            accessor: 'col1',
        },
        {
            Header: 'Tickets / BOND',
            accessor: 'col2',
        },
        {
            Header: 'TX Hash',
            accessor: 'col3',
            Cell: ({ row }) => (row.values.col3.substring(0,6) + '..' + row.values.col3.substring(row.values.col3.length - 4))
        },
        {
            Header: 'Time',
            accessor: 'col4',
        },
        {
            Header: 'Type',
            accessor: 'col5',
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
                        <div><b>{formatEtherWithDecimals(ticketsBalance)} Tickets /  {formatEtherWithDecimals(bondBalance)} BOND</b></div>
                        <div>Current week prize <b>{`${currentWeekPrice ? formatEtherWithDecimals(currentWeekPrice, 2) : 0} BOND`}</b></div>
                        <div>Odds <b>1</b> in <b>{odds}</b></div>
                        <div><b>1</b> winners</div>
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
                                    <div className='pools-box-screen-inner required-changes'>{`${PLACEHOLDER_BOND} bond`}</div>
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
                                    <div className='pools-box-screen-inner required-changes'>{`${PLACEHOLDER_TIMES} times`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='transactions'>
                <Table title='My Transactions' data={PLACEHOLDER_DATA} columns={PLACEHOLDER_COLUMNS} pageSize={4} />
            </div>
        </div>
    )
}

export default MyAccount;