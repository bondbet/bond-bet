import React, {useContext, useState, useEffect} from 'react'
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader'
import logo from '../../assets/images/onlyLogo.png';
import { useHistory } from 'react-router-dom';
import Table from '../Table/Table';
import AppContext from '../../ContextAPI';

const MyAccount = () => {
    const history = useHistory();
    const {
        poolType,
        setSelectedMenuItem,
        setOpenModal,
        setModalType,
        setPoolType,
        setNewTime,
        dateEnd,
        totalTicketAmountRP,
        totalTicketAmountSP
    } = useContext(AppContext);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
	const [percentageTimePassed, setPercentageTimePassed] = useState();
    const dateStart = new Date("12/23/2020 11:50:00").getTime();

    useEffect(() => {
        const interval = setInterval(() => {
            setNewTime(setCountdown);
        }, 1000);

        if (percentageTimePassed >= 100) {
            clearInterval(interval);
        }

        setPercentageTimePassed(Math.floor(((new Date().getTime() - dateStart) / (dateEnd - dateStart)) * 100));

        return () => {
            clearInterval(interval);
        };
    }, [countdown, percentageTimePassed, dateStart, dateEnd, setNewTime]);

    const data = React.useMemo(() => [
        {
            col1: 'DAO Staking Pool',
            col2: '10',
            col3: '0x5546...bc94',
            col4: 'about 2 hours ago',
            col5: 'Deposit',
        },
        {
            col1: 'DAO Staking Pool',
            col2: '5',
            col3: '0x5546...bc94',
            col4: '3 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
        {
            col1: 'Community Reward Pool',
            col2: '43',
            col3: '0x5546...bc94',
            col4: '15 days ago',
            col5: 'Withdraw',
        },
    ], [])
    
    const columns = React.useMemo(() => [
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
                        <div className='my-account-pool-details-head'>
                            <h1>Community Reward Pool</h1>
                            <h1>
                                <img src={logo} alt='Bond Logo' /> Bond
                            </h1>
                        </div>
                        <div className='my-account-pool-buttons'>
                            <button onClick={() => { setSelectedMenuItem(0); history.push('/community-reward-pool/details') }}>Pool Details</button>
                            <button onClick={() => { setOpenModal(true); setModalType('GT'); setPoolType('RP') }}>Get More Tickets</button>
                            <button>Withdraw</button>
                        </div>
                    </div>
                    <div className='my-account-stats'>
                        <div>{poolType === 'RP' ? totalTicketAmountRP : totalTicketAmountSP} Tickets / BOND</div>
                        <div>Current week prize 2000 BOND</div>
                        <div>Odds 1 in 50,6443234</div>
                        <div>3 winners</div>
                        <div>Prize in {countdown.days + 'd:' + countdown.hours + 'h:' + countdown.minutes + 'm:' + countdown.seconds + 's'}</div>
                    </div>
                </div>
            </div>

            <div className='my-account-totals'>
                <div>
                    <h1 className='my-account-title required-changes'>Total Rewards</h1>
                    <div className='pools-box'>
                        <PoolBoxHeader title='Total Rewards' />
                        <div className='pools-box-content required-changes'>
                            <div className='pools-box-inner required-changes'>
                                <div className='pools-box-screen required-changes'>
                                    <div className='pools-box-screen-inner required-changes'>
                                        13.48 bond
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='my-account-title required-changes'>Total Winnings</h1>
                    <div className='pools-box'>
                        <PoolBoxHeader title='Total Winnings' />
                        <div className='pools-box-content required-changes'>
                            <div className='pools-box-inner required-changes'>
                                <div className='pools-box-screen required-changes'>
                                    <div className='pools-box-screen-inner required-changes'>
                                        3 times
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='transactions'>
                <h1 className='my-account-title'>My Transactions</h1>
                <Table title='My Transactions' data={data} columns={columns} pageSize={4} />
            </div>
        </div>
    )
}

export default MyAccount;