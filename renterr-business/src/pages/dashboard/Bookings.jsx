import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";


const Bookings = () => {
  const [activeTab, setActiveTab] = useState("")
  const tabs = [
    {name: "All", path: "/bookings"},
    {name: "Pending", path: "/bookings/pending"},
    {name: "Approved", path: "/bookings/approved"},
    {name: "Completed", path: "/bookings/completed"},
    {name: "Cancelled", path: "/bookings/cancelled"},
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Booking Management
      </h1>

      <div className="flex md:gap-8 gap-3 mt-6 border-b">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            onClick={() => setActiveTab(tab.name)}
            className={`pb-3 font-medium cursor-pointer ${
              activeTab === tab.name
                ? "border-b-2 border-red-500 text-red-500"
                : "text-gray-500"
            }`}
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Bookings;