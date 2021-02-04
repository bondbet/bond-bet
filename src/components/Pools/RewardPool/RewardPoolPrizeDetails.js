import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import onlyLogo from '../../../assets/images/onlyLogo.svg'
import arrowToRight from '../../../assets/images/arrowToRight.svg'
import presentImg from '../../../assets/images/present.svg'
import { Link } from 'react-router-dom'

import PoolBoxHeader from '../Components/PoolBoxHeader';
import PoolBoxStats from '../Components/PoolBoxStats';
import Table from '../../Table/Table'
import { connect } from 'react-redux'
import { ACTION_TYPE } from '../../../store/action-type'

const RewardPoolPrizeDetails = ({ setSelectedMenuItem, POOL_URL, POOL_TITLE }) => {
    const { id } = useParams();
    const history = useHistory();
    const PLACEHOLDER_WINNERS_COLUMNS = React.useMemo(() => [
        {
            Header: 'Address',
            accessor: 'col1',
            Cell: ({ row }) => (row.values.col1.substring(0, 6) + '..' + row.values.col1.substring(row.values.col1.length - 4))
        },
        {
            Header: 'Tickets',
            accessor: 'col2',
        },
        {
            Header: 'Odds',
            accessor: 'col3',
            Cell: ({ row }) => (<div className='view-details'>{row.values.col3} <button onClick={() => { setSelectedMenuItem(0); history.push(`/${POOL_URL}/player/${row.values.col1.toLowerCase()}`) }}>View player</button></div>)
        },
    ], [history, setSelectedMenuItem])

    const PLACEHOLDER_WINNERS_DATA = React.useMemo(() => [
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

    const PLACEHOLDER_PLAYERS_COLUMNS = React.useMemo(() => [
        {
            Header: 'Address',
            accessor: 'col1',
            Cell: ({ row }) => (row.values.col1.substring(0, 6) + '..' + row.values.col1.substring(row.values.col1.length - 4))
        },
        {
            Header: 'Tickets',
            accessor: 'col2',
        },
        {
            Header: 'Odds',
            accessor: 'col3',
            Cell: ({ row }) => (<div className='view-details'>{row.values.col3} <button onClick={() => { setSelectedMenuItem(0); history.push(`/${POOL_URL}/player/${row.values.col1.toLowerCase()}`) }}>View player</button></div>)
        },
    ], [history, setSelectedMenuItem])

    const PLACEHOLDER_PLAYERS_DATA = React.useMemo(() => [
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

    const PLACEHOLDER_PRIZE_AWARDED_ON = 'Jan 1st, 2021, 21:11 UTC';
    const PLACEHOLDER_BONDS = '13.48';
    const PLACEHOLDER_WINNERS = '3';
    const PLACEHOLDER_PLAYERS = '3,045';
    const PLACEHOLDER_TOTAL_TICKETS = '1,342,045';

    return (
        <div className='reward-pool-details-section'>
            <h1 className='reward-pool-details-title'>
                <img src={onlyLogo} alt={POOL_TITLE} /> {POOL_TITLE}
            </h1>
            <div className='breadcrumbs'>
                <Link to='/leaderboard' onClick={() => setSelectedMenuItem(2)}>Leaderboard</Link>
                <img src={arrowToRight} alt='Right Arrow' />
                <label>Prize #{id}</label>
            </div>

            <div className='pools-box required-changes'>
                <PoolBoxHeader title='Prize' />
                <div className='pools-box-content required-changes'>
                    <div className='pools-box-inner required-changes'>
                        <h1 className='pools-box-inner-title required-changes'>
                            <img src={presentImg} alt='Winners' /> {`Prize awarded on ${PLACEHOLDER_PRIZE_AWARDED_ON}`}
                        </h1>
                        <div className='pools-box-screen required-changes'>
                            <div className='pools-box-screen-inner'>{`${PLACEHOLDER_BONDS} bond`}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='pools-box required-changes'>
                <PoolBoxHeader title='Community Reward Pool' />
                <PoolBoxStats
                    winners={PLACEHOLDER_WINNERS}
                    players={PLACEHOLDER_PLAYERS}
                    totalTickets={PLACEHOLDER_TOTAL_TICKETS}
                />
            </div>

            <Table title='Winners' data={PLACEHOLDER_WINNERS_DATA} columns={PLACEHOLDER_WINNERS_COLUMNS} pageSize={6} isLeaderboardTable={true} isAddress={true} />

            <Table title='Players' data={PLACEHOLDER_PLAYERS_DATA} columns={PLACEHOLDER_PLAYERS_COLUMNS} pageSize={6} isLeaderboardTable={true} isAddress={true} />
        </div>
    )
}
const mapStateToProps = (state, { poolType }) => ({ POOL_URL: state[poolType].URL, POOL_TITLE: state[poolType].TITLE })
const mapDispatchToProps = (dispatch) => ({
    setSelectedMenuItem: value => dispatch({ type: ACTION_TYPE.SELECTED_MENU_ITEM, value })
})
export default connect(mapStateToProps, mapDispatchToProps)(RewardPoolPrizeDetails)
