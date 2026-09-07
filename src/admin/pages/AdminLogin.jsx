import {useState} from 'react'
import { logIn } from '../../supabase/functions'
const AdminLogin = ()=>{
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const handleSubmit = (e)=>{
        e.preventDefault()
        setEmail(e.target.email.value)
        setPassword(e.target.password.value)

        console.log(logIn(e.target.email.value, e.target.password.value))
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