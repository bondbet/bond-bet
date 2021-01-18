import React, {useState, useContext, useEffect, useRef} from 'react'
import MobileSidebar from '../Mobile/MobileSidebar';
import appLogo from '../../assets/images/app-logo.svg';
import noLossLotteryImg from '../../assets/images/no-loss-lottery.svg';
import hamburgerIcon from '../../assets/images/hamburger.svg';
import prizeImg from '../../assets/images/prize.svg';
import statusImg from '../../assets/images/status.svg';
import walletImg from '../../assets/images/wallet.svg';
import networkImg from '../../assets/images/network.svg';
import { Link } from 'react-router-dom';
import AppContext from '../../ContextAPI';
import { capitalize } from '../../helpers/string-utils';

const Header = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const { connected, setConnected, setOpenModal, setModalType, connectedWalletName, toggleSidebar, setToggleSidebar, wallet, setSelectedMenuItem, connectWalletHandler, connectedWalletAddress, connectedNetwork, disconnectWalletHandler } = useContext(AppContext);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (!event.target.classList.contains('dropdownOpened')) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    })

    var PLACEHOLDER_ACCOUNT = '0X2117C37A65AD3C0489682386F7D81D4C6D08B3C8';
    PLACEHOLDER_ACCOUNT = PLACEHOLDER_ACCOUNT.substring(0, 6) + '..' + PLACEHOLDER_ACCOUNT.substring(PLACEHOLDER_ACCOUNT.length - 4);

    const PLACEHOLDER_STATUS = 'Connected';
    const PLACEHOLDER_NETWORK = 'Mainnet';
    const PLACEHOLDER_WALLET = 'MetaMask';
    return (
        <header>
            <div className='app-logo'>
                <Link to='/' onClick={() => setSelectedMenuItem(0)}>
                    <img src={appLogo} alt='app-logo' />
                </Link>
            </div>
            <div className='no-loss-lottery'>
                <img src={noLossLotteryImg} alt='No Loss Lottery' />
                <h2>No Loss Lottery</h2>
            </div>
            <div className='connect-wallet'>
                {!connected ?
                    <button onClick={connectWalletHandler}>Connect wallet</button> :
                    <div className='connected'>
                        <button onClick={() => setOpenDropdown(!openDropdown)} className={openDropdown ? 'dropdownOpened' : ''}>
                            <img src={prizeImg} alt='Prize' /> {connectedWalletAddress.substring(0,5) + "..." + connectedWalletAddress.substring(connectedWalletAddress.length - 6, connectedWalletAddress.length - 1)}
                        </button>
                        {openDropdown && 
                            <div ref={ref} className='dropdown'>
                                <div className='dropdown-row'>
                                    <div className='dropdown-text'>
                                        <img src={statusImg} alt='Status' /> Status
                                    </div>
                                    <div className='status'>{PLACEHOLDER_STATUS}</div>
                                </div>
                                <div className='dropdown-row'>
                                    <div className='dropdown-text'>
                                        <img src={walletImg} alt='Wallet' /> Wallet
                                    </div>
                                    <div className='wallet'>{connectedWalletName}</div>
                                </div>
                                <div className='dropdown-row'>
                                    <div className='dropdown-text'>
                                        <img src={networkImg} alt='Network' /> Network
                                    </div>
                                    <div className='network'>{capitalize(connectedNetwork)}</div>
                                </div>
                                <div className='disconnect-button'>
                                    <button onClick={disconnectWalletHandler}>Disconnect</button>
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