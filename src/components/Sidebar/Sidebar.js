import React from 'react'
import MenuItems from '../Mobile/MenuItems'
import arrowToLeftImg from '../../assets/images/arrowToLeft.svg';

const Sidebar = () => {

    const handleBondBetClick =  (e) => {
        e.preventDefault();
        window.location.href='https://bond.bet'
    }
    
    return (
        <div className='app-sidebar'>
            <ul className='sidebar-menu'>
                <MenuItems />
            </ul>
            <div className='sidebar-copyright' onClick={handleBondBetClick}>
                <img src={arrowToLeftImg} alt='Left arrow' />
                <p>bond.bet © {new Date().getFullYear()}</p>
            </div>
        </div>
    )
}

export default Sidebar
