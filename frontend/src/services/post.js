const getAllPosts = async () => {
    const response = await fetch(`http://localhost:3000/api/posts/`)
   if(!response.ok) {
       return null;
   }
   const result = await response.json()

   return result;
};

export default {
    getAllPosts, 
};
