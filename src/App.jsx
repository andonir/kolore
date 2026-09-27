import './App.css'

import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./client/pages/Home.jsx"
import AdminHome from "./admin/pages/AdminHome.jsx"
import AdminLogin from "./admin/pages/AdminLogin.jsx"
import Header from './client/components/Header.jsx'
import Footer from './client/components/Footer.jsx'
import ProtectedRoute from './common/components/ProtectedRoute'
import { useContext } from 'react'
import { Context } from './Context/Context.jsx'
function App() {
  return <>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/admin/login' element={<AdminLogin />}></Route>
      <Route element={<ProtectedRoute/>}>
        <Route path="/admin/home" element={<AdminHome />}></Route>
      </Route>
      <Route path='*' element={<Navigate to="/" replace />}></Route>
    </Routes>
    <Footer></Footer>
  </>
}

export default App
