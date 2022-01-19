/*************************************************/
//On Importe ce dont on a besoin.

import PostForm from "../../components/posts/postForm";
import useAuthStore from '../../stores/auth';
import useUserStore from '../../stores/user';
import usePostStore from '../../stores/post';
import { useNavigate} from "react-router-dom";

/*************************************************/
//Notre page

const CreatePost = () => {

    const data = useUserStore(state => state.currentUser);   //On récupère les données de nos stores
    const sendPost = usePostStore(state => state.sendPost); //On récupère les données de nos stores
    const token = useAuthStore(state => state.token); //On récupère les données de nos stores
    const navigate = useNavigate(); //On set Navigate pour les redirections.

    const handleSubmit = async (formData) => { //Notre fonction qui créer le post.
        try {            
            await sendPost(token,formData)  //On utilise sendPost du store.
            navigate('/') //Et on renvoie les utilisateurs vers /.
        }
        catch(e) {
            console.log(e) //Si erreur, on log l'érreur.
        }
    }

    return ( 
        <>
        <PostForm //En envoie ensuite les données vers le component.
        data = {data} 
        onSubmit = {handleSubmit}/>
        </>
     );
}
 
export default CreatePost;