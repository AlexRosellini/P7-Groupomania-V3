/*************************************************/
//Service Get All Post

const getAllPosts = async () => {
    const response = await fetch(`http://localhost:3000/api/posts/`) //On fetch les posts avec methode GET
   if(!response.ok) { //Si la réponse n'est pas bonne
       return null; //On return null.
   }
   const result = await response.json()

   return result; //On return le result.
};

/*************************************************/
//Service getOnePost

const getOnePost = async (id) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`) //On fetch le post via son ID.
 if(!response.ok) { //Si la réponse n'est pas bonne
     return null; //On return null.
 }
 const result = await response.json()

 return result; //On return le result
};

/*************************************************/
//Service pour poster un post.

const PostPost = async (token, formData) => {
    const response = await fetch("http://localhost:3000/api/posts/create", { //On fetch avec méthode post
      method: "POST",
      credentials: 'include', //On include les crédentials (aka token)              
      headers: {
      'Authorization': `Bearer ${token}`, //Le dit token
       },
      body: formData
    });
    const result = await response.json(); //On return le resultat.
    return result
};

/*************************************************/
//Service pour editer un post.

const editPost = async (id, token, formData) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, { //On fetch avec méthode PUT.
    method: 'PUT',
    credentials: 'include', //On include credentials (token)
    headers: {
      'Authorization': `Bearer ${token}` //le dit token
    },
    body: formData
  })
  const result = await response.json(); //On return le resultat
  return result
}

/*************************************************/
//Service pour delete un post.

const deletePost = async (id, token) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, { //On fetch avec méthode DELETE
    method: "DELETE",
    credentials: 'include', //On include credentials (token)      
    headers: {
    'Authorization': `Bearer ${token}`, //le dit token
    'Content-Type': 'application/json' 
  },
  });
  const result = await response.json(); //On return le resultat
  return result;
}

/*************************************************/
//Service pour delete un commentaire

const deleteComment = async (id, token) => {
  const response = await fetch(`http://localhost:3000/api/comments/${id}`, { //On fetch avec méthode DELETE
    method: "DELETE",
    credentials: 'include', //On include credentials (token)
    headers: {
    'Authorization': `Bearer ${token}`, //le dit token
    'Content-Type': 'application/json'
  },
  });
  const result = await response.json(); //On return le resultat
  return result;  
}

/*************************************************/
//Service pour créer un commentaire

const PostComment = async (id, token, content) => {
  const response = await fetch(`http://localhost:3000/api/comments/${id}`, { //On fetch avec méthode POST
    method: "POST",
    credentials: 'include', //On include credentials (token)          
    headers: {
    'Authorization': `Bearer ${token}`, //le dit token
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content
  })      
  });
  const result = await response.json(); //On return le resultat
  return result
}

export default {
    getAllPosts,  PostPost, PostComment, getOnePost, editPost, deletePost, deleteComment
};