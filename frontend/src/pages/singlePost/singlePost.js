import React, {useEffect } from "react";
import Post from "../../components/posts/post";
import Loader from "../../components/Loader/loader";
import usePostStore from "../../stores/post";
import useAuthStore from "../../stores/auth";
import useUserStore from "../../stores/user"
import { useNavigate, useParams } from "react-router-dom";

const postStateSelector = (state) => ({
  post: state.currentPost,
  fetchOnePost: state.getOnePost,
  deletePost: state.deletePost,
  sendComment: state.sendComment,
  deleteComment: state.deleteComment,
  loading: state.loading,
});

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useUserStore(state => state.currentUser);
  const fetchCurrentUser = useUserStore(state => state.fetchCurrentUser)
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);
  const { post, fetchOnePost, deletePost, sendComment, loading, deleteComment } =
    usePostStore(postStateSelector);

  useEffect(() => {
    if (userId && id) {
      fetchOnePost(id, userId);
      fetchCurrentUser();
      console.log(data?.isAdmin)
    }
  }, [id, userId, fetchOnePost]);
 
  if (loading === true) {
   return <Loader />;
 }

  const handleSubmitComment = async (content) => {
    try {
      console.log(content);
      console.log(id);
      await sendComment(id, token, content);
      await fetchOnePost(id, userId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = () => {
    deletePost(id, token);
    navigate("/");
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId, token);
    window.location.reload();
  }

  const handleShowUser = () => {
    console.log("show user");
    navigate(`/profile/${post.user?.id}`);
  };

  return (
    <>
      <Post
        post={post}
        isOwner={post.user?.id === userId}
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
