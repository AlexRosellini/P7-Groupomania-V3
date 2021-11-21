import isAuthenticated from "../../services/AuthService";

const Profile = () => {
    if (isAuthenticated() === false) {
        window.location.replace('/')
    } else {
        return (
            <>
            <h1>profile</h1>
            </>
        )
    }
} 

export default Profile;