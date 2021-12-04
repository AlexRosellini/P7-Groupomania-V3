import ProfileInfo from "../../components/Profile/ProfileInfo";
import { useParams } from "react-router";

const Profile = () => {
  const {userId} = useParams()
  if(!userId) {
    return <>loading ...</>
  }
  return (
      <ProfileInfo userId={userId} />
  );
};

export default Profile;
