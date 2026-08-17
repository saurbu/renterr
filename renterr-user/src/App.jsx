import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import DashboardLayout from "./components/DashboardLayout";

const App = () => {
  const [isLogin , setIsLogin] = useState(false)
  const [sideOpen, setSideOpen] =useState(true)



  useEffect(()=>{
    const user = localStorage.getItem("loggedInUser")
    if(user){
      setIsLogin(true)
    }
  },[])
  return (
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<Login />} />
      {/* Dashboard Layout */}
      <Route path="/" element={<DashboardLayout login={isLogin} setlogin={setIsLogin} sideOpen={sideOpen} setSideOpen={setSideOpen}/>}>
        <Route path="home" element={<Home login={isLogin} setlogin={setIsLogin} sideOpen={sideOpen} setSideOpen={setSideOpen}/>} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="bookcar" element={<Booking />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;