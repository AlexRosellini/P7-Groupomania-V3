import create from "zustand";
import useAuthStore from "./auth";
import userService from "../services/user";


const useUserStore = create((set) => ({
  currentUser: null,
  User: null,
  loading: false,
  fetchCurrentUser: async () => {
    const currentUserId = useAuthStore.getState().userId
    if(currentUserId) {
        set({ loading: true })
        const currentUser = await userService.getUser(currentUserId);
        set({ currentUser, loading: false });
        console.log(currentUser)
    }
  },

  fetchUser: async (userId) => {
    set({ loading: true })
    const User = await userService.getUser(userId);
    set({ User, loading: false });
    console.log(User)
  },

  updateUserDesc: async (userId, token, description) => {
      const response = await userService.updateUserDesc(userId, token, description);
  },

  updateUserPicture: async (userId, token, formData) => {
    const response = await userService.updateUserPicture(userId, token, formData);
    console.log(response)
  }
}));

export default useUserStore;
