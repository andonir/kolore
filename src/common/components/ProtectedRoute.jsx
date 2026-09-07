import { Context } from "../../Context/Context"
import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
const ProtectedRoute = ()=>{
    const {loading, session} = useContext(Context)

    if(loading){
        return <h1>Cargando...</h1>
    }
    if(!session){
        return <Navigate to="/admin/login" replace/>
    }

    return <Outlet></Outlet>
}

export default ProtectedRoute