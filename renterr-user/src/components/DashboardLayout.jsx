import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./leftcard/Navbar";
const DashboardLayout = ({login , setlogin,  sideOpen, setSideOpen}) => {

  return (
    <div className="w-full bg-amber-50 md:flex md:gap-6 md:h-screen md:overflow-hidden">
      <Navbar login={login} setlogin={setlogin} sideOpen={sideOpen} setSideOpen={setSideOpen}/>

      <main className="w-full min-w-0 md:flex-1 md:p-4 md:ml-0">
        <div className="w-full bg-white h-[97vh] md:h-full md:rounded-xl md:shadow-2xl overflow-x-hidden">
          <Outlet
          sideOpen={sideOpen}
          setSideOpen={setSideOpen} />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;