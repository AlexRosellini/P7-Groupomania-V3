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
        error: state.error
    });

    const alert = useAlert();
    const {token, login, register, error} = useAuthStore(authStateSelector);
    let location = useLocation();
  
    let fallback = location.state?.from?.pathname || "/posts";
    
    if(token) {
        return <Navigate to={fallback} state={{ from: location }}/>
    }

    const handleLogin = async(userName, password) => {
        login(userName, password);
    }

    const handleRegister = async(userName, email, password) => {
        console.log(userName, email, password)
        console.log(userName === undefined)
        console.log(userName === null)     
        console.log(userName !== '')   
        if (
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
        ) {
            console.log(userName !== '')
            register(userName, email, password);
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