import create from "zustand";
import postService from "../services/post";
import userService from "../services/user";

const usePostStore = create((set) => ({
    currentPost: [],
    posts: [],
    loading: false,
    fetchAllPosts: async () => {
        set({ loading: true })
        const posts = await postService.getAllPosts();
        set({posts, loading: false });
        console.log(posts)
    },
    getOnePost: async (id, userId) => {
        set({ loading: true})
        const currentPost = await postService.getOnePost(id);
        set({currentPost, loading: false});
        console.log(currentPost)
    },
    sendPost: async (token, formData) => {
        set({ loading: true})
        const result = await postService.PostPost(token, formData);
        set({loading: false})
        console.log(result)
    },
    editPost: async (id, token, formData) => {
        set({ loading: true})
        const result = await postService.editPost(id, token, formData);
        set({loading: false})
        console.log(result)
    } ,
    deletePost: async (id, token) => {
        set({ loading: true})
        const result = await postService.deletePost(id, token);
        set({loading: false})
        console.log(result)
    },
    sendComment: async (id, token, content) => {
        set({ loading: true})
        const result = await postService.PostComment(id, token, content);
        set({loading: false})
        console.log(result)
    },
    deleteComment: async (id, token) => {
        set({ loading: true})
        const result = await postService.deleteComment(id, token);
        set({loading: false})
        console.log(result)
    },
}));
  
  export default usePostStore;
  