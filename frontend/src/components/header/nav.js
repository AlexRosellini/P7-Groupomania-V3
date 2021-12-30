import React from "react";
import {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import useAuthStore from '../../stores/auth';


const Nav = () => {

    const logout = useAuthStore(state => state.logout)
    const token = useAuthStore(state => state.token)

    const handleClick = () => {
        logout()
    }
    return (  
        <>
        <div className="nav">
            <ul className="nav__ul">
                <NavLink to={`/MyProfile`}>
                    <li className="nav__li">
                        Profile
                    </li>
                </NavLink>
                <NavLink to='/posts'>
                    <li className="nav__li">
                        Posts
                    </li>
                </NavLink>
                <NavLink to='/create'>
                    <li className="nav__li">
                        Créer un post
                    </li>
                </NavLink>
                <li className="nav__li" onClick={handleClick}>
                    Logout
                </li>
                <NavLink to='/AdminBoard'>
                    <li className="nav__li">
                        Admin
                    </li>
                </NavLink>
            </ul>
        </div>
        </>
    );
}
 
export default Nav;