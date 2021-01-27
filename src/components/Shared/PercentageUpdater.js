import React, {useEffect, useState, useContext} from 'react'
import AppContext from '../../ContextAPI';
import {connect} from 'react-redux';



const CountdownPercantageUpdater = ({setPercentageTimePassed}) => {

    const { prizePeriodEnds, prizePeriodStartedAt, prizePoolRemainingSeconds} = useContext(AppContext);


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
const mapDispatchToProps = (dispatch) => ({
    setPercentageTimePassed: (value) => dispatch({type: 'PERCENTAGE_TIME_PASSED', value})
})

export default connect(null, mapDispatchToProps)(CountdownPercantageUpdater);