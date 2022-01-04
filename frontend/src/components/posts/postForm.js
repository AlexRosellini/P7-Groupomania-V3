import {useState} from 'react';

const PostForm = ({onSubmit, data}) => {

    const [title, setTitle] = useState('');
    const [textContent, setTextContent] = useState('');
    const [mediaContent, setMediaContent] = useState('');
    const formData = new FormData();
    formData.append('image', mediaContent)
    formData.append('title', title)
    formData.append('textContent', textContent);
    
    return (  
        <>
        <main className="min-h-screen h-full flex flex-col  items-center bg-gray-400">
                <form  className="post-form__form border w-1/2" onSubmit={(event) => {
                        event.preventDefault();
                        onSubmit(formData)
                    }}>
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
                    <button type="submit" className="font-bold  py-2 px-4 w-1/2 bg-purple-400  text-white shadow-md">Envoyer</button>
                </form>
        </main>
        </>
    );
}
 
export default PostForm;