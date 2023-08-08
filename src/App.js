import { Children, useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
        <Route Exact path="/login" element={<Login />} />
        <Route Exact path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
