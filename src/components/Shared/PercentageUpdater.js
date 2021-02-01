import React, {useEffect, useState, useContext} from 'react'
import AppContext from '../../ContextAPI';
import {connect} from 'react-redux';
import { ACTION_TYPE } from '../../store/action-type';



const CountdownPercantageUpdater = ({setPercentageTimePassed,  prizePeriodEnds, prizePeriodStartedAt, prizePoolRemainingSeconds}) => {

    useEffect(() => {
        if(prizePoolRemainingSeconds && prizePeriodEnds && prizePeriodEnds.gt(0) && prizePeriodStartedAt && prizePeriodStartedAt.gt(0)) {
            const totalSeconds = prizePeriodEnds.sub(prizePeriodStartedAt)
            const secondsPassed = totalSeconds.sub(prizePoolRemainingSeconds);

            setPercentageTimePassed(
                Math.floor(secondsPassed.toNumber() / totalSeconds.toNumber() * 100)
            );
    
     
        }
        
    }, [prizePeriodEnds, prizePeriodStartedAt, prizePoolRemainingSeconds]);

    return (null)
};
const mapStateToProps = (state, {poolType}) => {
   return  {
        prizePeriodEnds: state[poolType].prizePeriodEnds, 
        prizePeriodStartedAt: state[poolType].prizePeriodStartedAt, 
        prizePoolRemainingSeconds: state[poolType].prizePoolRemainingSeconds
    }
};

const mapDispatchToProps = (dispatch, {poolType}) => ({
    setPercentageTimePassed: (value) => dispatch({type: ACTION_TYPE.PERCANTAGE_TIME_PASSED, value,poolType})
})

export default connect(mapStateToProps, mapDispatchToProps)(CountdownPercantageUpdater);