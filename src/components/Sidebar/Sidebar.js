import React from 'react'
import MenuItems from '../Mobile/MenuItems'
import arrowToLeftImg from '../../assets/images/arrowToLeft.png';

const Sidebar = ({selectedMenuItem, setSelectedMenuItem}) => {

    return (
        <div className='app-sidebar'>
            <ul className='sidebar-menu'>
                <MenuItems
                    selectedMenuItem={selectedMenuItem}
                    setSelectedMenuItem={setSelectedMenuItem}
                />
            </ul>
            <div className='sidebar-copyright'>
                <img src={arrowToLeftImg} alt='Left arrow' />
                <p>bond.bet © {new Date().getFullYear()}</p>
            </div>
        </div>
    )
}

export default Sidebar
