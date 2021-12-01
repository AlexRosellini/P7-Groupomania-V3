const getUser = async (userId) => {
    const response = await fetch(`http://localhost:3000/api/user/${userId}`)
   if(!response.ok) {
       return null;
   }
   const result = await response.json()

   return result;
};

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

const updateUserPicture = async(userId, token, data) => {
  const response = fetch(`http://localhost:3000/api/user/${userId}`, {
    method: 'PUT',
    credentials: 'include',                
    headers: {
        'Authorization': `Bearer ${token}`,
      },
    body: {
       image: data
    }

})
  if (response.ok) {        
    const res = response.json();
    console.log(res)
  } else {
        console.log(response)
    }
}


export default {
  getUser, updateUserDesc, updateUserPicture
};
