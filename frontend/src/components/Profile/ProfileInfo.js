import {useState, useEffect, react} from 'react';

const ProfileInfo = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
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
       

    if (loading) return 'Loading...'
    
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
                <h3>Description:</h3>
            </div>
        </div>
        </>
     );
}
 
export default ProfileInfo;