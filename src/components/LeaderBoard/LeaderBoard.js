import React, {useContext} from 'react'
import Table from '../Table/Table'
import logo from '../../assets/images/onlyLogo.png'
import { useHistory } from 'react-router-dom'
import AppContext from '../../ContextAPI'

const LeaderBoard = () => {
    const history = useHistory();
    const { setSelectedMenuItem } = useContext(AppContext);

    const rp_data = React.useMemo(() => [
        {
            col1: '10',
            col2: '13.48 BOND',
            col3: 'Current...',
        },
        {
            col1: '9',
            col2: '13.48 BOND',
            col3: 'Dec 25th, 2020, 21:11 EST',
        },
        {
            col1: '8',
            col2: '13.48 BOND',
            col3: 'Dec 18th, 2020, 21:08 EST',
        },
        {
            col1: '7',
            col2: '13.48 BOND',
            col3: 'Dec 11th, 2020, 21:10 EST',
        },
        {
            col1: '6',
            col2: '13.48 BOND',
            col3: 'Dec 4th, 2020, 21:12 EST',
        },
        {
            col1: '5',
            col2: '13.48 BOND',
            col3: 'Nov 27th, 2020, 21:26 EST',
        },
        {
            col1: '4',
            col2: '14.48 BOND',
            col3: 'Nov 25th, 2020, 21:26 EST',
        },
        {
            col1: '3',
            col2: '14.48 BOND',
            col3: 'Nov 25th, 2020, 21:26 EST',
        },
        {
            col1: '2',
            col2: '14.48 BOND',
            col3: 'Nov 25th, 2020, 21:26 EST',
        },
        {
            col1: '1',
            col2: '14.48 BOND',
            col3: 'Nov 25th, 2020, 21:26 EST',
        },
    ], [])

    const sp_data = React.useMemo(() => [
        {
            col1: '3',
            col2: '13.48 BOND',
            col3: 'Current...',
        },
        {
            col1: '2',
            col2: '13.48 BOND',
            col3: 'Dec 25th, 2020, 21:11 EST',
        },
        {
            col1: '1',
            col2: '13.48 BOND',
            col3: 'Dec 18th, 2020, 21:08 EST',
        },
    ], [])
    
    const rp_columns = React.useMemo(() => [
        {
            Header: '#',
            accessor: 'col1',
        },
        {
            Header: 'Prize',
            accessor: 'col2',
        },
        {
            Header: 'Awarded on',
            accessor: 'col3',
            Cell: ({ row }) => (<div className='view-details'>{row.values.col3} <button onClick={() => { setSelectedMenuItem(0); history.push(`/community-reward-pool/prize/${row.values.col1}`) }}>View details</button></div> )
        },
    ], [history, setSelectedMenuItem])

    const sp_columns = React.useMemo(() => [
        {
            Header: '#',
            accessor: 'col1',
        },
        {
            Header: 'Prize',
            accessor: 'col2',
        },
        {
            Header: 'Awarded on',
            accessor: 'col3',
            Cell: ({ row }) => (<div className='view-details'>{row.values.col3} <button onClick={() => { setSelectedMenuItem(0); history.push(`/dao-staking-pool/prize/${row.values.col1}`) }}>View details</button></div> )
        },
    ], [history, setSelectedMenuItem])

    return (
       <div className='leaderboard-section'>
            <h1 className='leaderboard-title'>Leaderboard</h1>

            <div className='rp-leaderboard'>
                <h3 className='leaderboard-desc'>
                    <img src={logo} alt='Community Reward Pool' /> Community Reward Pool
                </h3>
                <Table title='Community Reward Pool Winners' data={rp_data} columns={rp_columns} pageSize={6} isLeaderboardTable={true} />
            </div>

            <div className='sp-leaderboard'>
                <h3 className='leaderboard-desc'>
                    <img src={logo} alt='DAO Staking Pool' /> DAO Staking Pool
                </h3>
                <Table title='DAO Staking Pool Winners' data={sp_data} columns={sp_columns} pageSize={6} isLeaderboardTable={true} />
            </div>
        </div>
    )
}

export default LeaderBoard;