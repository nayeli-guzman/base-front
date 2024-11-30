import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/AuthComponent/Login";
import Register from "./components/AuthComponent/Register";
import axios from "axios";

//export const baseURL = '34.229.144.23:8080';

export const baseURL = "localhost:8082";

export const axiosClient = axios.create({
  baseURL: `http://${baseURL}`, // backend port
  headers: {
    "Content-Type": "application/json",
  },
});

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
