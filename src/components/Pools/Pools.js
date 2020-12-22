import React from 'react'
import inRoadImg from '../../assets/images/in-road.png';

const Pools = () => {
    const inRoad = 68;
    return (
        <div className='lottery-pools-section'>
            <h1 className='title'>Lottery Pools</h1>
            <div className='pools-box'>

                <div className='pools-box-header'>
                    <div className='pools-box-header-text-left-lines'>
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                    <div className='pools-box-header-text'>Community Reward Pool</div>
                    <div className='pools-box-header-text-right-lines'>
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                </div>

                <div className='pools-box-content'>
                    <div className='pools-box-inner'>
                        <h1 className='pools-box-inner-title'>Community Reward Pool</h1>
                        <div className='pools-box-screen'>
                            <div className='pools-box-screen-inner'>
                                13.48 bond
                            </div>
                        </div>
                        <div className='pools-box-progress'>
                            <p className='in-road'>In road: {inRoad}%</p>
                            <div className='progress-bar'>
                                <img src={inRoadImg} alt='In Road' style={{ left: `calc(${inRoad}% - 37px)` }} />
                                <div className='progress-bar-fill' style={{ width: inRoad+'%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className='pools-box-buttons'>
                        <button>Get Tickets</button>
                        <button>Pool Details</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pools;