import jwt_decode from "jwt-decode";

const login = async (userName, password) => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName,
      password,
    }),
  });
  const result = await response.json();

  if (result.token) {
    const decoded = await jwt_decode(result.token);
    let { userId } = decoded;
    return { userId, token: result.token };
  }else {
    return result
  }
};

const register = async (userName, email, password) => {
  const response = await fetch('http://localhost:3000/api/auth/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        userName,
        password,
        email
    })
})
  const result = await response.json();
  console.log(result)
}

export default {
  login,
  register
};
