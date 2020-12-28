import React, {useState} from 'react';
import MenuItems from './MenuItems';
import noLossLotteryImg from '../../assets/images/no-loss-lottery.png';
import arrowToLeftImg from '../../assets/images/arrowToLeft.png';
import closeIcon from '../../assets/images/close.png';
import prizeImg from '../../assets/images/prize.png';
import statusImg from '../../assets/images/status.png';
import walletImg from '../../assets/images/wallet.png';
import networkImg from '../../assets/images/network.png';

const MobileSidebar = ({ toggleSidebar, setToggleSidebar, selectedMenuItem, setSelectedMenuItem, connected, setConnected, setOpenModal }) => {
    const [openDropdown, setOpenDropdown] = useState(false);

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
                            {!connected ?
                                <button onClick={() => { setOpenModal(true); setToggleSidebar(!toggleSidebar) }}>Connect wallet</button> :
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
                                                <div className='wallet'>MetaMask</div>
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
