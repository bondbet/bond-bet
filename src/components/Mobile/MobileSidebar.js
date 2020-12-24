import React from 'react';
import MenuItems from './MenuItems';
import noLossLotteryImg from '../../assets/images/no-loss-lottery.png';
import arrowToLeftImg from '../../assets/images/arrowToLeft.png';
import closeIcon from '../../assets/images/close.png';

const MobileSidebar = ({ toggleSidebar, setToggleSidebar, selectedMenuItem, setSelectedMenuItem }) => {
    return (
        <div className='sidebar-overlay'>
            <div className='sidebar-on-mobile'>
                <div className='sidebar-header'>
                    <div className='no-loss-lottery-mobile'>
                        <img src={noLossLotteryImg} alt='No Loss Lottery' />
                    </div>
                    <button className='close-sidebar' onClick={() => setToggleSidebar(!toggleSidebar)}>
                        <img src={closeIcon} alt='Close Sidebar Icon' />
                    </button>
                </div>
            <div className='sidebar-content'>
                    <div>
                        <div className='connect-wallet-mobile'>
                            <button>Connect wallet</button>
                        </div>
                        <ul className='sidebar-menu'>
                            <MenuItems
                                selectedMenuItem={selectedMenuItem}
                                setSelectedMenuItem={setSelectedMenuItem}
                                toggleSidebar={toggleSidebar}
                                setToggleSidebar={setToggleSidebar}
                            />
                        </ul>
                    </div>
                    <div className='sidebar-copyright'>
                        <img src={arrowToLeftImg} alt='Left arrow' />
                        <p>bond.bet © {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileSidebar
