import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuthStore from "../../stores/auth";
import LoginSignup from "../../components/identification/LoginSignup";

const Auth = () => {
    const authStateSelector = (state) => ({
        token: state.token,
        login: state.login,
        register: state.register,
      });

    const {token, login, register} = useAuthStore(authStateSelector);
    let location = useLocation();
  
    let fallback = location.state?.from?.pathname || "/posts";
    
    if(token) {
        return <Navigate to={fallback} state={{ from: location }}/>
    }

    const handleLogin = async(userName, password) => {
        login(userName, password);
    }

    const handleRegister = async(userName, email, password) => {
        register(userName, email, password)
    }

    return ( 
        <LoginSignup
        onRegister={handleRegister}
        onLogin={handleLogin}
        />
        );
}
 
export default Auth;