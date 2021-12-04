import React from "react";
import { Outlet } from "react-router";
import Header from "./header/header";
import Nav from "./header/nav";

const Layout = () => {
    
    return (
      <>
      <Header/>
      <Nav/>
      <Outlet />
      </>
     );
}
 
export default Layout;