import { ToastContainer } from "react-toastify"
import Home from "./pages/home"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from "./pages/signup"
import Login from "./pages/login"
function App() {
  

  return (
    <>
    <ToastContainer />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
