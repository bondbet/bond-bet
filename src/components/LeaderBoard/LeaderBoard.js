import React from 'react'
import Table from '../Table/Table'

const LeaderBoard = () => {
    const data = React.useMemo(() => [
        {
            col1: '0x3d51..883',
            col2: '0x5546...bc94',
            col3: '13.48 BOND',
            col4: 'Dec 4th',
        },
        {
            col1: '0x3d51..883',
            col2: '0x5546...bc94',
            col3: '13.48 BOND',
            col4: 'Dec 4th',
        },
        {
            col1: '0x3d51..883',
            col2: '0x5546...bc94',
            col3: '13.48 BOND',
            col4: 'Dec 4th',
        },
        {
            col1: '0x3d51..883',
            col2: '0x5546...bc94',
            col3: '13.48 BOND',
            col4: 'Dec 4th',
        },
        {
            col1: '0x3d51..883',
            col2: '0x5546...bc94',
            col3: '13.48 BOND',
            col4: 'Dec 4th',
        },
        {
            col1: '0x3d51..883',
            col2: '0x5546...bc94',
            col3: '13.48 BOND',
            col4: 'Dec 4th',
        },
        {
            col1: '0x3d51..883',
            col2: '0x5546...bc94',
            col3: '13.48 BOND',
            col4: 'Dec 4th',
        },
        {
            col1: '0x3d51..883',
            col2: '0x5546...bc94',
            col3: '13.48 BOND',
            col4: 'Dec 4th',
        },
        {
            col1: '0x3d51..883',
            col2: '0x5546...bc94',
            col3: '13.48 BOND',
            col4: 'Dec 4th',
        },
        {
            col1: '0x3d51..883',
            col2: '0x5546...bc94',
            col3: '13.48 BOND',
            col4: 'Dec 4th',
        },
    ], [])
    
    const columns = React.useMemo(() => [
        {
            Header: 'Adress (3 winners)',
            accessor: 'col1',
        },
        {
            Header: 'TX Hash',
            accessor: 'col2',
        },
        {
            Header: 'Prize',
            accessor: 'col3',
        },
        {
            Header: 'Time',
            accessor: 'col4',
        },
    ], [])

    return (
       <div className='leaderboard-section'>
            <h1 className='leaderboard-title'>Leaderboard</h1>
            <h3 className='leaderboard-desc'>Community Reward Pool Winners</h3>
            <Table title='Community Reward Pool Winners' data={data} columns={columns} pageSize={6} seperateThreeWinners={true} />
        </div>
    )
}

export default LeaderBoard;