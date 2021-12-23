import React from "react";
import {useLocation } from "react-router";
import useAuthStore from "../../stores/auth";



const Landing = () => {
    const token = useAuthStore(state => state.token);
    let location = useLocation();

    return (
      <>
     Landing page
      </>
     );
}
 
export default Landing;