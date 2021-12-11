import create from "zustand";
import postService from "../services/post";
import userService from "../services/user";

const usePostStore = create((set) => ({
    currentPost: null,
    posts: [],
    loading: false,
    fetchAllPosts: async () => {
        set({ loading: true })
        const posts = await postService.getAllPosts();
        set({posts, loading: false });
        console.log(posts)
    },
}));
  
  export default usePostStore;
  