import {useEffect} from 'react';
import CurrUserProfile from '../../components/Profile/CurrUserProfile';
import Loader from "../../components/Loader/loader";
import useAuthStore from '../../stores/auth';
import useUserStore from '../../stores/user';

const Profile = () => {
    const userStateSelector = (state) => ({
      data: state.currentUser,
      fetchCurrentUser: state.fetchCurrentUser,
      updateUserDesc: state.updateUserDesc,
      updateUserPicture: state.updateUserPicture,
      currentUserLoading: state.loading,
  });

  const {data, fetchCurrentUser, updateUserDesc, updateUserPicture, currentUserLoading} = useUserStore(userStateSelector);
    const token = useAuthStore(state => state.token);
    const userId = data?.id

  useEffect(() => {
      fetchCurrentUser();
  },[userId, fetchCurrentUser])

  if (currentUserLoading) return <Loader/>
  
  const handleDesc = (description) => {    
      try {
         updateUserDesc(userId, token, description)          
         window.location.reload();
      }
      catch (error) {
          console.log(error)
      }
  }

  const handlePic = (formData) => {
      try {    
          updateUserPicture( userId, token, formData)
          window.location.reload();
      }
      catch(error) {
          console.log(error)
      } 
  }
  return (
    <>
      <CurrUserProfile
      profile = {data}
      onDescChange= {handleDesc}  
      onPicChange={handlePic}
      />
    </>
  );
};

export default Profile;
