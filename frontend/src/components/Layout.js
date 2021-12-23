import { Outlet } from "react-router";
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