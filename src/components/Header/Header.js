import React, {useState} from 'react'
import MobileSidebar from '../Mobile/MobileSidebar';

const Header = ({selectedMenuItem, setSelectedMenuItem}) => {
    const [toggleSidebar, setToggleSidebar] = useState(false);

    return (
        <header>
            <div className='app-logo'>
                <h1>Logo Here</h1>
            </div>
            <div className='no-loss-lottery'>
                <i className='fal fa-gift'></i>
                <h4>No Loss Lottery</h4>
            </div>
            <div className='connect-wallet'>
                <button>Connect wallet</button>
            </div>

            <div className='mobile-menu'>
                <button className='open-sidebar' onClick={() => setToggleSidebar(!toggleSidebar)}>
                    <i className='fas fa-bars'></i>
                </button>
                {toggleSidebar &&
                    <MobileSidebar
                        toggleSidebar={toggleSidebar}
                        setToggleSidebar={setToggleSidebar}
                        selectedMenuItem={selectedMenuItem}
                        setSelectedMenuItem={setSelectedMenuItem}
                    />
                }
            </div>
        </header>
    )
}

export default Header;