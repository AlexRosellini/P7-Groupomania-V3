import {useState, useEffect, react} from 'react';
import Loader from '../Loader/loader';
import usePostStore from '../../stores/post';
import useAuthStore from '../../stores/auth'
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";


const Post = () => {
    const fetchOnePost = usePostStore(state => state.getOnePost);
    const deletePost = usePostStore(state => state.deletePost)
    const sendComment = usePostStore(state => state.sendComment);
    const loading = usePostStore(state => state.loading);
    const { id } = useParams();
    const post = usePostStore(state => state.currentPost);
    const token = useAuthStore(state => state.token);
    const userId = useAuthStore(state => state.userId);
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const [postOwner, setPostOwner] = useState(false);
    const [commentOwner, setCommentOwner] = useState(false);


    useEffect( () => {
       fetchOnePost(id, userId);
       if (post.user?.id == userId) {
           setPostOwner(true)
       }
       if (post.user?.comments?.id === userId)  {
           setCommentOwner(true)
       }
       console.log(postOwner)      
    },[])
       


    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            console.log(content);
            console.log(id)
            sendComment(id, token, content)
        }
        catch(err) {
            console.log(err)
        }
    }
    const handleDelete = (e) => {
        e.preventDefault();
        deletePost(id, token);            
        navigate('/');
    }

    if (loading === true) {
        return (
        <Loader/>
        )
    }
    
    

    return ( 
        <>
            <main className="flex-col justify-center bg-gray-900 min-h-screen h-full pt-6 pb-6">
                <div className=" h-fit bg-white mb-6 ml-6 mr-6 mt-12">
                    <h1 className="pt-6 mb-6 text-grey-darkest mb-6 underline-offset-auto font-black"> {post.title} </h1>
                    <NavLink to={`/profile/${post.user?.id}`}>
                        <p className="text-purple-600 font-semibold text-center pb-6">{post.user?.userName}</p><span></span>
                    </NavLink>
                    <div className="flex justify-center h-80"><img src={post.image} alt="image" /></div>
                    <p className="text-gray-600  text-center mb-4 mt-4 text-center"> {post.textContent} </p>
                    <div className="flex-col">
                      <p className="ml-6 text-black">{post.comments?.length} commentaires</p>
                      {postOwner &&
                      <>
                     <div className="flex">
                        <NavLink className='w-full' to={`/edit/${post.id}`}>
                           <button className="font-bold  py-2 px-4 w-full bg-purple-400  text-white shadow-md" >Edit Post</button>
                        </NavLink>  
                        <div className="w-full">
                           <button className="font-bold  py-2 px-4 w-full bg-red-400  text-white shadow-md" onClick={handleDelete}>Delete Post</button>
                        </div>
                     </div>
                      </> }
                    </div>
                </div>
                <div className="mb-6 ml-6 mr-6 bg-gray-900 ">
                    <div>
                        <input type="hidden" />
                        <textarea className="w-full shadow-inner p-4 border-0 mb-4  focus:shadow-outline " placeholder="Ask questions here." cols="6" rows="6" id="comment_content" onChange={(e) => {
                            setContent(e.target.value)
                    }} />
                        <button onClick={handleSubmit} className="font-bold py-2 px-4 w-full bg-purple-400  text-white shadow-md">Comment </button>
                    </div>
                    {
                    post.comments?.map(comment => (
                        <div id="task-comments" className="pt-4 mb-4">
                            <div className="bg-white  p-3  flex flex-col justify-center items-center md:items-start shadow-lg mb-4">
                                    <div className="flex flex-row justify-center mr-2">
                                        <img alt="avatar" width="48" height="48" className=" w-10 h-10 mr-4 shadow-lg mb-4" src={comment.user?.image} />
                                        <h3 className="text-purple-600 font-semibold text-center md:text-left "> {comment.user?.userName} </h3>
                                    </div>
                                    <p className="text-gray-600  text-center md:text-left"> {comment.content} </p>
                                <div className="btn">
                                {commentOwner &&
                                      <>
                                      <div className="div">
                                        <NavLink to={`/edit/${post.id}`}>
                                        <p className="font-bold  py-2 px-4 w-1/4 bg-purple-400  text-white shadow-md" >Edit Post</p>
                                        </NavLink>  
                                      </div>
                                      <div className="div">
                                        <button className="font-bold  py-2 px-4 w-1/4 bg-red-400  text-white shadow-md" onClick={handleDelete}>Delete Post</button>
                                      </div>
                                      </> }
                                </div>
                            </div>
                        </div>))}
                </div>
        </main>
    </>    
 );
}
 
export default Post;