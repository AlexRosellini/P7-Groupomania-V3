import React from "react"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Landing from "./pages/Landing/Landing";
import Profile from "./pages/profile/profile";



function App() {
  
  return (

    <>
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
