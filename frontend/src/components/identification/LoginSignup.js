import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import useAuthStore from '../../stores/auth';


const LoginSignup = () => {
    const login = useAuthStore(state => state.login);
    const register = useAuthStore(state => state.register);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')

    const handleLogin = async() => {
        login(userName, password);
    }

    const handleRegister = async() => {
        register(userName, email, password)
    }

        return ( 
        <>
            <div className="auth">
                <div className="auth__form">
                    <div className="auth__top">
                        <h2>Pour commencer, veuillez vous inscrire ou vous connecter.</h2>
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
                                        <div className="auth__form-form">
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
                                        <div className="auth__form-form">
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
                                        </div>
                                        <button className="auth__form-btn" onClick={handleRegister}>S'enregistrer</button>
                                    </div>
                                    <div className="message">
                                        <p> {message} </p>
                                    </div>
                                </TabPanel>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default LoginSignup;