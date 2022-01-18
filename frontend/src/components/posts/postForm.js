/*************************************************/
//On Importe ce dont on a besoin.

import {useState} from 'react';
import { useAlert } from "react-alert";

/*************************************************/
//Notre component

const PostForm = ({onSubmit}) => { //On récupère de la page.

    const [title, setTitle] = useState(null); //On set le hook title,
    const [textContent, setTextContent] = useState(null); //on set le hook textContent
    const [mediaContent, setMediaContent] = useState(null); //on set le hook mediaContent
    const formData = new FormData(); //On set le formData
    const alert = useAlert(); //On set nos alertes

    formData.append('image', mediaContent) //On ajoute mediaContent sur notre formData
    formData.append('title', title) //On ajoute title sur notre formData
    formData.append('textContent', textContent); //On ajoute textContent sur notre formData
    
    return (  
        <>
        <main className="min-h-screen h-full flex flex-col  items-center bg-gray-400">
                <form  className="post-form__form border w-1/2" onSubmit={(event) => {
                        event.preventDefault(); //On empêche le reload par défaut de la page.
                        if (textContent === null || textContent === "" || title === null || title === '') { //Si les valeurs texte et titre sont null, on envoi une alerte.
                            alert.show('Il faut au moins un titre et du texte pour votre message!')
                        } else {
                        onSubmit(formData) //Si pas d'alerte, on utilise la fonction dubmit de la page.
                        }
                    }}>
                    <label htmlFor="title" className="post-form__label">
                        Titre:
                    </label>
                    <input type="text" name="title" className="post-form__input" onChange={(e) => {
                            setTitle(e.target.value) //On récupère le titre
                    }} />
                    <label htmlFor="textContent" className="post-form__label">
                        Texte:
                    </label>
                    <textarea type="text" name="textContent" className="post-form__input" placeholder="Quoi de neuf aujourd'huis?" onChange={(e) => {
                            setTextContent(e.target.value) //On recupère le textContent
                    }} />
                    <label htmlFor="mediaContent" className="post-form__label">
                        Image:
                    </label>
                    <input type="file" name="mediaContent" accept="image/png, image/jpeg, image/bmp, image/gif" className="post-form__input" onChange={event => {
                                const file = event.target.files[0];
                                setMediaContent(file) //On récupère les mediaContent
                    }}/>
                    <button type="submit" className="font-bold  py-2 px-4 w-1/2 bg-purple-400  text-white shadow-md">Envoyer</button>
                </form>
        </main>
        </>
    );
}
 
export default PostForm;