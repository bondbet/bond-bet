import React from 'react'

const Countdown = ({countdown}) => {
    const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div className="pools-box-countdown">
            <div className="pools-box-countdown-cubes">
                <div className="pools-box-countdown-cubes-n">
                    {numbersToAddZeroTo.includes(countdown.days) && <div>0</div>}
                    <div>{countdown.days.toString().substring(0, 1)}</div>
                    {countdown.days === 0 ? <div>0</div> : countdown.days > 9 && <div>{countdown.days.toString().substring(1, 2)}</div>}
                </div>
                <div className="pools-box-countdown-cubes-l">DAY</div>
            </div>
            <div className="pools-box-countdown-cubes">
                <div className="pools-box-countdown-cubes-n">
                    {numbersToAddZeroTo.includes(countdown.hours) && <div>0</div>}
                    <div>{countdown.hours.toString().substring(0, 1)}</div>
                    {countdown.hours === 0 ? <div>0</div> : countdown.hours > 9 && <div>{countdown.hours.toString().substring(1, 2)}</div>}
                </div>
                <div className="pools-box-countdown-cubes-l">HR</div>
            </div>
            <div className="pools-box-countdown-cubes">
                <div className="pools-box-countdown-cubes-n">
                    {numbersToAddZeroTo.includes(countdown.minutes) && <div>0</div>}
                    <div>{countdown.minutes.toString().substring(0, 1)}</div>
                    {countdown.minutes === 0 ? <div>0</div> : countdown.minutes > 9 && <div>{countdown.minutes.toString().substring(1, 2)}</div>}
                </div>
                <div className="pools-box-countdown-cubes-l">MIN</div>
            </div>
            <div className="pools-box-countdown-cubes">
                <div className="pools-box-countdown-cubes-n">
                    {numbersToAddZeroTo.includes(countdown.seconds) && <div>0</div>}
                    <div>{countdown.seconds.toString().substring(0, 1)}</div>
                    {countdown.seconds === 0 ? <div>0</div> : countdown.seconds > 9 && <div>{countdown.seconds.toString().substring(1, 2)}</div>}
                </div>
                <div className="pools-box-countdown-cubes-l">SEC</div>
            </div>
        </div>
    )
}

export default Countdown
