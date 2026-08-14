import React, { useState } from 'react'
import logo from '../../assets/logo2.png'
import logo1 from '../../assets/logo1.png'
import { Home, House,  PanelRightOpen, PanelLeftOpen, CarFront, UserRound, BookCheck, IndianRupee, LogOut, Headset } from "lucide-react";
import { NavLink , Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [sideOpen, setSideOpen] =useState(true)
  const [sideLogo, setSideLogo] = useState(true)
  const [carFlip, setCarFlip] = useState(false)

  const navs = [
      {name:"Dashboard", path:"/home", icon: <Home size={20}/>},
      {name:"My Cars", path:"/my-cars", icon: <CarFront size={20}/>},
      {name:"Bookings", path:"/bookings", icon: <BookCheck size={20}/>},
      {name:"Earnings", path:"/earning" ,icon: <IndianRupee size={20}/>},
      {name:"Profile", path:"/profile", icon: <UserRound size={20}/>},
    ]
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    navigate("/login", { replace: true });
  };

  return (
      <div className={`${sideOpen ? "md:w-[280px]" : "md:w-[110px]"} flex flex-col justify-between h-full shrink-0 transition-all duration-700 ease-in-out`}>      
      {sideOpen ? (
        <div className='bg-indigo-950 border hidden border-gray-200 md:w-[300px] shadow-lg justify-between rounded-xl p-5 m-2.5 fixed left-0 top-0 h-screen md:flex flex-col '>
        <nav>
          <div className='flex justify-between items-center'>
            <img src={logo} alt="renterr" className='w-[150px]'/>
            <button
            onClick={()=> setSideOpen(!sideOpen)}
            className='text-white cursor-ew-resize'
            >
              <PanelRightOpen />
            </button>
          </div>
            <ul className="list-none gap-1.5 text-xl mt-5 text-white">

              <li className='flex flex-col gap-1'>
                {
                  navs.map((nav) => (
                    <NavLink
                      to={nav.path}
                      key={nav.path}
                      className={({ isActive }) =>`flex items-center gap-3 p-3 rounded-xl mb-1 transition-all duration-300 
                        ${isActive ? "bg-red-700" : "bg-white/5 hover:bg-red-700"}`}
                    >
                      {nav.icon}{nav.name}
                    </NavLink>
                  ))
                }
                
              </li>
            </ul>

        </nav>
        <div className='flex flex-col gap-1'>
          <div className="mt-auto bg-indigo-900 border border-indigo-800 rounded-2xl p-1 text-white cursor-pointer hover:bg-white hover:text-black">
            <div className="flex items-center gap-2 p-5">
              <Headset />
              <div>
                <h3 className="font-semibold   text-lg">
                  Need Help?  
                </h3>
                <p>contact us anytime.</p>
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
      </div>
    ) : (
    <div className='bg-indigo-950 border hidden md:flex border-gray-200 md:w-fit shadow-lg justify-between rounded-xl p-5 m-2.5 fixed left-0 top-0 h-screen flex flex-col'>
        <nav>
          <div
            onMouseEnter={() => {
              setSideLogo(true)
              setCarFlip(false)
            }}
            onMouseLeave={() => {
              setSideLogo(false)
              setCarFlip(true)
              setTimeout(() => setCarFlip(false), 1000)
            }}
            className="flex justify-between items-center overflow-hidden"
          >
            <img
              src={logo1}
              alt="renterr"
              className={`w-[60px] transition-all duration-1000 ${
                sideLogo
                  ? "-translate-x-20"
                  : "translate-x-0"
              } ${carFlip ? "scale-x-[-1]" : "scale-x-100"}`}
            />

            <button onClick={() => setSideOpen(!sideOpen)} className={`text-white cursor-ew-resize transition-all duration-1000 ${sideLogo ? "translate-x-0 opacity-100" : "translate-x--20 opacity-0"}`}>
              <PanelLeftOpen />
            </button>
          </div>
            <ul className="list-none gap-1.5 text-xl mt-5 text-white">

              <li className='flex flex-col w-full gap-1 justify-center items-center'>
                {
                  navs.map((nav) => (
                    <NavLink
                      to={nav.path}
                      key={nav.path}
                      className={({ isActive }) =>`flex items-center gap-3 p-3 rounded-xl mb-1 transition-all duration-300 
                        ${isActive ? "bg-red-700" : "bg-white/5 hover:bg-red-700"}`}
                    >
                      {nav.icon}
                    </NavLink>
                  ))
                }
                
              </li>
            </ul>

        </nav>
        <div className='flex flex-col justify-center items-center gap-1'>
          <div className="mt-auto bg-indigo-900 border w-fit border-indigo-800 rounded-2xl text-white cursor-pointer hover:bg-white hover:text-black">
            <div className="flex items-center  gap-2 p-3">
              <Headset />
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-fit gap-3 p-3 text-white font-semibold rounded-xl mb-1 transition-all bg-white/5 duration-300 hover:bg-red-700"
          >
            <LogOut size={20}/>
          </button>
        </div>
      </div>
    )}
      
      <div div className='md:hidden flex bottom-0 fixed w-full justify-between items-center h-15 bg-indigo-950 px-6'>
        {
          navs.map((nav) => (
            <NavLink
              to={nav.path}
              key={nav.path}
              className={({ isActive }) =>`flex items-center gap-3 p-2 text-white rounded-xl mb-1 transition-all duration-300 
              ${isActive ? "bg-red-700" : ""}`}
            >
            {nav.icon}
            </NavLink>
          ))
        }
      </div>
    </div>
  )
}

export default Navbar
