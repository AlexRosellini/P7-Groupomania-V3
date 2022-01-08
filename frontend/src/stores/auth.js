import create from "zustand";
import authService from "../services/auth";
import jwt_decode from "jwt-decode";

const useAuthStore = create((set) => ({
  userId: null,
  token: null,
  error: null,
  errorInsc: null,
  message: null,
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
    console.log(result)

    if (result.error) {
      return set({ error: result.error });
    }
    const { token, userId } = result;
    localStorage.setItem("token", token);
    set({ token, userId });
  },
  register: async (userName, password, email) => {
    set({errorInsc: null})
    const result = await authService.register(userName, password, email); 
    if (result.error) {
      return set({ errorInsc: result.error });
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, userId: null });
  },
}));

export default useAuthStore;
