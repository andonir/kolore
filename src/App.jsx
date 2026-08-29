import './App.css'

import {Routes, Route, Navigate} from "react-router-dom"
import Home from "./client/pages/Home.jsx"
import AdminHome from "./admin/pages/AdminHome.jsx"
import Header from './client/components/Header.jsx'
import Footer from './client/components/Footer.jsx'
function App() {

  return <>
  <Header></Header>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/admin' element={<AdminHome/>}></Route>
      <Route path='*' element={<Navigate to ="/" replace/>}></Route>
    </Routes>
    <Footer></Footer>
  </>
}

export default App
