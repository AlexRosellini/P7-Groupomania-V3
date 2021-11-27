import Header from "../../components/header/header";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import useAuthStore from "../../stores/auth";

const Profile = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <>
      <Header/>
      <ProfileInfo />
    </>
  );
};

export default Profile;
