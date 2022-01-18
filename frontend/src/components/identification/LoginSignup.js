/*************************************************/
//On Importe ce dont on a besoin.

import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import useAuthStore from '../../stores/auth';
import Login from './login';
import Register from './register';

/*************************************************/
//Notre component

const LoginSignup = ({onRegister, onLogin}) => { //On récupère de la page.
    const alert = useAlert(); //On prépare l'utilisation de nos alertes
    const error = useAuthStore(state => state.error); //et on récupère de notre store les erreurs générales
    const errorInsc = useAuthStore(state => state.errorInsc) //ainsi que les érreurs d'inscriptions

    useEffect(() => {
        if(error) { //Si erreur 
            alert.show(error) //On lance une alerte
        }

        if(errorInsc) { //Si erreur Inscription
            alert.show(errorInsc) //On lance une alerte
        }
    }, [error, errorInsc]) //Si une érreur, on re-render la page.

        return ( 
            <main className="min-h-screen h-full flex flex-col justify-center items-center bg-gray-400">
                <div className="border  bg-white mt-6 mb-6 rounded-2xl p-4 flex justify-center items-center h-auto ml-4 mr-4">
                    <div className="auth__top">
                        <h2>Pour commencer, veuillez vous inscrire ou vous connecter.</h2>
                        <Tabs> {/*système de tabs.*/}
                            <div className="">
                                <TabList className="flex justify-center items-center my-4">
                                    <Tab className="py-2 px-4 text-gray-500 border-b-8 cursor-pointer">Se connecter</Tab>
                                    <Tab className="py-2 px-4 text-gray-500 border-b-8 cursor-pointer">S'enregistrer</Tab>
                                </TabList>
                            </div>
                            <div className="">
                            <TabPanel>
                                <Login
                                onLogin={onLogin }/*On appelle la fonction login*/
                                />
                             </TabPanel>
                            <TabPanel>
                                <Register
                                onRegister={onRegister}/*On appel la fonction register*//> 
                            </TabPanel>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </main>
     );
}
 
export default LoginSignup;