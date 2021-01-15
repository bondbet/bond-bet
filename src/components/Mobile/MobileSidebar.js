import React, {useState, useContext, useEffect, useRef} from 'react';
import MenuItems from './MenuItems';
import noLossLotteryImg from '../../assets/images/no-loss-lottery.svg';
import arrowToLeftImg from '../../assets/images/arrowToLeft.svg';
import closeIcon from '../../assets/images/close.svg';
import prizeImg from '../../assets/images/prize.svg';
import statusImg from '../../assets/images/status.svg';
import walletImg from '../../assets/images/wallet.svg';
import networkImg from '../../assets/images/network.svg';
import AppContext from '../../ContextAPI';

const MobileSidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const { connected, setConnected, setOpenModal, setModalType, toggleSidebar, setToggleSidebar } = useContext(AppContext)
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
        <div className='sidebar-overlay'>
            <div className='sidebar-on-mobile'>
                <div className='sidebar-header'>
                    <div className='no-loss-lottery-mobile'>
                        <img src={noLossLotteryImg} alt='No Loss Lottery' />
                        <h2>No Loss Lottery</h2>
                    </div>
                    <button className='close-sidebar' onClick={() => setToggleSidebar(!toggleSidebar)}>
                        <img src={closeIcon} alt='Close Sidebar Icon' />
                    </button>
                </div>
                <div className='sidebar-content'>
                    <div>
                        <div className='connect-wallet-mobile'>
                            {!connected ?
                                <button onClick={() => {
                                    setOpenModal(true);
                                    setModalType('CW');
                                    setToggleSidebar(!toggleSidebar)
                                }}>Connect wallet</button> :
                                <div className='connected'>
                                    <button onClick={() => setOpenDropdown(!openDropdown)} className={openDropdown ? 'dropdownOpened' : ''}>
                                        <img src={prizeImg} alt='Prize' /> {PLACEHOLDER_ACCOUNT.toLocaleLowerCase()}
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
                                                <div className='wallet'>{PLACEHOLDER_WALLET}</div>
                                            </div>
                                            <div className='dropdown-row'>
                                                <div className='dropdown-text'>
                                                    <img src={networkImg} alt='Network' /> Network
                                                </div>
                                                <div className='network'>{PLACEHOLDER_NETWORK}</div>
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
                            <MenuItems />
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
