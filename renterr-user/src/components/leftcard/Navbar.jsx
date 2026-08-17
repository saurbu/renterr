import React, { useState } from 'react'
import logo from '../../assets/logo2.png'
import logo1 from '../../assets/logo1.png'
import { Home, House,  PanelRightOpen, PanelLeftOpen, CarFront, UserRound, BookCheck, IndianRupee, LogOut, Headset } from "lucide-react";
import { NavLink  } from "react-router-dom"
import { IoHome } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoDocument } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";

const Navbar = ({login, setlogin , sideOpen, setSideOpen}) => {
  const [sideLogo, setSideLogo] = useState(true)
  const [carFlip, setCarFlip] = useState(false)

 const nav = [
    {name:"Home", path:"/home", icon: <IoHome size={20}/>},
    {name:"My Bookings", path:"/bookings", icon: <FaCar size={20}/>},
    {name:"Profile", path:"/profile", icon: <IoPerson size={20}/>},
  ]
  
  const logout = () => {
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('token')
    setlogin(false)
  }
  
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
            <div>
            {!login ? (
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `flex w-full font-semibold text-white cursor-pointer items-center gap-3 
                  transition-all duration-300 m-1 rounded-xl p-3
                  ${isActive ? "bg-red-700" : "bg-white/10 hover:bg-red-700"}`
                }
              >
                <IoHome size={20} /> Home
              </NavLink>
            ) : (
              nav.map((nav) => (
                <div
                  key={nav.name}
                  className="py-0.5"
                >
                  <NavLink
                    to={nav.path}
                    className={({ isActive }) =>
                      `flex w-full font-semibold text-white cursor-pointer items-center gap-3 
                      transition-all duration-300 m-1 rounded-xl p-3
                      ${isActive ? "bg-red-700" : "bg-white/10 hover:bg-red-700"}`
                    }
                  >
                    {nav.icon}
                    {nav.name}
                  </NavLink>
                </div>
              ))
            )}
          </div>

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
          {
            login && (
              <div className='w-full'>
            <button 
            onClick={()=> logout()}
            className='flex gap-2 bg-white w-full font-semibold text-red-500 hover:text-white cursor-pointer transition-all duration-500 hover:bg-red-700 m-1 rounded-xl p-3'><LogOut /> Logout</button>
          </div>
            )
          }
        </div>
      </div>
    ) : (
    <div className='bg-indigo-950 border hidden md:flex border-gray-200 md:w-fit shadow-lg justify-between rounded-xl p-5 m-2.5 fixed left-0 top-0 h-screen flex-col'>
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
            <div className='mt-4'>
            {!login ? (
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `flex w-full font-semibold text-white cursor-pointer items-center gap-3 
                  transition-all duration-300 m-1 rounded-xl p-3
                  ${isActive ? "bg-red-700" : "bg-white/10 hover:bg-red-700"}`
                }
              >
                <IoHome size={20} />
              </NavLink>
            ) : (
              nav.map((nav) => (
                <div
                  key={nav.name}
                  className="py-0.5 flex flex-col justify-center items-center"
                >
                  <NavLink
                    to={nav.path}
                    className={({ isActive }) =>
                      `flex w-fit font-semibold text-white cursor-pointer  items-center gap-3 
                      transition-all duration-300 m-1 rounded-xl p-3
                      ${isActive ? "bg-red-700" : "bg-white/10 hover:bg-red-700"}`
                    }
                  >
                    {nav.icon}
                  </NavLink>
                </div>
              ))
            )}
          </div>

        </nav>
        <div className='flex flex-col justify-center items-center gap-1'>
          <div className="mt-auto bg-indigo-900 border w-fit border-indigo-800 rounded-2xl text-white cursor-pointer hover:bg-white hover:text-black">
            <div className="flex items-center  gap-2 p-3">
              <Headset />
            </div>
          </div>
          {
            login && (
              <div className='w-it'>
            <button 
            onClick={()=> logout()}
            className='flex gap-2 bg-white w-fit font-semibold text-red-500 hover:text-white cursor-pointer transition-all duration-500 hover:bg-red-700 m-1 rounded-xl p-3'><LogOut /></button>
          </div>
            )
          }
        </div>
      </div>
    )}
      
      <div div className='md:hidden flex bottom-0 fixed w-full justify-between items-center h-15 bg-indigo-950 px-6'>
        {
          nav.map((nav) => (
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
