import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { Context } from "../../Context/Context"
const Nav = ()=>{
    const {showAdminNav} = useContext(Context)
    return <nav className={showAdminNav ? "admin-nav show" : "admin-nav"}>
        <ul>
            <li>
            <NavLink to={"admin/add-product"} className={({isActive})=> isActive ? 'nav-link active':"nav-link"}>Añadir producto</NavLink>

            </li>
            <li>
            <NavLink to={"admin/add-drawing"} className={({isActive})=> isActive ? 'nav-link active':"nav-link"}>Añadir dibujo</NavLink>

            </li>
        </ul>
    </nav>
}

export default Nav