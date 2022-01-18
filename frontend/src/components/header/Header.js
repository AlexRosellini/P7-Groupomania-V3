/*************************************************/
//On Importe ce dont on a besoin.

import React from "react";
import {useEffect} from "react";
import { NavLink } from "react-router-dom";
import useAuthStore from '../../stores/auth';
import useUserStore from '../../stores/user';
import icon from '../../imgs/logo/icon.png';

/*************************************************/
//Notre component

const Header = () => {

    //On récupère des éléments de nos stores...
    const logout = useAuthStore(state => state.logout) //fonction logout
    const data = useUserStore(state => state.currentUser); //utilisateur 
    const fetchCurrentUser = useUserStore(state => state.fetchCurrentUser); //fonction pour récuperer l'utilisateur
    const token = useAuthStore(state => state.token) //Le token de l'utilisateur.

    useEffect(() => {
      if (token) { //Si on a un token.
        fetchCurrentUser(); //On l'utilise pour récuperer l'utilisateur.
      }
    },[]);

    const handleClick = () => { 
        logout(); //On utilise la fonction logout du store.
        window.location.reload(); //et on recharge la page.
    }

    return ( 
        <>
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center flex-no-shrink text-white mr-6">
              <img className="h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" src={icon} alt='groupomania'/>
              <span className="font-semibold text-xl tracking-tight">Groupomania</span>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <div className="text-sm lg:flex-grow">
                <NavLink className="block mt-4 ml-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-purple-800" to={`/MyProfile`}>Profile</NavLink>
                <NavLink className="block mt-4 ml-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-purple-800" to='/'>Posts</NavLink>
                <NavLink className="block mt-4 ml-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-purple-800" to='/create'>Créer un post</NavLink>
                { /*Si on a le token / nos données.*/}
                {token && <NavLink className="block mt-4 ml-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-purple-800" to='#' onClick={handleClick}>logout</NavLink>}
                {data?.isAdmin ? <NavLink className="block mt-4 ml-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-purple-800" to='/AdminBoard'>Admin</NavLink> : ''}
              </div>
            </div>
        </nav>
        </>
     );
}
 
export default Header;