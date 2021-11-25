import {useState, useEffect, react} from 'react';
import Loader from '../Loader/loader';


const ProfileInfo = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [description, setDescription] = useState('')
    const userId = JSON.parse(window.localStorage.getItem('userid'));
    console.log(userId)

    useEffect(() => { 
        fetch(`http://localhost:3000/api/auth/${userId}`)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } 
            throw response
        })
        .then(data => {                
            setData(data)
            setDescription(data.description)
            console.log(data)
        })
        .finally (() => {
            setLoading(false)
        })
    },[])
       
    if (loading) return <Loader/>

    const handleClick = async() => {
        try {
        console.log(description)
        let updatedDesc = description
        console.log(updatedDesc)
        let token = window.localStorage.getItem('token')
        fetch(`http://localhost:3000/api/auth/${userId}`, {
            method: 'PUT',
            credentials: 'include',                
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                updatedDesc
            })
        })
        .then((response) => {
            if (response.ok) {        
                console.log(response)
            } else {
                console.log(response, description)
            }
        })
        }
        catch (error) {
            console.log(error)
        }
    }

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
                <h3>Dites en plus sur vous!</h3>
                    <p> {description} </p>
                    <input type="text" className="profile-right__description-input" onChange={(e) => 
                    setDescription(e.target.value)} />
                    <button className="profile-right__changeDescription" onClick={handleClick} >Changer votre bio!</button>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default ProfileInfo;