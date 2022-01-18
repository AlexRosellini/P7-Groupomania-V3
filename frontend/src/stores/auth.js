/*************************************************/
//On import ce dont on à besoin

import create from "zustand";
import authService from "../services/auth";
import jwt_decode from "jwt-decode";


/*************************************************/
//Notre store

const useAuthStore = create((set) => ({
  userId: null, //nos valeur à conserver - userId
  token: null, //nos valeur à conserver - token de l'utilisateur
  error: null, //nos valeur à conserver - Erreur login
  errorInsc: null, //nos valeur à conserver - Erreur Inscription
  message: null, //nos valeur à conserver - Message

  retrieveTokenUserId: async () => {
    const existingToken = localStorage.getItem("token"); //On get le token depuis localstorage
    if (existingToken) {
      let decoded = jwt_decode(existingToken); //Si il y a un token, on décode le token
      let { userId } = decoded; //et on récupère l'userId
      set({ userId: userId }); //On set ensuite l'userId 
      set({ token: existingToken }); //Ainsi que le token
    }
  },

  login: async (userName, password) => {
    set({error: null}) //On set les deux erreur comme null.
    set({errorInsc: null})
    const result = await authService.login(userName, password); //On appelle ensuite le service pour Login 

    if (result.error) { //Si le resultat à une érreur
      return set({ error: result.error }); //On set l'érreur
    }
    const { token, userId } = result; //On recupère le token et l'userId du résultat
    localStorage.setItem("token", token); //On met le token sur localstorage
    set({ token, userId }); //Et on set les deux dans le store.
  },

  register: async (userName, password, email) => {
    set({error: null}) //On set les deux erreur comme null.
    set({errorInsc: null})
    const result = await authService.register(userName, password, email); //On appelle ensuite le service pour inscription
    if (result.error) { //Si il y a une érreur
      return set({ errorInsc: result.error }); //On set l'érreur
    } else {
      window.location.reload(); //Sinon on reload la page.
    }
  },

  logout: () => {
    localStorage.removeItem("token"); //On remove le token
    set({ token: null, userId: null }); //Et on set comme null, le token et l'userId
  },
}));

export default useAuthStore;