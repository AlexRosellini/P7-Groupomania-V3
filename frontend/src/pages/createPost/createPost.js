import PostForm from "../../components/posts/postForm";
import {useState, useEffect, react} from 'react';
import useAuthStore from '../../stores/auth';
import useUserStore from '../../stores/user';
import usePostStore from '../../stores/post';
import { useNavigate} from "react-router-dom";

const CreatePost = () => {

    const data = useUserStore(state => state.currentUser);
    const fetchCurrentUser = useUserStore(state => state.fetchCurrentUser);
    const sendPost = usePostStore(state => state.sendPost);
    const token = useAuthStore(state => state.token);



    const handleSubmit = (formData) => {
        try {            
            sendPost(token,formData) 
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