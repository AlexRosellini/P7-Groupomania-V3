/*************************************************/
//On Importe ce dont on a besoin.

import {useState} from 'react';

/*************************************************/
//Notre component

const EditPost = ({onSubmit}) => { //On récupère de la page.
    const [title, setTitle] = useState(null); //On set le hook title
    const [textContent, setTextContent] = useState(null); //On set le hook textContent
    const [mediaContent, setMediaContent] = useState(null); //On set le hook mediaContent
    const formData = new FormData(); //On set le formData pour envoi sur API.

    return ( 
        <>
        <main className=" min-h-screen h-full flex flex-col  items-center bg-gray-400">
                <form  className="post-form__form border w-2/3" onSubmit={(event) => {
                    event.preventDefault(); //On empêche le reload par défaut.
                    if (title !== null) { //On vérifie si le titre est pas null 
                        formData.append('title', title) //et si oui on l'ajoute au formData
                    } 
                    if (textContent !== null) { //On vérifie si TextContent est pas null
                        formData.append('textContent', textContent); //et si oui, on l'ajoute au formData
                    }
                    if (mediaContent !== null) { //on vérifie si mediaContent est pas null
                      formData.append('image', mediaContent) //et si oui, on l'ajoute au formData
                    }
                    {onSubmit(formData)} //Ensuite on utilise notre fonction submit pour édition.
                }}>
                    <h1>Edition de votre poste</h1>
                    <label htmlFor="title" className="post-form__label">
                        Titre:
                    </label>
                    <input type="text" name="title" className="post-form__input" onChange={(e) => {
                            setTitle(e.target.value) //On récupère dans le hook, le nouveau titre.
                    }} />
                    <label htmlFor="textContent" className="post-form__label">
                        Texte:
                    </label>
                    <textarea type="text" name="textContent" className="post-form__input" placeholder="Quoi de neuf aujourd'huis?" onChange={(e) => {
                            setTextContent(e.target.value) //On récupère dans le hook le nouveau textContent
                    }} />
                    <label htmlFor="mediaContent" className="post-form__label">
                        Image:
                    </label>
                    <input type="file" name="mediaContent" accept="image/png, image/jpeg, image/bmp, image/gif" className="pb-6" onChange={event => {
                                const file = event.target.files[0]; //On récupère les fichiers
                                setMediaContent(file) //et on le met dans le hook mediaContent
                    }}/>
                    <button type="submit" className="font-bold  py-2 px-4 w-1/2 bg-purple-400  text-white shadow-md">Envoyer</button>
                </form>
        </main>
        </>    
 );
}
 
export default EditPost;