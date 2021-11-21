import {useState, useEffect, react} from 'react';
import Loader from '../Loader/loader';


const ProfileInfo = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [description, setDescription] = useState(null)
    const userId = JSON.parse(window.localStorage.getItem('userid'));
    console.log(userId)

    useEffect(() => { 
        fetch('http://localhost:3000/api/auth/' + userId)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } 
            throw response
        })
        .then(data => {
            setData(data)
            console.log(data)
        })
        .finally (() => {
            setLoading(false)
        })
    },[])
       
    if (loading) return <Loader/>
    
    return ( 
        <>
        <h1>Bienvenu sur votre profile {data.userName}</h1>
        <div className="profile">
            
            <div className="profile-left">
                <h2>Votre Avatar:</h2>
                <div className="profile-left__picture">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="placeholder" />
                </div>
            </div>
            <div className="profile-right">
                <div className="profile-right__info">
                <h3>Nom de compte:</h3>
                <p> {data.userName} </p>
                <h3>Votre Email</h3>
                <p> {data.email} </p>    
                </div>
                <div className="profile-right__description">

                </div>
            </div>
        </div>
        </>
     );
}
 
export default ProfileInfo;