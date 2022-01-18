/*************************************************/
//On Importe ce dont on a besoin.

import { Outlet } from "react-router"; //Nos pages
import Header from "./header/header"; //Le header qui apparait sur chaque page

/*************************************************/
//Notre Layout

const Layout = () => {
    
    return (
      <>
      <Header/>
      <Outlet />
      </>
     );
}
 
export default Layout;