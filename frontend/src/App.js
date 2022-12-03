import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Chat from "./components/Chat";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Send from "./components/Send";
import Session from "./components/Session";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<><Navbar/><Dashboard/> </>} />
        <Route path="/session" element={<><Navbar/> <Session/> </>} />
        <Route path="/send" element={<><Navbar/> <Send/></>} />
        <Route path="/chat" element={<><Navbar/> <Chat/></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
