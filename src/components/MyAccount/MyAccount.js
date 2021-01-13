import React, {useContext, useState, useEffect} from 'react'
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader'
import logo from '../../assets/images/onlyLogo.svg';
import diamond from '../../assets/images/diamond.svg';
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
        dateStart,
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

    const withdraw = () => {
        if (poolType === 'RP') {
            if (totalTicketAmountRP > 0) {
                setOpenModal(true);
                setModalType('WD');
                setPoolType('RP')
            } else {
                alert('Sorry. Not enough tickets!')
            }
        } else {
            if (totalTicketAmountSP > 0) {
                setOpenModal(true);
                setModalType('WD');
                setPoolType('SP')
            } else {
                alert('Sorry. Not enough tickets!')
            }
        }
    }

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
                            <button onClick={() => { setOpenModal(true); setModalType('GT'); setPoolType('RP') }}>Get More Tickets</button>
                            <button onClick={withdraw}>Withdraw</button>
                        </div>
                    </div>
                    <div className='my-account-stats'>
                        <div><b>{poolType === 'RP' ? totalTicketAmountRP : totalTicketAmountSP} Tickets / BOND</b></div>
                        <div>Current week prize <b>2000 BOND</b></div>
                        <div>Odds <b>1</b> in <b>50,6443234</b></div>
                        <div><b>3</b> winners</div>
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
                                    <div className='pools-box-screen-inner required-changes'>
                                        13.48 bond
                                    </div>
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
                <Table title='My Transactions' data={data} columns={columns} pageSize={4} />
            </div>
        </div>
    )
}

export default MyAccount;