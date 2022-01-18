/*************************************************/
//On Importe ce dont on a besoin.

import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuthStore from "../../stores/auth";
import LoginSignup from "../../components/identification/LoginSignup";
import { useAlert } from "react-alert";

/*************************************************/
//Notre page.

const Auth = () => { 
    const authStateSelector = (state) => ({ //Pour simplicité, on utilise un state selector pour le authstore.
        token: state.token, //On recupère token
        login: state.login, //On recupère le login
        register: state.register, //On recupère register
        error: state.error //on recupère l'erreur
    });

    const alert = useAlert(); //On set l'alerte.
    const {token, login, register, error} = useAuthStore(authStateSelector); 
    let location = useLocation(); //On set la location.
  
    let fallback = location.state?.from?.pathname || "/posts"; //On set le fallback
    
    if(token) { 
        return <Navigate to={fallback} state={{ from: location }}/> //Si fallback, on renvoi vers fallback
    }

    const handleLogin = async(userName, password) => { //On gêre le login.
        login(userName, password); //On utilise la fonction du store login
    }

    const handleRegister = async(userName, email, password) => { //On gêre l'inscription 
        if ( //On test nos regex.
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
        ) {
            register(userName, email, password); //si les regex sont bon, on utilise la fonction register.
        } else {
            alert.show('Votre mot de passe doit avoir au moins un chiffre, une majuscule et 8 caractères, votre email doit être valide') //On utilise une alerte si les regex ne sont pas bon.
        }
    }

    return ( 
        <LoginSignup //En envoie ensuite les données vers le component.
        onRegister={handleRegister}
        onLogin={handleLogin}
        />
        );
}
 
export default Auth;