import { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {currentUser} = useContext(AuthContext);
  const ProtectedRoute = ({chiildren})=>{
    if(!currentUser){
       return <Navigate to='/login' />
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route Exact path="/login" element={<Login />} />
        <Route Exact path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
