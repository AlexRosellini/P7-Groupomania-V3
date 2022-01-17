import {useState} from 'react';

const CurrUserProfile = ({profile, onDescChange, onPicChange}) => {

    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const formData = new FormData();

    return ( 
        <main className="bg-gray-400 pt-4 pb-4">
            <div className="flex justify-center items-center m-4 h-auto flex-wrap">
        	    <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg pl-2 pr-2 lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 pb-4 lg:mx-0">
        	    	<div className="p-4 text-center">        	    		
                        <h1 className="text-3xl font-bold pt-1 lg:pt-0"> {profile?.userName} </h1>
                        <div className="flex justify-center items-center">
                            <img className="w-40 h-40 lg:w-80 lg:h-80 object-cover rounded-full
                            border-2 border-green-500 p-1" src={profile?.image} alt="profile"/>
                        </div>
                        <div className="w-full bg-white flex flex-col mt-5 justify-center items-center">
                            <input id='files' accept="image/png, image/jpeg,
                                image/bmp, image/gif" type="file" className="lg:w-2/3 m-4
                                text-gray-700 border border-solid border-gray-300 rounded
                                transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                onChange={event => {
                                    const file = event.target.files[0];
                                    setImage(file)
                                }}/>
                            <button className="lg:w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium  text-white
                            bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
                            onClick={(event) => {
                                event.preventDefault();
                                formData.append('image', image)
                                onPicChange(formData)
                            }}>
                            Changer photo de profil</button>
                        </div>
        	    		<div className="mx-auto lg:mx-0 w-5/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
        	    		<p className="pt-8 text-sm"> <span className="font-bold pr-2">Biographie:</span> {profile?.description} </p>
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
            </div>        
        </main>
     );
}
 
export default CurrUserProfile;