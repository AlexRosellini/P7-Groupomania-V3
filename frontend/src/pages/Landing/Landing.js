import React from "react";
import { Navigate, useLocation } from "react-router";
import Header from "../../components/header/header";
import Nav from "../../components/header/nav";
import useAuthStore from "../../stores/auth";
import LoginSignup from "../../components/identification/LoginSignup";



const Landing = () => {
    const token = useAuthStore(state => state.token);
    let location = useLocation();

    return (
      <>
     Landing page
      </>
     );
}
 
export default Landing;