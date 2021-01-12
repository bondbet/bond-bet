import React from 'react'
import { useTable, usePagination } from 'react-table'
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader'
import prevIcon from '../../assets/images/prev.svg'
import nextIcon from '../../assets/images/next.svg'

const Table = ({title, data, columns, pageSize, isLeaderboardTable = false, isHashtag = false}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: pageSize }, }, usePagination);

    const displayPages = () => {
        const buttons = [];
        for (let i = 0; i < pageCount; i++) {   
            buttons.push(<button key={i} onClick={() => gotoPage(i)} className={pageIndex === i ? 'activePage' : ''}>{i+1}</button>)
        }
        return buttons;
    }

    return (
        <>
            <div className='pools-box change-shadow'>
                <PoolBoxHeader title={title} />
                <div className='my-account-pool-box-content required-changes'>
                    <div>
                        <table {...getTableProps()} className={`table ${!isLeaderboardTable ? 'required-changes' : ''}`}>
                            <thead>
                                {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column,i) => (
                                    <th
                                        className={`table-header ${isLeaderboardTable ? 'second-color' : 'third-color'} ${isHashtag ? 'hashtag' : ''}`}    
                                            {...column.getHeaderProps()}
                                    >
                                        {column.render('Header')}
                                    </th>
                                    ))}
                                </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row, i) => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}
                                            className={i % 2 === 0 ? 'even' : 'odd'}
                                        >
                                            {row.cells.map(cell => {
                                                return (
                                                    <td
                                                        className={`table-body-columns ${isLeaderboardTable ? 'second-color' : 'third-color'}`}    
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
            </div>

            {data.length > pageSize &&
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
            }
        </>
    )
}

export default Table
