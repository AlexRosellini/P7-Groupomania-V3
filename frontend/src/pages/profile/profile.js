import Header from "../../components/header/header";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import Nav from "../../components/header/nav"
import useAuthStore from "../../stores/auth";

const Profile = () => {
  const token = useAuthStore((state) => state.token);
  console.log(token)

  return (
    <>
      <Header/>
      <Nav/>
      <ProfileInfo />
    </>
  );
};

export default Profile;
