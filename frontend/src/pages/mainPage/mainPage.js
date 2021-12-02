import Header from "../../components/header/header";
import useAuthStore from "../../stores/auth";

const MainPage = () => {
  const token = useAuthStore((state) => state.token);
  console.log(token)

  return (
    <>
      <Header/>
    </>
  );
};

export default MainPage;