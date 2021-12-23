import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from '../../stores/auth';
import usePostStore from '../../stores/post';
import useUserStore from '../../stores/user';
import Loader from '../Loader/loader';
import {useState, useEffect, react} from 'react';


const OtherUser = ({profile}) => {

    console.log(profile)
    
    return ( 
        <main className="bg-gray-200">
            <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
        	    <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
        	    	<div className="p-4 md:p-12 text-center lg:text-left">
        	    		<div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"></div>

        	    		<h1 className="text-3xl font-bold pt-8 lg:pt-0"> {profile?.userName} </h1>
        	    		<div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
        	    		<p className="pt-8 text-sm"> {profile?.description} </p>
        	    	</div>
        	    </div>
        	    <div className="w-full lg:w-2/5">
        	    	<img src={profile?.image} class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"/>
        	    </div>	
            </div>        
        </main>
     );
}
 
export default OtherUser;