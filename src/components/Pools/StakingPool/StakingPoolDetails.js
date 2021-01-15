import React, {useEffect, useState, useContext} from 'react'
import { Link, useHistory } from 'react-router-dom';
import onlyLogo from '../../../assets/images/onlyLogo.svg';
import arrowToRight from '../../../assets/images/arrowToRight.svg';
import Countdown from '../Components/Countdown';
import ProgressBar from '../Components/ProgressBar';
import PoolBoxHeader from '../Components/PoolBoxHeader';
import AboutPool from '../Components/AboutPool';
import PoolBoxStats from '../Components/PoolBoxStats';
import AppContext from '../../../ContextAPI';
import presentImg from '../../../assets/images/present.svg';
import timeImg from '../../../assets/images/time.svg';
import bigWalletImg from '../../../assets/images/wallet-lg.svg';
import Table from '../../Table/Table';

const StakingPoolDetails = () => {
    const history = useHistory();
    const { setNewTime, dateEnd, dateStart, setSelectedMenuItem } = useContext(AppContext);

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
        } else {
            setPercentageTimePassed(Math.floor(((new Date().getTime() - dateStart) / (dateEnd - dateStart)) * 100));
        }


        return () => {
            clearInterval(interval);
        };
    }, [countdown, percentageTimePassed, dateStart, dateEnd, setNewTime]);

    const PLACEHOLDER_BONDS = '13.48';
    const PLACEHOLDER_WINNERS = '3';
    const PLACEHOLDER_PLAYERS = '3,045';
    const PLACEHOLDER_TOTAL_TICKETS = '1,342,045';
    const PLACEHOLDER_YIELD_SOURCE = 'BarnBridge DAO Staking';
    const PLACEHOLDER_DESCRIPTION1 = 'The Community Reward Pool is set up by BOND founders and the weekly prize in this pool is provided from BOND Community Rewards.';
    const PLACEHOLDER_DESCRIPTION2 = 'Each week the protocol randomly chooses one winner who gets all the sum of the prize. The staked amount of BOND tokens can be withdrawn at any time without any time lockups.';
    const PLACEHOLDER_PAST_FIVE_PRIZES = [
        {
            id: 1,
            date: 'Jan 1st',
            prize: '3,196.90'
        },
        {
            id: 2,
            date: 'Jan 1st',
            prize: '3,196.90'
        },
        {
            id: 3,
            date: 'Jan 1st',
            prize: '3,196.90'
        },
        {
            id: 4,
            date: 'Jan 1st',
            prize: '3,196.90'
        },
        {
            id: 5,
            date: 'Jan 1st',
            prize: '3,196.90'
        },
    ];

    const PLACEHOLDER_DATA = React.useMemo(() => [
        {
            col1: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col2: '198,249.86',
            col3: '1 in 2.87',
        },
        {
            col1: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col2: '198,249.86',
            col3: '1 in 2.87',
        },
        {
            col1: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col2: '198,249.86',
            col3: '1 in 2.87',
        },
        {
            col1: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col2: '198,249.86',
            col3: '1 in 2.87',
        },
        {
            col1: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col2: '198,249.86',
            col3: '1 in 2.87',
        },
        {
            col1: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col2: '198,249.86',
            col3: '1 in 2.87',
        },
        {
            col1: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col2: '198,249.86',
            col3: '1 in 2.87',
        },
        {
            col1: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col2: '198,249.86',
            col3: '1 in 2.87',
        },
        {
            col1: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col2: '198,249.86',
            col3: '1 in 2.87',
        },
        {
            col1: '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8',
            col2: '198,249.86',
            col3: '1 in 2.87',
        },
    ], [])

    const PLACEHOLDER_COLUMNS = React.useMemo(() => [
        {
            Header: 'Address',
            accessor: 'col1',
            Cell: ({ row }) => (row.values.col1.substring(0,6) + '..' + row.values.col1.substring(row.values.col1.length - 4))
        },
        {
            Header: 'Tickets',
            accessor: 'col2',
        },
        {
            Header: 'Odds',
            accessor: 'col3',
            Cell: ({ row }) => (<div className='view-details'>{row.values.col3} <button onClick={() => { setSelectedMenuItem(0); history.push(`/dao-staking-pool/player/${row.values.col1.toLowerCase()}`) }}>View player</button></div> )
        },
    ], [history, setSelectedMenuItem])

    
    return (
        <div className='reward-pool-details-section'>
            <h1 className='reward-pool-details-title'>
                <img src={onlyLogo} alt='DAO Staking Pool' /> DAO Staking Pool
            </h1>
            <div className='breadcrumbs'>
                <Link to='/'>Lottery Pools</Link>
                <img src={arrowToRight} alt='Right Arrow' />
                <label>DAO Staking Pool</label>
            </div>

            <div className='pools-box-container'>
                <div className='pools-box'>
                    <PoolBoxHeader title='Current Week Prize' />
                    <div className='pools-box-content required-changes'>
                        <div className='pools-box-inner required-changes'>
                            <h1 className='pools-box-inner-title required-changes'>
                                <img src={presentImg} alt='Current Week Prize' /> Current Week Prize
                            </h1>
                            <div className='pools-box-screen required-changes'>
                                <div className='pools-box-screen-inner'>
                                    {`${PLACEHOLDER_BONDS} bond`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pools-box'>
                    <PoolBoxHeader title='Time Left' />
                    <div className='pools-box-content required-changes'>
                        <div className='pools-box-inner required-changes'>
                            <h1 className='pools-box-inner-title required-changes'>
                                <img src={timeImg} alt='Time Left' /> Time Left
                            </h1>
                            <ProgressBar percentageTimePassed={percentageTimePassed} />
                            <Countdown countdown={countdown} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='pools-box required-changes'>
                <PoolBoxHeader title='DAO Staking Pool' />
                <PoolBoxStats
                    winners={PLACEHOLDER_WINNERS}
                    players={PLACEHOLDER_PLAYERS}
                    totalTickets={PLACEHOLDER_TOTAL_TICKETS}
                />
            </div>

            <div className='pools-box-container'>
                <div className='pools-box yield-source'>
                    <PoolBoxHeader title='Yield source' />
                    <div className='pools-box-content required-changes'>
                        <div className='pools-box-inner required-changes'>
                            <h1 className='pools-box-inner-title required-changes'>
                                <img src={bigWalletImg} alt='Yield source' /> Yield source
                            </h1>
                            <div className='pools-box-screen required-changes'>
                                <h1 className='yield-source-title'>
                                    <img src={onlyLogo} alt='BarnBridge DAO Staking' /> {PLACEHOLDER_YIELD_SOURCE}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pools-box past-five-prizes'>
                    <PoolBoxHeader title='Past 5 prizes' />
                    <div className='pools-box-content required-changes'>
                        <div className='pools-box-inner required-changes'>
                            <h1 className='pools-box-inner-title required-changes'>
                                <img src={presentImg} alt='Past 5 prizes' /> Past 5 prizes
                            </h1>
                            <div className='pools-box-screen required-changes'>
                                {PLACEHOLDER_PAST_FIVE_PRIZES.map(item => {
                                    return (
                                        <div key={item.id} className='past-prizes'>
                                            <div>{item.date}</div>
                                            <div></div>
                                            <div>${item.prize}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='players'>
                <Table title='Players' data={PLACEHOLDER_DATA} columns={PLACEHOLDER_COLUMNS} pageSize={6} isLeaderboardTable={true} isAddress={true} />
            </div>

            <div className='pools-box'>
                <PoolBoxHeader title='About the Pool' />
                <AboutPool
                    title='About the Pool'
                    description={PLACEHOLDER_DESCRIPTION1}
                    more={PLACEHOLDER_DESCRIPTION2}
                />
            </div>
        </div>
    )
}

export default StakingPoolDetails
