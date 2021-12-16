import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from '../../stores/auth';
import usePostStore from '../../stores/post';
import useUserStore from '../../stores/user';

const OtherUser = () => {

    const { id } = useParams();
    
    return ( 
        <>
        <h1>This is {id} profile's page </h1>
        </>
     );
}
 
export default OtherUser;