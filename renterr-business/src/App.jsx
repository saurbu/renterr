import React, { useEffect, useState } from "react";
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
import Pending from "./pages/dashboard/hero/booking/Pending";
import Completed from "./pages/dashboard/hero/booking/Completed";
import Cancel from "./pages/dashboard/hero/booking/Cancel";
import Approved from "./pages/dashboard/hero/booking/Approved";
import axios from "axios";

const App = () => {
  const [bookings, setBookings] = useState([])
  const [earning, setEarning] = useState([])
  const [totalErn, setTotalErn] = useState(0)
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await axios.get(
          "https://renterr.onrender.com/api/car/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (!res.data.success) return
        const completed = res.data.bookings.filter(
          booking => booking.status === "completed"
        )

        setBookings(completed)
        const earningByDate = completed.reduce((acc, booking) => {
          const date = new Date(booking.updatedAt)
            .toISOString()
            .split("T")[0]

          acc[date] = (acc[date] || 0) + Number(booking.totalAmount || 0)

          return acc
        }, {})
        const earningList = Object.entries(earningByDate)
          .map(([date, earning]) => ({
            date,
            earning
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date))

        setEarning(earningList)
        const total = completed.reduce(
          (sum, booking) => sum + Number(booking.totalAmount || 0),
          0
        )
        setTotalErn(total)
      } catch (err) {
        console.log(err)
      }
    }

    fetchBookings()
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard Layout */}
      <Route path="/" element={<DashboardLayout earning={earning} bookings={bookings}/>}>
        <Route path="home" element={<Home earning={earning} totalErn={totalErn}/>} />
        <Route path="my-cars" element={<MyCars />} />
        <Route path="bookings" element={<Bookings />} >
          <Route index element={<All />} />
          <Route path="pending" element={<Pending />} />
          <Route path="completed" element={<Completed />} />
          <Route path="approved" element={<Approved />} />
          <Route path="cancelled" element={<Cancel />} />
      
        </Route>
        <Route path="earning" element={<Earning earning={earning} totalErn={totalErn} bookings={bookings}/>} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;