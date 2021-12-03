import React from "react";
import { Navigate, useLocation } from "react-router";
import Header from "../../components/header/header";
import useAuthStore from "../../stores/auth";
import LoginSignup from "../../components/identification/LoginSignup";



const Landing = () => {
    const token = useAuthStore(state => state.token);
    let location = useLocation();

    if(token) {
      return <Navigate to="/posts" state={{ from: location }} />;
    }

    return (
      <>
      <Header/>
      <LoginSignup/>
      </>
     );
}
 
export default Landing;