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
    console.log(image)

    useEffect(() => { 
        fetchCurrentUser();
        console.log(data)
    }, [])
       
    if (currentUserLoading) return <Loader/>

    const handleClick = () => {    

        try {
           console.log(description)
           updateUserDesc( userId, token, description)
           console.log(description)
        }
        catch (error) {
            console.log(error)
        }
    }

    //const handlePic = (e) => {
    //    try {    
    //        console.log(image)
    //        e.preventDefault()            
    //        updateUserPicture( userId, token, image)
    //    }
    //    catch(error) {
    //        console.log(error)
    //    } 
    //}

    const handlePic = async(e) => {
        e.preventDefault()
        const formData = new FormData();
        console.log(formData)
        formData.append('image', image)
        const response = fetch(`http://localhost:3000/api/user/${userId}`, {
          method: 'PUT',
          credentials: 'include',                
          headers: {
              'Authorization': `Bearer ${token}`,
            },
          body: 
            formData
      })
        if (response.ok) {        
          const res = response.json();
          console.log(res)
        } else {
              console.log(response)
          }
      }

    return ( 
        <>
        <div className="profile__surround">               
        <div className="profile">        
            <div className="profile-left">
                <h2>Votre Avatar:</h2>
                <div className="profile-left__picture">
                    <img src={data?.image} alt="placeholder" />
                    
                </div>
                    <input id='files' accept="image/png, image/jpeg,
                        image/bmp, image/gif" type="file" className="profile-left__files"
                        onChange={event => {
                            const file = event.target.files[0];
                            setImage(file)
                        }}/>
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
                    <textarea type="text"
                    className="profile-right__description-input" size='30' onChange={(e) => {
                        setDescription(e.target.value)
                    }} />
                    <button className="profile-right__changeDescription" onClick={handleClick} >Changer votre bio!</button>
                </div>
            </div>
        </div>
        </div>     
        </>
     );
}
 
export default ProfileInfo;