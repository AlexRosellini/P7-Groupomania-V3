import PostList from "../../components/posts/postList";
import useAuthStore from "../../stores/auth";
import {useEffect} from 'react';
import Loader from '../../components/Loader/loader';
import usePostStore from '../../stores/post';

const MainPage = () => {
  const postStateSelector = (state) => ({
    fetchPosts: state.fetchAllPosts,
    posts: state.posts,
    loading: state.loading,
});

const {fetchPosts, posts, loading} = usePostStore(postStateSelector);

  useEffect( () => {
      if (loading === true) {
          return (
          <Loader/>
          )
      } 
     fetchPosts();   
  },[])

  const token = useAuthStore((state) => state.token);
  console.log(token)

  return (
    <>
      <PostList
      posts = {posts}
      />
    </>
  );
};

export default MainPage;