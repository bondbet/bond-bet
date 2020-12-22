import React from 'react'
import MenuItems from '../Mobile/MenuItems'

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
                <i className="fal fa-long-arrow-left"></i>
                <p>bond.bet © {new Date().getFullYear()}</p>
            </div>
        </div>
    )
}

export default Sidebar
