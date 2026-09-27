import AddData from "../components/AddData"
import AddDrawing from "../components/AddDrawing"
import { logOut } from "../../supabase/functions"
const AdminHome = ()=>{
    return <main className="admin-home">
        <div className="admin-home-top">
        <h1>Admin Home</h1>
        <button className="log-out" onClick={()=>logOut()}>CERRAR SESIÓN</button>
        </div>
        <AddDrawing></AddDrawing>
    </main>
}

export default AdminHome