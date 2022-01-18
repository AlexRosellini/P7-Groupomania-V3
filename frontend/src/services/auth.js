/*************************************************/
//On Importe ce dont on a besoin.

import jwt_decode from "jwt-decode";

/*************************************************/
//Service pour login

const login = async (userName, password) => {
  const response = await fetch("http://localhost:3000/api/auth/login", { //On fetch en methode post avec les données du component
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      userName,
      password,
    }),
  });
  const result = await response.json(); //On recupère le resultat

  if (result.token) { //Si le resultat à un token
    const decoded = await jwt_decode(result.token); //On le décode
    let { userId } = decoded; //On set la variable userId prise du token.
    return { userId, token: result.token }; //Et on return le userId et le Token
  }else {
    return result
  }
};

/*************************************************/
//Service pour register

const register = async (userName, email, password) => { 
  const response = await fetch('http://localhost:3000/api/auth/signup', { //On fetch en méthode POST avec les données du component.
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        userName,
        password,
        email
    })
})
  const result = await response.json(); //On récupère la réponse.
  return result
}

export default {
  login,
  register
};
