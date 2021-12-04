import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuthStore from "../../stores/auth";
import LoginSignup from "../../components/identification/LoginSignup";



const LoginSignupPage = () => {
    let token = useAuthStore(state => state.token);
    let location = useLocation();
  
    let fallback = location.state?.from?.pathname || "/posts";
    
    if(token) {
        return <Navigate to={fallback} state={{ from: location }}/>
    }

    return (
      <LoginSignup/>
     );
}
 
export default LoginSignupPage;