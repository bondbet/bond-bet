import React, {useEffect} from 'react'
import { useTable, usePagination } from 'react-table'
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader'
import prevIcon from '../../assets/images/prev.png'
import nextIcon from '../../assets/images/next.png'

const TransactionsTable = () => {
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
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex },
    } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 4 }, }, usePagination);


    const displayPages = () => {
        const buttons = [];
        for (let i = 0; i < pageCount; i++) {
            buttons.push(<button key={i} onClick={() => gotoPage(i)} className={pageIndex === i ? 'activePage' : ''}>{i+1}</button>)
        }
        console.log(buttons)
        return buttons;
    }

    return (
        <>
            <div className='pools-box'>
                <PoolBoxHeader title='My Transactions' />
                <div className='my-account-pool-box-content required-changes'>
                    <table {...getTableProps()} className='table'>
                        <thead>
                            {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                <th
                                    className='table-header'    
                                    {...column.getHeaderProps()}
                                >
                                    {column.render('Header')}
                                </th>
                                ))}
                            </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                        <td
                                            className='table-body-columns'    
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                        )
                                    })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="table-pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className='prev-next-buttons'>
                    <img src={prevIcon} alt='Previous Page' />
                </button>
                <div className='displayPages'>
                    {displayPages()}
                </div>
                <button onClick={() => nextPage()} disabled={!canNextPage} className='prev-next-buttons'>
                    <img src={nextIcon} alt='Next Page' />
                </button>
            </div>
        </>
    )
}

export default TransactionsTable
