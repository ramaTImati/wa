import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Session from "./components/Session";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<><Navbar/><Dashboard/> </>} />
        <Route path="/session" element={<><Navbar/> <Session/> </>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
