import React, { useEffect, useState } from 'react'
import Table from '../Table/Table'
import logo from '../../assets/images/onlyLogo.svg'
import { useHistory } from 'react-router-dom'
import { formatToHumatReadableDate } from '../../helpers/date'
import { formatEtherWithDecimals } from '../../helpers/format-utils'
import {connect} from 'react-redux';
import { ACTION_TYPE } from '../../store/action-type'

const LeaderBoardDetails = ({previousAwards, setSelectedMenuItem, POOL_TITLE}) => {
    const history = useHistory();

    const [awardData, setAwardData ] = useState([]);
    useEffect(() => {
        if (previousAwards) {
            setAwardData(previousAwards.slice().sort((a, b) => {
                const greater = a.amount.gt(b.amount);
                if(greater) {
                    return -1;
                }
                return 1;
            })
                                      .slice(0, 5)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [history, setSelectedMenuItem])


    return (
        <div>

            <div className='rp-leaderboard'>
                <h3 className='leaderboard-desc'>
                    <img src={logo} alt={POOL_TITLE} /> {POOL_TITLE}
                </h3>
                <Table title={POOL_TITLE + '   Top 5 Winners'}  data={awardData} columns={rp_columns} pageSize={10} isLeaderboardTable={true} isHashtag={true} />
            </div>

        </div>
    )
}

const mapStateToProps = (state, {poolType}) => ({previousAwards: state[poolType].previousAwards, POOL_TITLE: state[poolType].TITLE});
const mapDispatchToProps = dispatch => ({
    setSelectedMenuItem: value => dispatch({type: ACTION_TYPE.SELECTED_MENU_ITEM, value})
})

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardDetails);