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
    sendPost: async (token, formData) => {
        set({ loading: true})
        const result = await postService.PostPost(token, formData);
        set({loading: false})
        console.log(result)
    }
}));
  
  export default usePostStore;
  