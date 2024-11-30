import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/AuthComponent/Login";
import Register from "./components/AuthComponent/Register";


function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
