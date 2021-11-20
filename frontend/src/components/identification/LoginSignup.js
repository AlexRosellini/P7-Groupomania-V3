import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import jwt_decode from "jwt-decode";


const LoginSignup = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')

    const handleLogin = async() => {
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
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("token", res.token);
        })
    }
    const handleRegister = async() => {
        fetch('http://localhost:3000/api/auth/signup', {
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
    .then(response => response.text())
    .then(response => {
            setMessage(response)
        })
    }



    const testFunction = () => {
        let token = localStorage.getItem("token");
        let decoded = jwt_decode(token);
        let {userId} = decoded
        console.log(userId)
        let auth = {
            object: {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,  
                }
            }
        }
        fetch(`http://localhost:3000/api/auth/${userId}`, auth) 
        .then((response) => response.json())
        .then(response => console.log(response))
    }

    return ( 
        <>
            <div className="auth">
                <div className="auth__top">
                    <h2>Vous commencer, veuillez vous inscrire ou vous connecter.</h2>
                    <Tabs>
                        <div className="auth__tabs">
                            <TabList>
                                <Tab>Se connecter</Tab>
                                <Tab>S'enregistrer</Tab>
                            </TabList>
                        </div>
                        <div className="auth__panel">
                        <TabPanel>
                                <div className="auth__form-top">
                                    <h3>Se connecter</h3>
                                    <p>Merci de remplir les champs si dessous</p>
                                </div>
                                <div className="auth__form-bottom">
                                    <div className="Auth__form-field">
                                        <label htmlFor="userName">Nom de compte</label>
                                        <input type="text" 
                                        onChange={(e) => { 
                                            setUserName(e.target.value)}}/>
                                    </div>
                                    <div className="Auth__form-field">
                                        <label htmlFor="password">Mot de passe</label>
                                        <input type="password" 
                                        onChange={(e) => { 
                                            setPassword(e.target.value)}}/>
                                    </div>
                                    <button className="auth__form-btn" onClick={handleLogin}>Se connecter</button>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="auth__form-top">
                                    <h3>S'enregistrer</h3>
                                    <p>Merci de remplir les champs si dessous</p>
                                </div>
                                <div className="auth__form-bottom">
                                    <div className="Auth__form-field">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" 
                                        onChange={(e) => { 
                                            setEmail(e.target.value)}}/>
                                    </div>
                                    <div className="Auth__form-field">
                                        <label htmlFor="userName">Nom de compte</label>
                                        <input type="text" 
                                        onChange={(e) => { 
                                            setUserName(e.target.value)}}/>
                                    </div>
                                    <div className="Auth__form-field">
                                        <label htmlFor="password">Mot de passe</label>
                                        <input type="password" 
                                        onChange={(e) => { 
                                            setPassword(e.target.value)}}/>
                                    </div>
                                    <button className="auth__form-btn" onClick={handleRegister}>S'enregistrer</button>
                                    <p className="auth__form-msg"> {message} </p>
                                </div>
                            </TabPanel>
                        </div>
                    </Tabs>
                    <div className="btn">
                        <button onClick={testFunction}>Click</button>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default LoginSignup;