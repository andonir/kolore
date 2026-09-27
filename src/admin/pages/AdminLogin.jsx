import {useState} from 'react'
import { logIn } from '../../supabase/functions'
import { useContext } from 'react'
import { Context } from '../../Context/Context'
import { useNavigate } from 'react-router-dom'
const AdminLogin = ()=>{
    const {session} = useContext(Context)
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault()
        logIn(e.target.email.value, e.target.password.value)
        if(session) {
            navigate('/admin/home')
        }
    }
    return <main className="login">
         <h2>Admin Login</h2>
        <form className="login-form" onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" name="email" placeholder="Correo"/>
            <input type="password" name="password" placeholder="Contraseña"/>
            <button type="submit">INICIAR SESIÓN</button>
        </form>
    </main>
}

export default AdminLogin