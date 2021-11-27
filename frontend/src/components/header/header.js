import React from "react";
import {useState} from "react";
import { NavLink } from "react-router-dom";
import header_icon2 from '../../imgs/logo/header_icon2.png';


const Header = () => {

    return ( 
        <header className="header">
            <div className="header__img">
                <NavLink to='/'>
                 <img src={header_icon2} alt="Groupomania Logo" />
                </NavLink>
            </div>
            <div className="header__right">
                <h1>Réseau Officiel de la sociétée Groupomania</h1>
            </div>
            <div className="test"></div>
        </header>
     );
}
 
export default Header;