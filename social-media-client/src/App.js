import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";


function App() {  
  const  {user} = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={user ? <Home /> : <Login/>} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register />} />
      </Routes>
    </Router>
  )
}

export default App;
