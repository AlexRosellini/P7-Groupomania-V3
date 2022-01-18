/*************************************************/
//On Importe ce dont on a besoin.

import PostList from "../../components/posts/postList";
import useAuthStore from "../../stores/auth";
import {useEffect} from 'react';
import Loader from '../../components/Loader/loader';
import usePostStore from '../../stores/post';

/*************************************************/
//Notre page

const MainPage = () => { 

  const postStateSelector = (state) => ({ //On utilisate postSateSelector pour récupèrer le store post.
    fetchPosts: state.fetchAllPosts,
    posts: state.posts,
    loading: state.loading,
  });

  const {fetchPosts, posts, loading} = usePostStore(postStateSelector); 

  useEffect( () => {
      if (loading === true) { //Si loading  true
          return (
          <Loader/> //On utilise le loader.
          )
      } 
     fetchPosts();   
  },[])

  const token = useAuthStore((state) => state.token); //On appel le token du AuthStore

  return (
    <>
      <PostList //On envoie les données vers le component
      posts = {posts}
      />
    </>
  );
};

export default MainPage;