import {useState} from 'react';

const CurrUserProfile = ({profile, onDescChange, onPicChange}) => {

    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const formData = new FormData();
    console.log(description);

    return ( 
        <main className="bg-gray-400">
            <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
        	    <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
        	    	<div className="p-4 md:p-12 text-center lg:text-left">
        	    		<div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"></div>
        	    		<h1 className="text-3xl font-bold pt-8 lg:pt-0"> {profile?.userName} </h1>
        	    		<div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
        	    		<p className="pt-8 text-sm"> {profile?.description} </p>
                        <div className="flex, flex-col">
                            <input type="text" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                             text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-4"
                             onChange={(e) => {
                                setDescription(e.target.value)
                            }}/>
                            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white
                            bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={(e) => {
                                console.log(description)
                                e.preventDefault();
                                onDescChange(description)
                            }}>Changer votre bio!</button>
                        </div>
        	    	</div>
        	    </div>
        	    <div className="w-full  lg:rounded-lg lg:w-2/5 bg-white">
        	    	<img src={profile?.image} class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"/>
                    <input id='files' accept="image/png, image/jpeg,
                        image/bmp, image/gif" type="file" className="profile-left__files"
                        onChange={event => {
                            const file = event.target.files[0];
                            setImage(file)
                        }}/>
                    <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium  text-white
                    bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
                    onClick={(event) => {
                        event.preventDefault();
                        formData.append('image', image)
                        onPicChange(formData)
                    }}>
                    Changer photo de profil</button>
        	    </div>	
            </div>        
        </main>
     );
}
 
export default CurrUserProfile;