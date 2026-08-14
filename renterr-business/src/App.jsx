import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import DashboardLayout from "./pages/dashboard/DashboardLayout";

import Home from "./pages/dashboard/Home";
import MyCars from "./pages/dashboard/MyCars";
import Bookings from "./pages/dashboard/Bookings";
import Profile from "./pages/dashboard/Profile";
import Earning from "./pages/dashboard/Earning";
import All from "./pages/dashboard/hero/booking/All";
import Pending from "./pages/dashboard/hero/booking/pending";
import Completed from "./pages/dashboard/hero/booking/completed";
import Cancel from "./pages/dashboard/hero/booking/cancel";
import Approved from "./pages/dashboard/hero/booking/Approved";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard Layout */}
      <Route path="/" element={<DashboardLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="my-cars" element={<MyCars />} />
        <Route path="bookings" element={<Bookings />} >
          <Route index element={<All />} />
          <Route path="pending" element={<Pending />} />
          <Route path="completed" element={<Completed />} />
          <Route path="approved" element={<Approved />} />
          <Route path="cancelled" element={<Cancel />} />
      
        </Route>
        <Route path="earning" element={<Earning />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;