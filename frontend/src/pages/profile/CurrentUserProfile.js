import ProfileInfo from "../../components/Profile/ProfileInfo";
import useAuthStore from "../../stores/auth";

const Profile = () => {
  const userId = useAuthStore((state) => state.userId);
  if(!userId) {
    return <>loading ...</>
  }
  return (
    <>
      <ProfileInfo userId={userId}/>
    </>
  );
};

export default Profile;
