import React from 'react'
import { useTable, usePagination } from 'react-table'
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader'
import prevIcon from '../../assets/images/prev.png'
import nextIcon from '../../assets/images/next.png'

const Table = ({title, data, columns, pageSize, seperateThreeWinners = false}) => {
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
            <div className='pools-box'>
                <PoolBoxHeader title={title} />
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
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()} className={(seperateThreeWinners && pageIndex === 0 && i < 3) ? 'seperateThreeWinners' : ''}>
                                    {row.cells.map(cell => {
                                        return (
                                        <td
                                            className={`table-body-columns ${seperateThreeWinners ? 'second-color' : 'third-color'}`}    
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

export default Table
