import { ToastContainer } from "react-toastify"
import Home from "./pages/home"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  

  return (
    <>
    <ToastContainer />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
