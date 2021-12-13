const getAllPosts = async () => {
    const response = await fetch(`http://localhost:3000/api/posts/`)
   if(!response.ok) {
       return null;
   }
   const result = await response.json()

   return result;
};

const PostPost = async (token, formData) => {
    const response = await fetch("http://localhost:3000/api/posts/create", {
      method: "POST",
      credentials: 'include',                
      headers: {
      'Authorization': `Bearer ${token}`,      
       },
      body: formData
    });
    const result = await response.json();
    console.log(result)
    return result
  };

export default {
    getAllPosts,  PostPost
};