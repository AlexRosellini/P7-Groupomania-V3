/*************************************************/
//On import ce dont on à besoin

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate, useLocation } from "react-router";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-mui';
import useAuthStore from "./stores/auth";
import Layout from "./components/Layout";
import CurrentUserProfile from "./pages/profile/CurrentUserProfile";
import Profile from "./pages/profile/profile";
import MainPage from "./pages/mainPage/mainPage";
import CreatePost from "./pages/createPost/createPost";
import LoginSignupPage from "./pages/LoginSignup/LoginSignup";
import SinglePost from "./pages/singlePost/singlePost";
import EditPostPage from "./pages/editPost/editPost";
import AdminBoard from "./pages/Admin/AdminBoard"

/*************************************************/
//Configuration d'alertes.

// optional configuration
const alertOptions = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

/*************************************************/
//On set nos routes sécurisées.


const RequireAuth = ({ children }) => {  //Notre "Require Auth" qui sécurise nos routes
  const token = useAuthStore((state) => state.token);  //On a besoin du token
  let location = useLocation(); //et de la location.

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />; //On renvoie vers notre page de login si le token n'est pas présent.
  }

  return children;
};

/*************************************************/
//Notre application


function App() {
  const retrieveToken = useAuthStore((state) => state.retrieveTokenUserId); //fonction pour recupérer le token depuis le store

  useEffect(() => {
    retrieveToken(); //et on appelle la fonction pour le token.
  }, []);

  return (
    <>
      <AlertProvider template={AlertTemplate} {...alertOptions} /*Template d'alertes*/> 
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/login" element={<LoginSignupPage />} />
              <Route
                path="/"
                exact
                element={
                  <RequireAuth>
                    <MainPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/MyProfile"
                exact
                element={
                  <RequireAuth>
                    <CurrentUserProfile />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile/:id"
                exact
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path="/create"
                element={
                  <RequireAuth>
                    <CreatePost />
                  </RequireAuth>
                }
              />
              <Route
                path="/posts/:id"
                element={
                  <RequireAuth>
                    <SinglePost />
                  </RequireAuth>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <RequireAuth>
                    <EditPostPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile/:id"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path="/adminBoard"
                element={
                  <RequireAuth>
                    <AdminBoard />
                  </RequireAuth>
                }
              />
              </Route>
          </Routes>
        </Router>
      </AlertProvider>
    </>
  );
}

export default App;
