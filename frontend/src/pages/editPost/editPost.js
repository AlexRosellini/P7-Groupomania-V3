/*************************************************/
//On Importe ce dont on a besoin.

import EditPost from "../../components/posts/editPost";
import usePostStore from '../../stores/post';
import useAuthStore from '../../stores/auth'
import {useParams, useNavigate } from "react-router-dom";

/*************************************************/
//Notre page

const EditPostPage = () => {
  const { id } = useParams(); //On recupère l'id de l'URL
  const editPost = usePostStore(state => state.editPost); //On recupère les données du store.
  const token = useAuthStore(state => state.token); //On recupère les données du store.
  const navigate = useNavigate();//On set navigate.

  const handleSubmit = async (formData) => { //Notre fonction pour renvoyer le post éditer.
      await editPost(id, token, formData); //On appele la fonction édit du store.
      navigate('/')   //et On renvoie les utilisateurs vers / (nos posts)
  }

  return (
    <>
      <EditPost //En envoie ensuite les données vers le component.
      onSubmit = {handleSubmit} />
    </>
  );
};

export default EditPostPage;