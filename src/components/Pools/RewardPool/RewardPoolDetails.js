import React, {useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import onlyLogo from '../../../assets/images/onlyLogo.svg';
import arrowToRight from '../../../assets/images/arrowToRight.svg';
import Countdown from '../Components/Countdown';
import ProgressBar from '../Components/ProgressBar';
import PoolBoxHeader from '../Components/PoolBoxHeader';
import AboutPool from '../Components/AboutPool';
import PoolBoxStats from '../Components/PoolBoxStats';
import presentImg from '../../../assets/images/present.svg';
import timeImg from '../../../assets/images/time.svg';
import bigWalletImg from '../../../assets/images/wallet-lg.svg';
import Table from '../../Table/Table';
import { formatEtherWithDecimals } from '../../../helpers/format-utils';
import { formatToHumatReadableDate } from '../../../helpers/date';
import { BigNumber, ethers } from 'ethers';
import {connect} from 'react-redux';
import { ACTION_TYPE } from '../../../store/action-type';

const RewardPoolDetails = (
    {
        percentageTimePassed, 
        numberOfWinners, 
        setSelectedMenuItem, 
        totalTicketAmount, 
        playerData, 
        setPlayerData, 
        previousAwards, 
        currentWeekPrice, 
        allDeposits, 
        allWithdraws, 
        poolType, 
        POOL_TITLE, 
        POOL_YIELD_SOURCE,
        POOL_URL,
        DESCRIPTION1,
        DESCRIPTION2
    }) => {
    const history = useHistory();

    const PLACEHOLDER_COLUMNS = React.useMemo(() => [
        {
            Header: 'Address',
            accessor: 'address',
            Cell: ({ row }) => (row.values.address.substring(0,6) + '..' + row.values.address.substring(row.values.address.length - 4))
        },
        {
            Header: 'Tickets',
            accessor: 'ticketsBalance',
        },
        {
            Header: 'Odds',
            accessor: 'col3',
            Cell: ({ row }) => 
            (<div className='view-details'>{row.values.odds} 
              <button 
                    onClick={() => { setSelectedMenuItem(0); history.push(`/${POOL_URL}/player/${row.values.address.toLowerCase()}`) }}>View player
              </button></div> )
        },
    ], [history, setSelectedMenuItem])


    useEffect(() => {

        if(allWithdraws && allDeposits && previousAwards) {
            const playerToCurrentTicketBalanceMap = new Map();

         allWithdraws.forEach((withdraw) => {
             if(!playerToCurrentTicketBalanceMap.has(withdraw.address)) {
                playerToCurrentTicketBalanceMap.set(withdraw.address, BigNumber.from('0'));
             }
             playerToCurrentTicketBalanceMap.set(withdraw.address, playerToCurrentTicketBalanceMap.get(withdraw.address).sub(withdraw.amount))
         })

         allDeposits.forEach((deposit) => {
            if(!playerToCurrentTicketBalanceMap.has(deposit.address)) {
               playerToCurrentTicketBalanceMap.set(deposit.address,  BigNumber.from('0'));
            }
          
            playerToCurrentTicketBalanceMap.set(deposit.address, playerToCurrentTicketBalanceMap.get(deposit.address).add(deposit.amount))
        }) ;
        previousAwards.forEach((award) => {
            if(!playerToCurrentTicketBalanceMap.has(award.awardedTo)) {
               playerToCurrentTicketBalanceMap.set(award.awardedTo,  BigNumber.from('0'));
            }
          
            playerToCurrentTicketBalanceMap.set(award.awardedTo, playerToCurrentTicketBalanceMap.get(award.awardedTo).add(award.amount))
        }) ;

        const playersWithMoreThanZeroTickets = [...playerToCurrentTicketBalanceMap.keys()].filter(x => playerToCurrentTicketBalanceMap.get(x).gt('0'))

        setPlayerData(playersWithMoreThanZeroTickets.map(x => ({
            address: x, 
            ticketsBalance: formatEtherWithDecimals(playerToCurrentTicketBalanceMap.get(x),2), 
            odds: (+ethers.utils.formatEther(totalTicketAmount) / +ethers.utils.formatEther(playerToCurrentTicketBalanceMap.get(x))).toFixed(2)
        })).sort((a,b) => +b.ticketsBalance - +a.ticketsBalance)
        )


        }
   
    }, [allDeposits, allWithdraws, previousAwards])
    
    return (
        <div className='reward-pool-details-section'>
            <h1 className='reward-pool-details-title'>
                <img src={onlyLogo} alt={POOL_TITLE} /> {POOL_TITLE}
            </h1>
            <div className='breadcrumbs'>
                <Link to='/'>Lottery Pools</Link>
                <img src={arrowToRight} alt='Right Arrow' />
                <label>{POOL_TITLE}</label>
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
                                {currentWeekPrice ? <div className='pools-box-screen-inner'>
                                    {`${formatEtherWithDecimals(currentWeekPrice, 2)} bond`}
                                </div>
                                : null}
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
                            <ProgressBar percentageTimePassed={percentageTimePassed}  poolType={poolType} />
                            <Countdown poolType={poolType} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='pools-box required-changes'>
                <PoolBoxHeader title='Pool Information' />
                <PoolBoxStats
                    winners={numberOfWinners.toString()}
                    players={playerData.length}
                    totalTickets={formatEtherWithDecimals(totalTicketAmount, 2)}
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
                                    <img src={onlyLogo} alt={POOL_YIELD_SOURCE} /> {POOL_YIELD_SOURCE}
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
                                {previousAwards.slice().sort((a, b) => b.timestamp - a.timestamp).slice(0, 5).map((item, index) => {
                                    return (
                                        <div key={index} className='past-prizes'>
                                            <div>{formatToHumatReadableDate(item.timestamp)}</div>
                                            <div></div>
                                            <div>{formatEtherWithDecimals(item.amount, 2)}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='players'>
                <Table title='Players' data={playerData} columns={PLACEHOLDER_COLUMNS} pageSize={6} isLeaderboardTable={true} isAddress={true} />
            </div>

            <div className='pools-box'>
                <PoolBoxHeader title='About the Pool' />
                <AboutPool
                    title='About the Pool'
                    description={DESCRIPTION1}
                    more={DESCRIPTION2}
                />
            </div>
        </div>
    )
}
const mapStateToProps = (state, {poolType}) => 
                        (
                            {
                                percentageTimePassed:state[poolType].percentageTimePassed, 
                                playerData:state[poolType].playerData, 
                                currentWeekPrice:state[poolType].currentWeekPrice, 
                                totalTicketAmount:state[poolType].totalTicketAmount, 
                                previousAwards:state[poolType].previousAwards, 
                                allDeposits:state[poolType].allDeposits, 
                                allWithdraws:state[poolType].allWithdraws,
                                numberOfWinners: state[poolType].numberOfWinners,
                                POOL_TITLE: state[poolType].TITLE,
                                POOL_YIELD_SOURCE: state[poolType].YIELD_SOURCE,
                                POOL_URL: state[poolType].URL,
                                DESCRIPTION1: state[poolType].DESCRIPTION1,
                                DESCRIPTION2: state[poolType].DESCRIPTION2
                             })
const mapDispatchToProps = (dispatch, {poolType}) => ({
    setPlayerData: (value) => dispatch({type: ACTION_TYPE.PLAYER_DATA, poolType, value}),
    setSelectedMenuItem: value => dispatch({type: ACTION_TYPE.SELECTED_MENU_ITEM, value})
})
export default connect(mapStateToProps, mapDispatchToProps)(RewardPoolDetails)
