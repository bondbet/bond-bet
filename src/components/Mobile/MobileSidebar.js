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
import {connect} from 'react-redux';
import { capitalize, shortenEthereumAddress } from '../../helpers/format-utils';


const MobileSidebar = (props) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const { connected, provider, connectedWalletName, connectedNetwork, connectedWalletAddress, connectWalletHandler, disconnectWalletHandler} = useContext(AppContext)
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
        <div className='sidebar-overlay'>
            <div className='sidebar-on-mobile'>
                <div className='sidebar-header'>
                    <div className='no-loss-lottery-mobile'>
                        <img src={noLossLotteryImg} alt='No Loss Lottery' />
                        <h2>No Loss Lottery</h2>
                    </div>
                    <button className='close-sidebar' onClick={() => props.setToggleSidebar(!props.toggleSidebar)}>
                        <img src={closeIcon} alt='Close Sidebar Icon' />
                    </button>
                </div>
                <div className='sidebar-content'>
                    <div>
                        <div className='connect-wallet-mobile'>
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
                                                <div className='wallet'>{capitalize(connectedWalletName)}</div>
                                            </div>
                                            <div className='dropdown-row'>
                                                <div className='dropdown-text'>
                                                    <img src={networkImg} alt='Network' /> Network
                                                </div>
                                                <div className='network'>{capitalize(connectedNetwork)}</div>
                                            </div>
                                            <div className='disconnect-button'>
                                                <button onClick={() => { disconnectWalletHandler(provider) }}>Disconnect</button>
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
const mapStateToProps = ({toggleSidebar}) => ({
    toggleSidebar
})
const mapDispatchToProps = dispatch => ({
    setToggleSidebar: (x) => dispatch({type: 'TOGGLE_SIDEBAR', value: x})
})
export default connect(mapStateToProps, mapDispatchToProps)(MobileSidebar)
