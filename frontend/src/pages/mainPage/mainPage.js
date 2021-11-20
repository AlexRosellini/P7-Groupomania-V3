import Header from "../../components/header/header";
import React, {useState} from 'react'


const MainPage = () => {
    const [name, setName] = useState('')
    const handleClick = async() => {
        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                password,
            })
        })
        .then(response => response.text())
        .then(response => {
            sessionStorage.setItem(response)
        })
    }
     
    return ( 
        <>
        <Header/>
        <h2>Welcome on the main page!</h2>
        </>
     );
}
 
export default MainPage;