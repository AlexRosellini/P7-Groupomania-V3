import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import useAuthStore from '../../stores/auth';
import Login from './login';
import Register from './register';

const LoginSignup = ({onRegister, onLogin}) => {
    const alert = useAlert();
    const error = useAuthStore(state => state.error);
    const errorInsc = useAuthStore(state => state.errorInsc)

    useEffect(() => {
        if(error) {
            alert.show(error)
        }
        if(errorInsc) {
            alert.show(errorInsc)
        }
    }, [error, errorInsc])

        return ( 
            <main className="min-h-screen h-full flex flex-col justify-center items-center bg-gray-400">
                <div className="border  bg-white mt-6 mb-6 rounded-2xl p-4 flex justify-center items-center h-auto ml-4 mr-4">
                    <div className="auth__top">
                        <h2>Pour commencer, veuillez vous inscrire ou vous connecter.</h2>
                        <Tabs>
                            <div className="">
                                <TabList className="flex justify-center items-center my-4">
                                    <Tab className="py-2 px-4 text-gray-500 border-b-8 cursor-pointer">Se connecter</Tab>
                                    <Tab className="py-2 px-4 text-gray-500 border-b-8 cursor-pointer">S'enregistrer</Tab>
                                </TabList>
                            </div>
                            <div className="">
                            <TabPanel>
                                <Login
                                onLogin={onLogin}
                                />
                             </TabPanel>
                            <TabPanel>
                                <Register
                                onRegister={onRegister}/>
                            </TabPanel>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </main>
     );
}
 
export default LoginSignup;