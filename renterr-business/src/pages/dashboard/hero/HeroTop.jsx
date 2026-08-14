import React, { useEffect, useState } from "react";
import { ShieldCheck, Headset, LogOut } from "lucide-react";
import { NavLink, useNavigate  } from "react-router-dom";

const HeroTop = ({ onAddCar , logout, setLogout}) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  const profileImg = storedUser?.profileImage?.data
    ? `data:${storedUser.profileImage.contentType};base64,${storedUser.profileImage.data}`
    : "https://via.placeholder.com/40";

  const name = storedUser?.name || "User";
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    navigate("/login", { replace: true });
  };
  return (
    <div className="bg-white pt-3 left-0">
      <div className=" flex items-center left-0 justify-between gap-4 pr-3 py-3 md:pl-3 md:pr-12">
        <button
          onClick={onAddCar}
          className=" bg-red-500 flex justify-center items-center gap-2 px-5 h-10 rounded-lg text-white font-semibold cursor-pointer hover:bg-red-600"
        >
          <span className="font-bold text-xl">+</span> <span className="hidden md:block">Add New Car</span>
        </button>
        <div className="relative">
          <div 
          onClick={()=> setLogout(!logout)}
          className="flex items-center gap-3 px-2 py-2 bg-gray-50 rounded-lg shadow-sm">

            <img
              src={profileImg}
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <h3 className="font-semibold text-sm md:text-md text-gray-900">
                {name}
              </h3>

              <p className="text-[10px] hidden text-gray-500 md:flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                verified
              </p>
            </div>
          </div>
          {logout && (
            <div className='absolute top-18 right-0 mr-2 z-50 flex flex-col gap-1 md:hidden bg-indigo-950 p-3 rounded-xl'>
            <div className="mt-auto bg-indigo-900 border  border-indigo-800 rounded-xl p-1 text-white cursor-pointer hover:bg-white hover:text-black">
              <div className="flex items-center gap-2 p-1">
                <Headset />
                <div>
                  <h3 className="font-semibold   text-sm">
                    Need Help?  
                  </h3>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 text-white font-semibold rounded-xl mb-1 transition-all bg-white/5 duration-300 hover:bg-red-700"
            >
              <LogOut size={20}/>
            Logout
            </button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroTop;