import React, { useContext, useEffect, useState } from 'react'
import Table from '../Table/Table'
import logo from '../../assets/images/onlyLogo.svg'
import { useHistory } from 'react-router-dom'
import AppContext from '../../ContextAPI'
import { formatToHumatReadableDate } from '../../helpers/date'
import { formatEtherWithDecimals } from '../../helpers/format-utils'
import {connect} from 'react-redux';
import { ACTION_TYPE } from '../../store/action-type'
import LeaderBoardDetails from './LeaderBoardDetails'
import { POOL_TYPE } from '../../store/pool-type'

const LeaderBoard = () => {
  
    return (
        <div className='leaderboard-section'>
            <h1 className='leaderboard-title'>Leaderboard</h1>

           
               <LeaderBoardDetails poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}></LeaderBoardDetails>
               <LeaderBoardDetails poolType={POOL_TYPE.NEW_POOL}></LeaderBoardDetails>

        </div>
    )
}

export default LeaderBoard;