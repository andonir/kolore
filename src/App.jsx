import './App.css'

import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
function App() {

  return <>
  <Header></Header>
    <Routes>
      <Route path='*' element={<Home/>}></Route>
    </Routes>
    <Footer></Footer>
  </>
}

export default App
