import { useContext, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ToastMsg from "./components/ToastMsg";
import Loader from "./components/Loading";


function App() {

  const { currentUser } = useContext(AuthContext);
  const { loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {
        loading ?
          <Loader />
          :
          <div>
            <ToastMsg />
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
                <Route Exact path="/login" element={<Login />} />
                <Route Exact path="/register" element={<Register />} />
              </Routes>
            </BrowserRouter>
          </div>
      }
    </>
  );
}

export default App;
