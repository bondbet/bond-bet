import React from 'react'
import { Link } from 'react-router-dom';

const MenuItems = ({selectedMenuItem, setSelectedMenuItem, toggleSidebar, setToggleSidebar}) => {
    const menuItems = [
        {
            icon: 'fab fa-product-hunt fa-fw',
            text: 'Pools',
            path: '/',
        },
        {
            icon: 'fas fa-user-circle fa-fw',
            text: 'My Account',
            path: '/my-account',
        },
        {
            icon: 'fas fa-clipboard-list fa-fw',
            text: 'Leaderboard',
            path: '/leaderboard',
        },
    ];

    return (
        <>
            {menuItems.map((menu, index) => {
                return (
                    <li key={index}>
                        <Link to={menu.path} className={selectedMenuItem === index ? 'active' : ''} onClick={() => { setSelectedMenuItem(index); toggleSidebar && setToggleSidebar(!toggleSidebar) }}>
                            <i className={menu.icon}></i> {menu.text}
                        </Link>
                    </li>
                )    
            })}
        </>
    )
}

export default MenuItems
