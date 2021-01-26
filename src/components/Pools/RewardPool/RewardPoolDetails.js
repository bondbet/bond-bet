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
import * as ethers from 'ethers';
import { formatEtherWithDecimals } from '../../../helpers/format-utils';

const RewardPoolDetails = () => {
    const {  percentageTimePassed, setSelectedMenuItem, totalTicketAmount, currentWeekPrice } = useContext(AppContext);
    const history = useHistory();

    const PLACEHOLDER_PLAYERS = '3,045';
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
            Cell: ({ row }) => (<div className='view-details'>{row.values.col3} <button onClick={() => { setSelectedMenuItem(0); history.push(`/community-reward-pool/player/${row.values.col1.toLowerCase()}`) }}>View player</button></div> )
        },
    ], [history, setSelectedMenuItem])

    
    return (
        <div className='reward-pool-details-section'>
            <h1 className='reward-pool-details-title'>
                <img src={onlyLogo} alt='Community Reward Pool' /> Community Reward Pool
            </h1>
            <div className='breadcrumbs'>
                <Link to='/'>Lottery Pools</Link>
                <img src={arrowToRight} alt='Right Arrow' />
                <label>Community Reward Pool</label>
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
                                    {`${formatEtherWithDecimals(currentWeekPrice, 2)} bond`}
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
                            <Countdown />
                        </div>
                    </div>
                </div>
            </div>

            <div className='pools-box required-changes'>
                <PoolBoxHeader title='Pool Information' />
                <PoolBoxStats
                    winners="1"
                    players={PLACEHOLDER_PLAYERS}
                    totalTickets={ethers.utils.formatEther(totalTicketAmount)}
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

export default RewardPoolDetails
