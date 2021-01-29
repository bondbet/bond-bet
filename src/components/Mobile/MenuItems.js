import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import poolsImg from '../../assets/images/pools.svg';
import myAccountImg from '../../assets/images/my-account.svg';
import leaderboardImg from '../../assets/images/leaderboard.svg';
import {connect} from 'react-redux';
import { ACTION_TYPE } from '../../store/action-type';

const MenuItems = ({ selectedMenuItem, setSelectedMenuItem, toggleSidebar, setToggleSidebar}) => {
    
    const menuItems = [
        {
            icon: poolsImg,
            text: 'Pools',
            path: '/',
        },
        {
            icon: myAccountImg,
            text: 'My Account',
            path: '/my-account',
        },
        {
            icon: leaderboardImg,
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
                            <img src={menu.icon} alt={menu.text} /> {menu.text}
                        </Link>
                    </li>
                )    
            })}
        </>
    )
}
const mapStateToProps = ({toggleSidebar, selectedMenuItem}) => 
                        ({toggleSidebar, selectedMenuItem})
const mapDispatchToProps = dispatch => ({
    setToggleSidebar: (value) => dispatch({type: ACTION_TYPE.TOGGLE_SIDEBAR, value}),
    setSelectedMenuItem: (value) => dispatch({type: ACTION_TYPE.SELECTED_MENU_ITEM, value})
})
export default connect(mapStateToProps, mapDispatchToProps)(MenuItems)
