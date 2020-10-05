import React from 'react'
import logo from '../logo.svg';
import '../styles/navbar.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {  AuthDataType, Logout } from '../redux/authReducer'
import { AppStateType } from '../redux/reduxStore';

type NavbarType ={
    auth:AuthDataType
    Logout: ()=>void
}
const Navbar: React.FC<NavbarType> = ({auth, Logout, }) => {
    return (
        <div className="navbar page-block">
            <div className="nav-left">
                <div className="logo">
                    <img src={logo} alt="logo" width="55" />
                </div>
                <ul className="navbar-links">
                    <li><NavLink activeClassName="active-nav" to="/profile">Profile</NavLink></li>
                    <li><NavLink activeClassName="active-nav" to="/messages">Messages</NavLink></li>
                    <li><NavLink activeClassName="active-nav" to="/users">Users</NavLink></li>
                </ul>
            </div>
            <div className="nav-right">
                {
                    (auth.isAuth) ?
                        // <div><NavLink activeClassName="active-nav" to={`/profile/${auth.id}`}>{auth.login}</NavLink> / <button onClick={Logout}>Log Out</button></div> :
                        <div><NavLink activeClassName="active-nav" to={`/profile/`}>{auth.login}</NavLink> / <button onClick={Logout}>Log Out</button></div> :
                        <NavLink activeClassName="active-nav" to="/auth">Auth</NavLink>
                }
            </div>
        </div>

    )
}
type MstpType = {
    auth:AuthDataType
}
type MdtpType={
    Logout: ()=>void
}
type OwnPropsType = {}
let mapStateToProps = (state: AppStateType) => ({
    auth: state.auth
})
let mapDispatchToProps = {
    Logout
}

export default connect<MstpType, MdtpType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(Navbar)
