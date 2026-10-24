import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./client/pages/Home.jsx"
import AdminLogin from "./admin/pages/AdminLogin.jsx"
import Header from "./common/components/Header"
import Footer from './common/components/Footer.jsx'
import ProtectedRoute from './common/components/ProtectedRoute'
import AddProduct from './admin/pages/AddProduct'
import AddDrawing from './admin/pages/AddDrawing'
import Orders from './admin/pages/Orders'
function App() {
  return <>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/admin/login' element={<AdminLogin />}></Route>
      <Route element={<ProtectedRoute/>}>
        <Route path="/admin/add-product" element={<AddProduct />}></Route>
        <Route path="/admin/add-drawing" element={<AddDrawing />}></Route>
        <Route path="/admin/orders" element={<Orders />}></Route>
      </Route>
      <Route path='*' element={<Navigate to="/" replace />}></Route>
    </Routes>
    <Footer></Footer>
  </>
}

export default App
