import React from "react";
import {useState} from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (  
        <>
        <div className="nav">
            <ul className="nav__ul">
                <NavLink to='/profile'>
                    <li className="nav__li">
                        <p>Profile</p>
                    </li>
                </NavLink>
                <NavLink to='/posts'>
                    <li className="nav__li">
                        <p>Posts</p>
                    </li>
                </NavLink>
                <NavLink to='/create'>
                    <li className="nav__li">
                        <p>Créer un post</p>
                    </li>
                </NavLink>
            </ul>
        </div>
        </>
    );
}
 
export default Nav;