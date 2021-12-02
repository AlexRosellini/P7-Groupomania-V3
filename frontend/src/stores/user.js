import create from "zustand";
import useAuthStore from "./auth";
import userService from "../services/user";


const useUserStore = create((set) => ({
  currentUser: null,
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
  updateUserDesc: async (userId, token, description) => {
      const response = await userService.updateUserDesc(userId, token, description);
  },
  updateUserPicture: async (userId, token, image) => {
    const response = await userService.updateUserPicture(userId, token, image);
    console.log(response)
  }
}));

export default useUserStore;
