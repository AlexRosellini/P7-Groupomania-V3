import {useState, useEffect, react} from 'react';
import Loader from '../Loader/loader';
import usePostStore from '../../stores/post';
import { useHistory, useParams } from "react-router-dom";


const Post = () => {
    const fetchOnePost = usePostStore(state => state.getOnePost);
    const post = usePostStore(state => state.posts);
    const loading = usePostStore(state => state.loading);
    const { id } = useParams();
   
    useEffect( () => {
        if (loading === true) {
            return (
            <Loader/>
            )
        } 
       fetchOnePost(id);
       
    },[])

    return ( 
        <>
            <h1>BLYAT</h1>
        </>    
     );
}
 
export default Post;