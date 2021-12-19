const getAllPosts = async () => {
    const response = await fetch(`http://localhost:3000/api/posts/`)
   if(!response.ok) {
       return null;
   }
   const result = await response.json()

   return result;
};

const getOnePost = async (id) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`)
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

const editPost = async (id, token, formData) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
  const result = await response.json();
  console.log(result);
  return result
}

const deletePost = async (id, token) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: "DELETE",
    credentials: 'include',                
    headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  });
  const result = await response.json();
  console.log(result)
  return result;
}

const deleteComment = async (id, token) => {
  const response = await fetch(`http://localhost:3000/api/comments/${id}`, {
    method: "DELETE",
    credentials: 'include',                
    headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  });
  const result = await response.json();
  console.log(result)
  return result;  
}

const PostComment = async (id, token, content) => {
  const response = await fetch(`http://localhost:3000/api/comments/${id}`, {
    method: "POST",
    credentials: 'include',                
    headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content
  })      
  });
  const result = await response.json();
  console.log(result)
  return result
}

export default {
    getAllPosts,  PostPost, PostComment, getOnePost, editPost, deletePost, deleteComment
};