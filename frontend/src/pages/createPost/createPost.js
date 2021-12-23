import PostForm from "../../components/posts/postForm";
import useAuthStore from '../../stores/auth';
import useUserStore from '../../stores/user';
import usePostStore from '../../stores/post';
import { useNavigate} from "react-router-dom";

const CreatePost = () => {

    const data = useUserStore(state => state.currentUser);
    const sendPost = usePostStore(state => state.sendPost);
    const token = useAuthStore(state => state.token);
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {            
            await sendPost(token,formData) 
            navigate('/posts')
        }
        catch(e) {
            console.log(e)
        }
    }

    return ( 
        <>
        <PostForm
        data = {data}
        onSubmit = {handleSubmit}/>
        </>
     );
}
 
export default CreatePost;