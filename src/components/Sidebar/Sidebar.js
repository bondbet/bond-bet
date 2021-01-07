import React from 'react'
import MenuItems from '../Mobile/MenuItems'
import arrowToLeftImg from '../../assets/images/arrowToLeft.png';

const Sidebar = () => {

    return (
        <div className='app-sidebar'>
            <ul className='sidebar-menu'>
                <MenuItems />
            </ul>
            <button className='sidebar-copyright'>
                <img src={arrowToLeftImg} alt='Left arrow' />
                <p>bond.bet © {new Date().getFullYear()}</p>
            </button>
        </div>
    )
}

export default Sidebar
