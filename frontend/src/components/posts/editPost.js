import {useState, useEffect, react} from 'react';
import Loader from '../Loader/loader';
import usePostStore from '../../stores/post';
import useAuthStore from '../../stores/auth'
import { useNavigate, useParams } from "react-router-dom";


const EditPost = () => {
    const fetchOnePost = usePostStore(state => state.getOnePost);
    const loading = usePostStore(state => state.loading);
    const { id } = useParams();
    const post = usePostStore(state => state.currentPost);
    const editPost = usePostStore(state => state.editPost);
    const token = useAuthStore(state => state.token)
    const [title, setTitle] = useState(null);
    const [textContent, setTextContent] = useState(null);
    const [mediaContent, setMediaContent] = useState(null);
    

    useEffect( () => {
       fetchOnePost(id);       
       console.log(post);
    },[])

    if (loading === true) {
        return (
        <Loader/>
        )
    }
    console.log(title);
    console.log(textContent);
    console.log(mediaContent)

    const handleSubmit = (e) => {
        e.preventDefault()            
        const formData = new FormData();
        if (title !== null || title !== undefined) {
            formData.append('title', title)
        }
        if (textContent !== null || textContent !== undefined) {
            formData.append('textContent', textContent);
        }
        if (mediaContent !== null || mediaContent !== undefined) {
        formData.append('image', mediaContent)
        }
        editPost(id, token, formData)
    }

    return ( 
        <>
        <main className=" min-h-screen h-full flex flex-col  items-center bg-gray-900">
                <form  className="post-form__form border w-2/3" onSubmit={handleSubmit}>
                    <h1>Edition de votre poste</h1>
                    <label htmlFor="title" className="post-form__label">
                        Titre:
                    </label>
                    <input type="text" name="title" className="post-form__input" onChange={(e) => {
                            setTitle(e.target.value)
                    }} />
                    <label htmlFor="textContent" className="post-form__label">
                        Texte:
                    </label>
                    <textarea type="text" name="textContent" className="post-form__input" placeholder="Quoi de neuf aujourd'huis?" onChange={(e) => {
                            setTextContent(e.target.value)
                    }} />
                    <label htmlFor="mediaContent" className="post-form__label">
                        Image:
                    </label>
                    <input type="file" name="mediaContent" accept="image/png, image/jpeg, image/bmp, image/gif" className="pb-6" onChange={event => {
                                const file = event.target.files[0];
                                setMediaContent(file)
                    }}/>
                    <button type="submit" className="font-bold  py-2 px-4 w-1/2 bg-purple-400  text-white shadow-md">Envoyer</button>
                </form>
        </main>
        </>    
 );
}
 
export default EditPost;