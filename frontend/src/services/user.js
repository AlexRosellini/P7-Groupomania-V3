/*************************************************/
//Service pour get un user

const getUser = async (userId) => {
    const response = await fetch(`http://localhost:3000/api/user/${userId}`) //On fetch avec méthode GET
   if(!response.ok) {
       return null; //Si la réponse n'est pas ok, on return null.
   }
   const result = await response.json() //Sinon on return le résultat.

   return result;
};

/*************************************************/
//Service pour créer un commentaire

const getAllUsers = async (token) => {
  const response = await fetch('http://localhost:3000/api/user/', { //On fetch avec méthode GET
    method: 'GET',
    credentials: 'include', //On include credentials (token)               
    headers: {
        'Authorization': `Bearer ${token}`, //Le dit token
        'content-type': 'application/json'
    },
  })
  if (!response.ok) {
    return null; //Si la réponse est mauvaise, on return null.
  }
  const result = await response.json() //Sinon on return le résultat.
  return result
}

/*************************************************/
//Service pour update description

const updateUserDesc = async(userId, token, description) => {
  const response = fetch(`http://localhost:3000/api/user/${userId}`, { //On fetch avec la méthode PUT
      method: 'PUT',
      credentials: 'include', //On include credentials (token)         
      headers: {
          'Authorization': `Bearer ${token}`, //le dit token
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          description
      })
  })
    if (response.ok) {   //Si la réponse est ok
      const res = response.json(); //On return la response.
      return res
    } else {
          console.log(response) //Sinon on log la réponse.
      }
}

/*************************************************/
//Service pour update le rôle d'un utilisateur

const updateUserRole = async(userId, token) => {
  const response = fetch(`http://localhost:3000/api/user/admin/${userId}`, { //On fetch avec méthode PUT.
      method: 'PUT',
      credentials: 'include', //On include les credentials (token)
      headers: {
          'Authorization': `Bearer ${token}`, //le dit token
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          isAdmin: true //On change le status de l'admin vers true.
      })
  })
    if (response.ok) { //Si la réponse est ok
      const res = response.json(); //On return la réponse
      return res
    } else {
          console.log(response) //Sinon on log la réponse.
    }
}

/*************************************************/
//Service pour update la photo de l'utilisateur

const updateUserPicture = async(userId, token, formData) => {
  const response = fetch(`http://localhost:3000/api/user/${userId}`, { //On fetch avec méthode PUT
    method: 'PUT',
    credentials: 'include', //On include les credentials (token)               
    headers: {
        'Authorization': `Bearer ${token}`, //Le dit token.
      },
    body: formData
})
  if (response.ok) {  //Si la réponse est ok
    const res = response.json(); //On return le resultat.
    return res
  } else {
        console.log(response) //Sinon, on log le resultat.
  }
}

/*************************************************/
//Service pour update le rôle d'un utilisateur

const deleteUser = async(userId, token) => {
  const response = fetch(`http://localhost:3000/api/user/${userId}`, { //On fetch avec méthode DELETE
    method: 'DELETE',
    credentials: 'include', //On include credentials (token)
    headers: {
        'Authorization': `Bearer ${token}`, //le dit token
      },
})
  if (response.ok) { //Si la réponse est ok  
    const res = response.json(); //on return la réponse.
    return res
  } else {
    console.log(response) //Sinon on log la réponse.
  }
}

export default {
  getUser, getAllUsers, updateUserDesc, updateUserPicture, updateUserRole, deleteUser
};
