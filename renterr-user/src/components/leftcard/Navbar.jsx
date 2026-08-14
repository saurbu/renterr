import React from 'react'
import logo from '../../assets/logo2.png'
import { IoHome } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoDocument } from "react-icons/io5";
import { LogOut  } from 'lucide-react'
import { IoLogOut } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const Navbar = ({isLogin, setIsLogin}) => {
  const nav = [
    {name:"Home", path:"/", icon: <IoHome size={20}/>},
    {name:"My Bookings", path:"/bookings", icon: <FaCar size={20}/>},
    {name:"Profile", path:"/profile", icon: <IoPerson size={20}/>},
  ]
  return (
    <div >
      <div className='hidden md:block'>
        <div className='md:w-68 mx-2 flex flex-col justify-between h-full'>
          <div 
          className='bg-indigo-950 border w-75 border-gray-200 shadow-lg justify-between rounded-xl  p-5 m-2.5 fixed left-0 top-0 h-screen flex flex-col'>
          <nav>
            <img src={logo} alt="renterr" className='w-[150px] mx-auto'/>
            
          </nav>
          <div>
            {nav.map((nav) => (
              <div
              key={nav.name}
              className='py-0.5'
              >
                <NavLink
                to={nav.path}
                className={({ isActive }) =>
                  `flex w-full font-semibold text-white cursor-pointer items-center gap-3 
                  transition-all duration-300 m-1 rounded-xl p-3
                  ${isActive ? "bg-red-700" : "bg-white/10 hover:bg-red-700"}`
                }
                >
                  {nav.icon}{nav.name}
                </NavLink>
              </div>
            ))}
          </div>
          <div className="mt-auto bg-indigo-900 border my-2  border-indigo-800 rounded-2xl p-1 text-white cursor-pointer hover:bg-white hover:text-black">
            
            <div className="flex items-center gap-2 w-full p-5">
              <MdOutlineSupportAgent size={24} />
                <div>
                <h3 className="font-semibold   text-lg">
                  Need Help?  
                </h3>
                <p>contact us anytime.</p>
                </div>
                
            </div>
            
          </div>
          {
            isLogin && (
              <div className='w-full'>
            <button 
            onClick={()=> setIsLogin(false)}
            className='flex gap-2 bg-white w-full font-semibold text-red-500 hover:text-white cursor-pointer transition-all duration-500 hover:bg-red-700 m-1 rounded-xl p-3'><LogOut /> Logout</button>
          </div>
            )
          }
          
          </div>
        </div>
      </div>
        <div className='md:hidden flex fixed justify-between items-center px-10 text-white bg-indigo-950 bottom-0 h-16 left-0 w-full border z-50'>
          {nav.map((nav)=>(
            <NavLink
            key={nav.name}
            className=""
            to={nav.path}
            >
              {nav.icon}
            </NavLink>
          ))}
          <NavLink
            className=""
            to={"/support"}
            >
              <MdOutlineSupportAgent size={20} />
            </NavLink>
        </div>
      
    </div>
  )
}

export default Navbar
