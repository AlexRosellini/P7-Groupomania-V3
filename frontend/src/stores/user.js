import create from "zustand";
import useAuthStore from "./auth";
import userService from "../services/user";


const useUserStore = create((set) => ({
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
    const user = await userService.getUser(userId);
    set({ user, loading: false });
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
