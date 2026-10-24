import { useLocation } from "react-router-dom";
import Nav from "../../admin/components/Nav";
import { FaBars } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
const Header = () => {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const {showAdminNav, setShowAdminNav}= useContext(Context)  
  
  const handleBarsClick = ()=>{
    if (showAdminNav) setShowAdminNav(false)
    else setShowAdminNav(true)
  }
  return (
      <header>
        <h1>KOLORE</h1>
        {isAdmin &&  <>
        <FaBars className="bars-icon" onClick={()=>handleBarsClick()}></FaBars>
        <Nav location={location}></Nav>
          <button className="log-out" onClick={()=>logOut()}>CERRAR SESIÓN</button>
        </>       
}
      </header>
  );
};

export default Header;
