import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { Navigate, useLocation,  } from "react-router";
import useAuthStore from "./stores/auth";
import Landing from "./pages/Landing/Landing";
import Profile from "./pages/profile/profile";
import MainPage from "./pages/mainPage/mainPage";
import CreatePost from "./pages/createPost/createPost";


const RequireAuth =  ({ children }) => {
  const token = useAuthStore((state) => state.token);
  let location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

function App() {
  const retrieveToken = useAuthStore(state => state.retrieveTokenUserId)
  
  useEffect(() => {
    retrieveToken()
  }, [])

  const { userId } = useParams()
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} exact />
          <Route
            path="/posts"
            element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            }
          /> 
          <Route
            path="/profile/:userId"
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
            exact
          /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
