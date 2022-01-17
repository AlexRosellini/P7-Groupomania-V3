import create from "zustand";
import useAuthStore from "./auth";
import userService from "../services/user";


const useUserStore = create((set) => ({
  User: null,
  loading: false,
  currentUser: null,
  fetchCurrentUser: async () => {
    const currentUserId = useAuthStore.getState().userId
        set({ loading: true })
        const currentUser = await userService.getUser(currentUserId);
        set({ currentUser, loading: false });
        console.log(currentUser)
  },
  fetchUser: async (userId) => {
    set({ loading: true })
    const user = await userService.getUser(userId);
    set({ user, loading: false });
  },
  fetchAllUsers: async (token) => {
    set({ loading: true })
    const allUsers = await userService.getAllUsers(token);
    set({ allUsers, loading: false });
  },
  updateUserDesc: async (userId, token, description) => {
    await userService.updateUserDesc(userId, token, description);
  },
  updateUserRole: async (userId, token, description) => {
    await userService.updateUserRole(userId, token);
},
  deleteUser: async (userId, token) => {
    set({ loading: true })
    await userService.deleteUser(userId, token);
    const allUsers = await userService.getAllUsers();
    set({ allUsers, loading: false });    
  },
  updateUserPicture: async (userId, token, formData) => {
    const response = await userService.updateUserPicture(userId, token, formData);
    console.log(response)
  },
}));

export default useUserStore;
