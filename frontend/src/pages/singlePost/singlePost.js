/*************************************************/
//On Importe ce dont on a besoin.

import React, {useEffect } from "react";
import Post from "../../components/posts/post";
import Loader from "../../components/Loader/loader";
import usePostStore from "../../stores/post";
import useAuthStore from "../../stores/auth";
import useUserStore from "../../stores/user"
import { useNavigate, useParams } from "react-router-dom";

/*************************************************/
//Notre page

const postStateSelector = (state) => ({ //On set un stateSelector pour recupérer les données du store.
  post: state.currentPost,
  fetchOnePost: state.getOnePost,
  deletePost: state.deletePost,
  sendComment: state.sendComment,
  deleteComment: state.deleteComment,
  loading: state.loading,
});

const SinglePost = () => {
  const { id } = useParams(); //On recupère l'id depuis params.
  const navigate = useNavigate(); //On set navigate pour renvoyer les utilisateurs.
  const data = useUserStore(state => state.currentUser); //On recupère data depuis userstore
  const fetchCurrentUser = useUserStore(state => state.fetchCurrentUser) //et le currentuser depuis userstore
  const token = useAuthStore((state) => state.token); //on recupère le token de auth.
  const userId = useAuthStore((state) => state.userId); //on recupère l'userId de auth.

  const { post, fetchOnePost, deletePost, sendComment, loading, deleteComment } =
    usePostStore(postStateSelector);

  useEffect(() => {
    if (userId && id) { //If both userId and Id are availiable
      fetchOnePost(id, userId); //we fetch the post
      fetchCurrentUser(); //as well as the currentUser 
    }
  }, [id, userId, fetchOnePost]);
 
  if (loading === true) {
   return <Loader />;
 }

  const handleSubmitComment = async (content) => { //Notre fonction pour envoyer commentaire.
    try {
      await sendComment(id, token, content); //On envoie le commentaire 
      await fetchOnePost(id, userId); //et on recupère le nouveau post.
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = () => { //Fonction pour delete le post.
    deletePost(id, token); //fonction pour delete le post depuis le store.
    navigate("/"); //On renvoie l'utilisateur vers /, (nos posts)
    window.location.reload()
  };

  const handleDeleteComment = (id) => { //Fonction pou delete comments
    deleteComment(id, token); //On delete comment depuis store
  }

  const handleShowUser = () => { //fonction qui renvoie vers l'utilisateur
    console.log("show user"); 
    navigate(`/profile/${post.user?.id}`); //on utilise navigate pour faire le renvoi.
  };

  return (
    <>
      <Post //On envoie les données vers le component.
        post={post}
        isOwner={post?.user?.id === userId}
        CurrentId={userId}
        isAdmin={data?.isAdmin}
        onComment={handleSubmitComment}
        onDeletePost={handleDeletePost}
        onDeleteComment = {handleDeleteComment}
        onShowUser={handleShowUser}
      />
    </>
  );
};

export default SinglePost;
