import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const DashboardLayout = ({earning, bookings}) => {
  return (
    <div className="w-full bg-amber-50 md:flex md:gap-6 md:h-screen md:overflow-hidden">
      <Navbar />

      <main className="w-full min-w-0 md:flex-1 md:p-4 md:ml-0">
        <div className="w-full bg-white h-[97vh] md:h-full md:rounded-xl md:shadow-2xl overflow-x-hidden">
          <Outlet earning={earning} bookings={bookings}/>
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout