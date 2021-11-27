import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate, useLocation } from "react-router";
import useAuthStore from "./stores/auth";
import Landing from "./pages/Landing/Landing";
import Profile from "./pages/profile/profile";

const RequireAuth = ({ children }) => {
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
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} exact />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
