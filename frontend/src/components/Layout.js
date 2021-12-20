import React from "react";
import { Outlet } from "react-router";
import Header from "./header/header";
import Nav from "./header/nav";
import HeaderTest from "./header/headerTest";

const Layout = () => {
    
    return (
      <>
      <HeaderTest/>
      <Outlet />
      </>
     );
}
 
export default Layout;