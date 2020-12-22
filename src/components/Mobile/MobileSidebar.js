import React from 'react';
import MenuItems from './MenuItems';

const MobileSidebar = ({ toggleSidebar, setToggleSidebar, selectedMenuItem, setSelectedMenuItem }) => {
    return (
        <div className='sidebar-overlay'>
            <div className='sidebar-on-mobile'>
                <div className='sidebar-header'>
                    <div className='no-loss-lottery-mobile'>
                        <i className='fal fa-gift'></i>
                        <h4>No Loss Lottery</h4>
                    </div>
                    <button className='close-sidebar' onClick={() => setToggleSidebar(!toggleSidebar)}>
                        <i className="fas fa-times"></i>
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
                        <i className="fal fa-long-arrow-left"></i>
                        <p>bond.bet © {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileSidebar
