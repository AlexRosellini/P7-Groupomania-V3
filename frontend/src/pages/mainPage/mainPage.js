import Header from "../../components/header/header";
import Nav from "../../components/header/nav";
import useAuthStore from "../../stores/auth";

const MainPage = () => {
  const token = useAuthStore((state) => state.token);
  console.log(token)

  return (
    <>
      Posts list
    </>
  );
};

export default MainPage;