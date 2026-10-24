import { useLocation } from "react-router-dom";
import Nav from "../../admin/components/Nav";
import { FaBars } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { logOut } from "../../supabase/functions";
const Header = () => {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const {showAdminNav, setShowAdminNav, session}= useContext(Context)  
  
  const handleBarsClick = ()=>{
    if (showAdminNav) setShowAdminNav(false)
    else setShowAdminNav(true)
  }
  return (
      <header>
        <h1>KOLORE</h1>
        {isAdmin && session &&  <>
        <FaBars className="bars-icon" onClick={()=>handleBarsClick()}></FaBars>
        <Nav location={location}></Nav>
        <button className="log-out" onClick={()=>logOut()}>CERRAR SESIÓN</button>
        </>       
}
      </header>
  );
};

export default Header;
