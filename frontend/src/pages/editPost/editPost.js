import EditPost from "../../components/posts/editPost";
import usePostStore from '../../stores/post';
import useAuthStore from '../../stores/auth'
import {useParams, useNavigate } from "react-router-dom";

const EditPostPage = () => {
  const { id } = useParams();
  const editPost = usePostStore(state => state.editPost);
  const token = useAuthStore(state => state.token);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
      await editPost(id, token, formData);
      navigate('/')  
  }

  return (
    <>
      <EditPost
      onSubmit = {handleSubmit} />
    </>
  );
};

export default EditPostPage;