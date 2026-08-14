import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useState } from "react";
import Login from "./pages/Login";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import DashboardLayout from "./components/DashboardLayout";

const App = () => {
  const [isLogin , setIsLogin] = useState(false)
  return (
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<Login />} />
      {/* Dashboard Layout */}
      <Route path="/" element={<DashboardLayout />}>
        <Route path="home" element={<Home login={isLogin} setlogin={setIsLogin}/>} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;