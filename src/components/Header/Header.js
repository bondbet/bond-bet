import React, {useState, useContext} from 'react'
import MobileSidebar from '../Mobile/MobileSidebar';
import appLogo from '../../assets/images/app-logo.png';
import noLossLotteryImg from '../../assets/images/no-loss-lottery.png';
import hamburgerIcon from '../../assets/images/hamburger.png';
import prizeImg from '../../assets/images/prize.png';
import statusImg from '../../assets/images/status.png';
import walletImg from '../../assets/images/wallet.png';
import networkImg from '../../assets/images/network.png';
import { Link } from 'react-router-dom';
import AppContext from '../../ContextAPI';

const Header = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const { connected, setConnected, setOpenModal, setModalType, toggleSidebar, setToggleSidebar, wallet, setSelectedMenuItem } = useContext(AppContext);

    return (
        <header>
            <div className='app-logo'>
                <Link to='/' onClick={() => setSelectedMenuItem(0)}>
                    <img src={appLogo} alt='app-logo' />
                </Link>
            </div>
            <div className='no-loss-lottery'>
                <img src={noLossLotteryImg} alt='No Loss Lottery' />
            </div>
            <div className='connect-wallet'>
                {!connected ?
                    <button onClick={() => { setOpenModal(true); setModalType('CW') }}>Connect wallet</button> :
                    <div className='connected'>
                        <button onClick={() => setOpenDropdown(!openDropdown)} className={openDropdown ? 'dropdownOpened' : ''}>
                            <img src={prizeImg} alt='Prize' /> 0x3d51..883
                        </button>
                        {openDropdown && 
                            <div className='dropdown'>
                                <div className='dropdown-row'>
                                    <div className='dropdown-text'>
                                        <img src={statusImg} alt='Status' /> Status
                                    </div>
                                    <div className='status'>Connected</div>
                                </div>
                                <div className='dropdown-row'>
                                    <div className='dropdown-text'>
                                        <img src={walletImg} alt='Wallet' /> Wallet
                                    </div>
                                    <div className='wallet'>{wallet}</div>
                                </div>
                                <div className='dropdown-row'>
                                    <div className='dropdown-text'>
                                        <img src={networkImg} alt='Network' /> Network
                                    </div>
                                    <div className='network'>Mainnet</div>
                                </div>
                                <div className='disconnect-button'>
                                    <button onClick={() => { setOpenDropdown(!openDropdown); setConnected(false) }}>Disconnect</button>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>

            <div className='mobile-menu'>
                <button className='open-sidebar' onClick={() => setToggleSidebar(!toggleSidebar)}>
                    <img src={hamburgerIcon} alt='Hamburger Icon' />
                </button>
                {toggleSidebar &&
                    <MobileSidebar />
                }
            </div>
        </header>
    )
}

export default Header;