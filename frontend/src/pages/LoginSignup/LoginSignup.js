import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuthStore from "../../stores/auth";
import LoginSignup from "../../components/identification/LoginSignup";
import { useAlert } from "react-alert";

const Auth = () => {
    const authStateSelector = (state) => ({
        token: state.token,
        login: state.login,
        register: state.register,
    });

    const alert = useAlert();
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
        if (
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
        ) {
        register(userName, email, password);
        window.location.reload();  
        } else {
            alert.show('Votre mot de passe doit avoir au moins un chiffre, une majuscule et 8 caractères, votre email doit être valide')
        }
    }

    return ( 
        <LoginSignup
        onRegister={handleRegister}
        onLogin={handleLogin}
        />
        );
}
 
export default Auth;