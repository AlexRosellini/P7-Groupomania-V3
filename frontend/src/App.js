import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate, useLocation } from "react-router";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-mui';
import useAuthStore from "./stores/auth";
import Layout from "./components/Layout";
import Landing from "./pages/Landing/Landing";
import CurrentUserProfile from "./pages/profile/CurrentUserProfile";
import Profile from "./pages/profile/Profile";
import MainPage from "./pages/mainPage/mainPage";
import CreatePost from "./pages/createPost/createPost";
import LoginSignupPage from "./pages/LoginSignup/LoginSignup";
import SinglePost from "./pages/singlePost/singlePost";
import EditPostPage from "./pages/editPost/editPost";

// optional configuration
const alertOptions = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const RequireAuth = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  let location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

function App() {
  const retrieveToken = useAuthStore((state) => state.retrieveTokenUserId);

  useEffect(() => {
    retrieveToken();
  }, []);

  return (
    <>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} exact />
              <Route path="/login" element={<LoginSignupPage />} />
              <Route
                path="/posts"
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
              </Route>
          </Routes>
        </Router>
      </AlertProvider>
    </>
  );
}

export default App;
