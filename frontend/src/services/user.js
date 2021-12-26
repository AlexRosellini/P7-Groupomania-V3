const getUser = async (userId) => {
    const response = await fetch(`http://localhost:3000/api/user/${userId}`)
   if(!response.ok) {
       return null;
   }
   const result = await response.json()

   return result;
};

const getAllUsers = async (token) => {
  const response = await fetch('http://localhost:3000/api/user/', {
    method: 'GET',
    credentials: 'include',                
    headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': 'application/json'
    },
  })
  if (!response.ok) {
    return null;
  }
  const result = await response.json()
  return result
}

const updateUserDesc = async(userId, token, description) => {
  const response = fetch(`http://localhost:3000/api/user/${userId}`, {
      method: 'PUT',
      credentials: 'include',                
      headers: {
          'Authorization': `Bearer ${token}`,
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          description
      })
  })
    if (response.ok) {        
      const res = response.json();
      console.log(res)
    } else {
          console.log(response)
      }
}

const updateUserRole = async(userId, token) => {
  const response = fetch(`http://localhost:3000/api/user/${userId}`, {
      method: 'PUT',
      credentials: 'include',                
      headers: {
          'Authorization': `Bearer ${token}`,
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          isAdmin: true
      })
  })
    if (response.ok) {        
      const res = response.json();
      console.log(res)
    } else {
          console.log(response)
    }
}

const updateUserPicture = async(userId, token, formData) => {
  const response = fetch(`http://localhost:3000/api/user/${userId}`, {
    method: 'PUT',
    credentials: 'include',                
    headers: {
        'Authorization': `Bearer ${token}`,
      },
    body: formData
})
  if (response.ok) {        
    const res = response.json();
    console.log(res)
  } else {
        console.log(response)
  }
}

const deleteUser = async(userId, token) => {
  const response = fetch(`http://localhost:3000/api/user/${userId}`, {
    method: 'DELETE',
    credentials: 'include',                
    headers: {
        'Authorization': `Bearer ${token}`,
      },
})
  if (response.ok) {        
    const res = response.json();
    console.log(res)
  } else {
        console.log(response)
  }
}

export default {
  getUser, getAllUsers, updateUserDesc, updateUserPicture, updateUserRole, deleteUser
};
