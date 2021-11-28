import {useState, useEffect, react} from 'react';
import Loader from '../Loader/loader';
import useAuthStore from '../../stores/auth';
import useUserStore from '../../stores/user';



const ProfileInfo = () => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const data = useUserStore(state => state.currentUser);
    const updateUserDesc = useUserStore(state => state.updateUserDesc);
    const updateUserPicture = useUserStore(state => state.updateUserPicture);
    const currentUserLoading = useUserStore(state => state.loading);
    const fetchCurrentUser = useUserStore(state => state.fetchCurrentUser);
    const token = useAuthStore(state => state.token)
    const userId = useAuthStore(state => state.userId);
    

    useEffect(() => { 
        fetchCurrentUser();
        console.log(data)
    }, [])
       
    if (currentUserLoading) return <Loader/>

    const handleClick = () => {    

        try {
           updateUserDesc( userId, token, description)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handlePic = () => {
        try {        
            const files = document.getElementById("files");
            console.log(files)
            const file = files.files[0]
            setImage(files)
            let myFormData = new FormData();
            myFormData.append('image', file)
            updateUserPicture( userId, token, myFormData)

        }
        catch(error) {
            console.log(error)
        } 
    }

    return ( 
        <>
        <h1>Bienvenu sur votre profile {data?.userName}</h1>
        <div className="profile">
            
            <div className="profile-left">
                <h2>Votre Avatar:</h2>
                <div className="profile-left__picture">
                    <img src={image} alt="placeholder" />
                </div>
                <input id='files' accept="image/png, image/jpeg,
                    image/bmp, image/gif" type="file" className="profile-left__files" onChange={(e) => {
                    setImage(e.target.value)}}  />
                <button className="profile-left__submit" onClick={handlePic}>Changer photo de profil</button>
            </div>
            <div className="profile-right">
                <div className="profile-right__info">
                    <h3>Nom de compte:</h3>
                    <p> {data?.userName} </p>
                    <h3>Votre Email</h3>
                    <p> {data?.email} </p>    
                </div>
                <div className="profile-right__description">
                <h3>Dites en plus sur vous!</h3>
                    <p> {data?.description} </p>
                    <input type="text" className="profile-right__description-input"/>
                    <button className="profile-right__changeDescription" onClick={handleClick} >Changer votre bio!</button>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default ProfileInfo;