import React, { useState, useContext, useEffect, useRef } from 'react'
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
import { capitalize, shortenEthereumAddress } from '../../helpers/format-utils';
import { connect } from 'react-redux';
import { ACTION_TYPE } from '../../store/action-type';

const Header = ({ connected, provider, connectedWalletName, setSelectedMenuItem, connectedWalletAddress, connectedNetwork, setToggleSidebar, toggleSidebar }) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const { connectWalletHandler, disconnectWalletHandler } = useContext(AppContext);
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
                            <img src={prizeImg} alt='Prize' /> {shortenEthereumAddress(connectedWalletAddress)}
                        </button>
                        {openDropdown &&
                            <div ref={ref} className='dropdown'>
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
                                    <div className='wallet'>{connectedWalletName}</div>
                                </div>
                                <div className='dropdown-row'>
                                    <div className='dropdown-text'>
                                        <img src={networkImg} alt='Network' /> Network
                                    </div>
                                    <div className='network'>{capitalize(connectedNetwork)}</div>
                                </div>
                                <div className='disconnect-button'>
                                    <button onClick={() => disconnectWalletHandler(provider)}>Disconnect</button>
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
const mapStateToProps = (
    {
        toggleSidebar,
        connected,
        provider,
        connectedWalletName,
        setSelectedMenuItem,
        connectedWalletAddress,
        connectedNetwork,
    }) =>
({
    toggleSidebar,
    connected,
    provider,
    connectedWalletName,
    setSelectedMenuItem,
    connectedWalletAddress,
    connectedNetwork,
})
const mapDispatchToProps = dispatch => ({
    setToggleSidebar: (x) => dispatch({ type: 'TOGGLE_SIDEBAR', value: x }),
    setSelectedMenuItem: value => dispatch({type: ACTION_TYPE.SELECTED_MENU_ITEM, value})
   
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);