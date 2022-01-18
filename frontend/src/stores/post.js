/*************************************************/
//On import ce dont on à besoin


import create from "zustand";
import postService from "../services/post";

/*************************************************/
//Notre store post


const usePostStore = create((set) => ({
    currentPost: [], //nos valeurs à conserver - le post 
    posts: [], //nos valeurs à conserver - liste de posts.
    loading: false, //Nos valeurs à conserver, si loading ou pas.

    fetchAllPosts: async () => { 
        set({ loading: true }) //On set loading comme true
        const posts = await postService.getAllPosts(); //On appel le service pour get all posts
        set({posts, loading: false }); //On set loading comme false
    },
    getOnePost: async (id, userId) => {
        set({ loading: true}) //On set loading comme true
        const currentPost = await postService.getOnePost(id); //On appel le service pour get un post.
        set({currentPost, loading: false}); //On set loading comme false
    },
    sendPost: async (token, formData) => {
        set({ loading: true}) //On set loading comme true
        const result = await postService.PostPost(token, formData); //On appel le service pour poster un post.
        set({loading: false}) //On set loading comme false
    },
    editPost: async (id, token, formData) => {
        set({ loading: true}) //On set loading comme true
        const result = await postService.editPost(id, token, formData); //On appel le service pour editer un post.
        set({loading: false}) //On set loading comme false
    } ,
    deletePost: async (id, token) => {
        set({ loading: true}) //On set loading comme true
        const result = await postService.deletePost(id, token); //On appel le service pour delete un post.
        set({loading: false}) //On set loading comme false
    },
    sendComment: async (id, token, content) => {
        set({ loading: true}) //On set loading comme true
        const result = await postService.PostComment(id, token, content); //On appel le service pour poster un commentaire.
        set({loading: false}) //On set loading comme false
    },
    deleteComment: async (id, token) => {
        set({ loading: true}) //On set loading comme true
        const result = await postService.deleteComment(id, token); //On appel le service pour delete un commentaire.
        set({loading: false}) //On set loading comme false
    },
}));
  
  export default usePostStore;
  