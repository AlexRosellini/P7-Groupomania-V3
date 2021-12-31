import React, {useEffect } from "react";
import Post from "../../components/posts/post";
import Loader from "../../components/Loader/loader";
import usePostStore from "../../stores/post";
import useAuthStore from "../../stores/auth";
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
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);
  const { post, fetchOnePost, deletePost, sendComment, loading, deleteComment } =
    usePostStore(postStateSelector);

  useEffect(() => {
    if (userId && id) {
      fetchOnePost(id, userId);
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
        onComment={handleSubmitComment}
        onDeletePost={handleDeletePost}
        onDeleteComment = {handleDeleteComment}
        onShowUser={handleShowUser}
      />
    </>
  );
};

export default SinglePost;
