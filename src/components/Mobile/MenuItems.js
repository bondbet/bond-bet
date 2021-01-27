import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import poolsImg from '../../assets/images/pools.svg';
import myAccountImg from '../../assets/images/my-account.svg';
import leaderboardImg from '../../assets/images/leaderboard.svg';
import AppContext from '../../ContextAPI';
import {connect} from 'react-redux';

const MenuItems = (props) => {
    const { selectedMenuItem, setSelectedMenuItem} = useContext(AppContext);
    
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
                        <Link to={menu.path} className={selectedMenuItem === index ? 'active' : ''} onClick={() => { setSelectedMenuItem(index); props.toggleSidebar && props.setToggleSidebar(!props.toggleSidebar) }}>
                            <img src={menu.icon} alt={menu.text} /> {menu.text}
                        </Link>
                    </li>
                )    
            })}
        </>
    )
}
const mapStateToProps = ({toggleSidebar}) => ({
    toggleSidebar
})
const mapDispatchToProps = dispatch => ({
    setToggleSidebar: (x) => dispatch({type: 'TOGGLE_SIDEBAR', value: x})
})
export default connect(mapStateToProps, mapDispatchToProps)(MenuItems)
