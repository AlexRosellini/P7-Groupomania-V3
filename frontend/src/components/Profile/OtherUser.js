const OtherUser = ({profile}) => {
    
    return ( 
        <main className="bg-gray-400 h-screen pt-4 pb-4">
            <div className="flex justify-center m-4 h-auto flex-wrap">
        	    <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg pl-2 pr-2 lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 pb-4 lg:mx-0">
        	    	<div className="p-4 text-center">        	    		
                        <h1 className="text-3xl font-bold pt-1 lg:pt-0"> {profile?.userName} </h1>
                        <div className="flex justify-center items-center">
                            <img className="w-40 h-40 lg:w-80 lg:h-80 object-cover rounded-full
                            border-2 border-green-500 p-1" src={profile?.image} alt="profile"/>
                        </div>
        	    		<div className="mx-auto lg:mx-0 w-5/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
        	    		<p className="pt-8 text-sm"> <span className="font-bold pr-2">Biographie:</span> {profile?.description} </p>
        	    	</div>
        	    </div>
            </div>        
        </main>
     );
}
 
export default OtherUser;