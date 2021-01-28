import React, {useEffect, useState, useContext} from 'react'
import { Link, useHistory } from 'react-router-dom';
import onlyLogo from '../../../assets/images/onlyLogo.svg';
import arrowToRight from '../../../assets/images/arrowToRight.svg';
import Countdown from '../Components/Countdown';
import ProgressBar from '../Components/ProgressBar';
import PoolBoxHeader from '../Components/PoolBoxHeader';
import AboutPool from '../Components/AboutPool';
import PoolBoxStats from '../Components/PoolBoxStats';
import AppContext from '../../../ContextAPI';
import presentImg from '../../../assets/images/present.svg';
import timeImg from '../../../assets/images/time.svg';
import bigWalletImg from '../../../assets/images/wallet-lg.svg';
import Table from '../../Table/Table';
import { formatEtherWithDecimals } from '../../../helpers/format-utils';
import { formatToHumatReadableDate } from '../../../helpers/date';
import { BigNumber, ethers } from 'ethers';
import {connect} from 'react-redux';
import { ACTION_TYPE } from '../../../store/action-type';

const RewardPoolDetails = ({percentageTimePassed, playerData, setPlayerData, currentWeekPrice}) => {
    const { setSelectedMenuItem, totalTicketAmount, previousAwards, allDeposits, allWithdraws } = useContext(AppContext);
    const history = useHistory();

    const PLACEHOLDER_YIELD_SOURCE = 'BarnBridge DAO Staking';
    const PLACEHOLDER_DESCRIPTION1 = 'The Community Reward Pool is set up by BOND founders and the weekly prize in this pool is provided from BOND Community Rewards.';
    const PLACEHOLDER_DESCRIPTION2 = 'Each week the protocol randomly chooses one winner who gets all the sum of the prize. The staked amount of BOND tokens can be withdrawn at any time without any time lockups.';
    console.log('my aasdasdascc', currentWeekPrice)


    useEffect(() => {
        console.log(currentWeekPrice)
    }, [currentWeekPrice])

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
                    onClick={() => { setSelectedMenuItem(0); history.push(`/community-reward-pool/player/${row.values.address.toLowerCase()}`) }}>View player
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
                <img src={onlyLogo} alt='Community Reward Pool' /> Community Reward Pool
            </h1>
            <div className='breadcrumbs'>
                <Link to='/'>Lottery Pools</Link>
                <img src={arrowToRight} alt='Right Arrow' />
                <label>Community Reward Pool</label>
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
                            <ProgressBar percentageTimePassed={percentageTimePassed} />
                            <Countdown />
                        </div>
                    </div>
                </div>
            </div>

            <div className='pools-box required-changes'>
                <PoolBoxHeader title='Pool Information' />
                <PoolBoxStats
                    winners="1"
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
                                    <img src={onlyLogo} alt='BarnBridge DAO Staking' /> {PLACEHOLDER_YIELD_SOURCE}
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
                                {previousAwards.slice().sort((a, b) => b.timestamp - a.timestamp).slice(0, 5).map(item => {
                                    return (
                                        <div key={item.timestamp} className='past-prizes'>
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
                    description={PLACEHOLDER_DESCRIPTION1}
                    more={PLACEHOLDER_DESCRIPTION2}
                />
            </div>
        </div>
    )
}
const mapStateToProps = ({percentageTimePassed, playerData, currentWeekPrice}) => 
                        ({percentageTimePassed, playerData, currentWeekPrice})
const mapDispatchToProps = (dispatch) => ({
    setPlayerData: (value) => dispatch({type: ACTION_TYPE.PLAYER_DATA, value})
})
export default connect(mapStateToProps, mapDispatchToProps)(RewardPoolDetails)
