import create from "zustand";
import authService from "../services/auth";
import jwt_decode from "jwt-decode";

const useAuthStore = create((set) => ({
  userId: null,
  token: null,
  error: null,
  retrieveTokenUserId: async () => {
    const existingToken = localStorage.getItem("token");
    if (existingToken) {
      let decoded = jwt_decode(existingToken);
      let { userId } = decoded;
      set({ userId: userId });
      set({ token: existingToken });
    }
  },
  login: async (userName, password) => {
    set({error: null})
    const result = await authService.login(userName, password);

    if (result.error) {
      return set({ error: result.error });
    }

    const { token, userId } = result;
    localStorage.setItem("token", token);
    set({ token, userId });
  },
  register: async (userName, password, email) => {
    const response = await authService.register(userName, password, email);
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, userId: null });
  },
}));

export default useAuthStore;
