import React, {useState} from 'react'
import MobileSidebar from '../Mobile/MobileSidebar';
import appLogo from '../../assets/images/app-logo.png';
import noLossLotteryImg from '../../assets/images/no-loss-lottery.png';
import hamburgerIcon from '../../assets/images/hamburger.png';

const Header = ({selectedMenuItem, setSelectedMenuItem}) => {
    const [toggleSidebar, setToggleSidebar] = useState(false);

    return (
        <header>
            <div className='app-logo'>
                <img src={appLogo} alt='app-logo' />
            </div>
            <div className='no-loss-lottery'>
                <img src={noLossLotteryImg} alt='No Loss Lottery' />
            </div>
            <div className='connect-wallet'>
                <button>Connect wallet</button>
            </div>

            <div className='mobile-menu'>
                <button className='open-sidebar' onClick={() => setToggleSidebar(!toggleSidebar)}>
                    <img src={hamburgerIcon} alt='Hamburger Icon' />
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