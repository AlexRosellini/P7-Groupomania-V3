import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import useAuthStore from '../../stores/auth';


const LoginSignup = () => {
    const alert = useAlert();
    const login = useAuthStore(state => state.login);
    const register = useAuthStore(state => state.register);
    const error = useAuthStore(state => state.error);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        if(error) {
            alert.show(error)
        }
    }, [error])

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
                                        <button className="bg-blue-400 py-2 px-6 rounded text-white shadow hover:bg-blue-500" onClick={handleRegister}>test</button>
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