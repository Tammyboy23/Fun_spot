import { ToastContainer } from "react-toastify"
import Home from "./pages/home"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from "./pages/signup"
import Login from "./pages/login"
import Details from "./pages/details"
function App() {
  

  return (
    <>
    <ToastContainer />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/details" element={<Details />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
