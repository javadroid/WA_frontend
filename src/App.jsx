import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { ChatIcon } from "./assets/svg";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import SocketContext from "./context/SocketContext";

const socket = io(import.meta.env.VITE_API_ENDPOINT.split("/api")[0]);
function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="dark">
      <SocketContext.Provider value={socket} >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user?.access_token ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      </SocketContext.Provider>
      
    </div>
  );
}

export default App;
