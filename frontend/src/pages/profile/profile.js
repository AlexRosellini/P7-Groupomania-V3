import isAuthenticated from "../../services/AuthService";
import Header from "../../components/header/header";
import ProfileInfo from "../../components/Profile/ProfileInfo";


const Profile = () => {
    if (isAuthenticated() === false) {
        window.location.replace('/')
    } else {

        return (
            <>
            <ProfileInfo/>
            </>
        )
    }
} 

export default Profile;