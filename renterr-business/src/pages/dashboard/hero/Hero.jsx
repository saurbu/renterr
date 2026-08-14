import React, { useState } from "react";
import HeroTop from "./HeroTop";
import HeroMid from "./HeroMid";
import HeroChart from "./HeroChart";
import HeroBooking from "./HeroBooking";

const Hero = ({ user, onAddCar }) => {
    const [logout, setLogout] = useState(false)

  return (
    <div 
    className="w-full min-h-[95vh] flex flex-col gap-4 md:gap-6 px-5">
      
      <HeroTop
        user={user}
        onAddCar={onAddCar}
        logout={logout} 
        setLogout={setLogout}
      />

      <HeroMid />

      <div 
      onClick={()=> setLogout(false)}
      className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 px-3 sm:px-4 md:px-6 pb-6 md:pr-10">
        <HeroChart />
        <HeroBooking />
      </div>

    </div>
  );
};

export default Hero;