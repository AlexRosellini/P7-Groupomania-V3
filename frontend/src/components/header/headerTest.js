import React from "react";
import {useEffect} from "react";
import { NavLink } from "react-router-dom";
import useAuthStore from '../../stores/auth';
import useUserStore from '../../stores/user';
import icon from '../../imgs/logo/icon.png';


const HeaderTest = () => {

    const logout = useAuthStore(state => state.logout)
    const data = useUserStore(state => state.currentUser);
    const fetchCurrentUser = useUserStore(state => state.fetchCurrentUser);

    useEffect(() => {
        fetchCurrentUser();
        console.log(data);
    },[]);


    const handleClick = () => {
        logout()
    }

    return ( 
        <>
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center flex-no-shrink text-white mr-6">
              <img className="h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" src={icon} alt='groupomania'/>
              <span className="font-semibold text-xl tracking-tight">Groupomania</span>
            </div>
            <div className="block lg:hidden">
              <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
                <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
              </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <div className="text-sm lg:flex-grow">
                <NavLink className="block mt-4 ml-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-purple-800" to={`/MyProfile`}>Profile</NavLink>
                <NavLink className="block mt-4 ml-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-purple-800" to='/posts'>Posts</NavLink>
                <NavLink className="block mt-4 ml-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-purple-800" to='/create'>Créer un post</NavLink>
                <NavLink className="block mt-4 ml-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-purple-800" to='#' onClick={handleClick}>logout</NavLink>
                {data?.isAdmin ? <NavLink className="block mt-4 ml-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-purple-800" to='/AdminBoard'>Admin</NavLink> : ''}
              </div>
            </div>
        </nav>
        </>
     );
}
 
export default HeaderTest;