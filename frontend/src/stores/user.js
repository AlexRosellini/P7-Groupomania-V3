/*************************************************/
//On import ce dont on à besoin

import create from "zustand";
import useAuthStore from "./auth";
import userService from "../services/user";

/*************************************************/
//Notre store user.

const useUserStore = create((set) => ({

  User: null, //nos valeurs à conserver - User
  loading: false, // nos valeurs à conserver - Loading
  currentUser: null, // nos valeurs à conserver - CurrentUser

  fetchCurrentUser: async () => {
    const currentUserId = useAuthStore.getState().userId 
        set({ loading: true }) //On set loading comme true
        const currentUser = await userService.getUser(currentUserId); //On appel le service to get le currentuser.
        set({ currentUser, loading: false }); //On set loading comme false
        console.log(currentUser)
  },

  fetchUser: async (userId) => {
    set({ loading: true }) //On set loading comme true
    const user = await userService.getUser(userId); //On appel le service pour get un user
    set({ user, loading: false }); //On set loading comme false
  },

  fetchAllUsers: async (token) => {
    set({ loading: true }) //On set loading comme true
    const allUsers = await userService.getAllUsers(token); //On appel le service pour get all users.
    set({ allUsers, loading: false }); //On set loading comme false
  },

  updateUserDesc: async (userId, token, description) => {
    await userService.updateUserDesc(userId, token, description); //On appel le service pour update la description.
  },

  updateUserRole: async (userId, token) => {
    await userService.updateUserRole(userId, token); //On appel le service pour update le rôle d'un utilisateur
  },

  deleteUser: async (userId, token) => {
    set({ loading: true }) //On set loading comme true
    await userService.deleteUser(userId, token); //On appel le service pour delete un User.
    const allUsers = await userService.getAllUsers(); //On appel ensuite le service pour get AllUsers
    set({ allUsers, loading: false }); //On set la nouvelle liste d'utilisateur, et on met loading en false.    
  },

  updateUserPicture: async (userId, token, formData) => {
    const response = await userService.updateUserPicture(userId, token, formData); //On appel le service pour update un photo d'utilisateur.
  },
}));

export default useUserStore;
