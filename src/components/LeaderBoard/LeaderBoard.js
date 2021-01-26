import React, { useContext, useEffect, useState } from 'react'
import Table from '../Table/Table'
import logo from '../../assets/images/onlyLogo.svg'
import { useHistory } from 'react-router-dom'
import AppContext from '../../ContextAPI'
import { formatToHumatReadableDate } from '../../helpers/date'
import { formatEtherWithDecimals, shortenEthereumAddress } from '../../helpers/format-utils'

const LeaderBoard = () => {
    const history = useHistory();
    const { setSelectedMenuItem, previousAwards } = useContext(AppContext);

    const [awardData, setAwardData ] = useState([]);

    console.log(1)
    useEffect(() => {
        if (previousAwards) {
            console.log(2)
            setAwardData(previousAwards.slice().sort((a, b) => {
                const greater = a.amount.gt(b.amount);
                if(greater) {
                    return -1;
                }
                return 1;
            })
                                      .slice(0, 4)
                                      .map((award, index) => 
                                      ({ col1: index + 1, col2: formatEtherWithDecimals(award.amount, 2), col3: formatToHumatReadableDate(award.timestamp), col4: award.awardedTo })
                                      ))
        }
    }, [previousAwards])

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
            accessor: 'col3'
        },
        {
            Header: 'Winner',
            accessor: 'col4'
        },
    ], [history, setSelectedMenuItem])


    return (
        <div className='leaderboard-section'>
            <h1 className='leaderboard-title'>Leaderboard</h1>

            <div className='rp-leaderboard'>
                <h3 className='leaderboard-desc'>
                    <img src={logo} alt='Community Reward Pool' /> Community Reward Pool
                </h3>
                <Table title='Community Reward Pool Winners' data={awardData} columns={rp_columns} pageSize={6} isLeaderboardTable={true} isHashtag={true} />
            </div>

        </div>
    )
}

export default LeaderBoard;