import {useState, useEffect, react} from 'react';
import Loader from '../Loader/loader';
import useAuthStore from '../../stores/auth';
import useUserStore from '../../stores/user';


const PostForm = () => {

    const data = useUserStore(state => state.currentUser);
    const fetchCurrentUser = useUserStore(state => state.fetchCurrentUser);
    const [title, setTitle] = useState('');
    const [textContent, setTextContent] = useState('');
    const [mediaContent, setMediaContent] = useState('');
    
    useEffect(() => {
        fetchCurrentUser();
        console.log(data)
    },[])

    const handleSubmit = (e) => {
        try {            
            e.preventDefault()            
            const formData = new FormData();
            formData.append('image', mediaContent)
            console.log(title, textContent, mediaContent, data.userName)            
        }
        catch(e) {
            console.log(e)
        }
    }

    return (  
        <>
        <div className="post-form" onSubmit={handleSubmit}>
            <form  className="post-form__form">
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
                <input type="file" name="mediaContent" accept="image/png, image/jpeg, image/bmp, image/gif" className="post-form__input" onChange={event => {
                            const file = event.target.files[0];
                            setMediaContent(file)
                }}/>
                <button type="submit" className="post-form__submit">Envoyer</button>
        </form>
        </div>
        </>
    );
}
 
export default PostForm;