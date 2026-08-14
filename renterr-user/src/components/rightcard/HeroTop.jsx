import React, { useEffect, useState } from "react";
import { IoLocationOutline, IoLogOut } from "react-icons/io5";
import { MdOutlineSearch, MdOutlineNotifications } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import Image from "/download.jpg";
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'

const HeroTop = ({isLogin}) => {
  const navigate = useNavigate()
  const [show, setShow] = useState(true)

  
  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        setShow(false)
      } else {
        setShow(true)
      }
      lastScroll = currentScroll
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={` fixed md:top-5 left-0 w-full md:left-[330px]  bg-white/90 md:w-[calc(100%-360px)] pl-4 py-3 z-40
      transition-transform duration-500 ease-in-out 
    ${show ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className="flex gap-5 justify-between items-center py-2">
        <img 
        src={Logo} 
        alt="renterr"
        className="w-30 md:hidden p-3 flex "
        />

          <div className="md:flex justify-center hidden items-center cursor-pointer gap-3 p-2 bg-gray-400/20 border border-gray-400 rounded-2xl">
            <IoLocationOutline className="text-gray-600 text-lg" />
            <span className="hidden md:block text-gray-700 font-medium">
              Delhi, India
            </span>
          </div>
        <div className="flex gap-5 justify-center items-center px-2">
          <div className="md:flex hidden justify-center items-center md:w-[300px]  border border-gray-400 bg-gray-400/20  p-2 rounded-full ">
            <MdOutlineSearch className="text-gray-600 text-xl" />

            <input
              type="text"
              placeholder="Search car brands"
              className="w-full ml-2 bg-transparent border-0 outline-none focus:outline-none focus:ring-0"
              />
          </div>
          <div className="flex items-center justify-center border border-gray-400 cursor-pointer bg-gray-400/20 p-2 rounded-2xl">
            <MdOutlineNotifications className="text-gray-600 text-2xl" />
          </div>
          <div className="md:flex hidden leading-4 lg:block">
            {isLogin ? (
              <div className="flex justify-center items-center gap-5 border p-1 px-3 rounded-2xl border-gray-400">
                <img 
                src="" 
                alt="" 
                className="w-8 h-8 rounded-full object-cover bg-no-repeat border border-gray-400"
                style={{backgroundImage: `url("https://ik.imagekit.io/kaptaanjii/pngwing.com.png")`,
                  backgroundPosition: "center"
                }}
                />
                <div className="">
                  <h3 className="font-semibold text-gray-900">
                  Saurav
                  </h3>
                  <p className="text-sm text-gray-500">
                  User
                  </p>
              </div>
            </div>
            ):(
              <div className="flex justify-center items-center border p-1 rounded-2xl text-violet-600 bg-violet-200/50 px-9.5 hover:bg-violet-500 hover:text-white py-2 border-violet-400">
                <button 
                onClick={()=>navigate('/login')}
                className="cursor-pointer font-bold text-lg">Login</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTop;



{ /* 
  import React, { useEffect, useState } from "react";
import { IoLocationOutline, IoLogOut } from "react-icons/io5";
import { MdOutlineSearch, MdOutlineNotifications } from "react-icons/md";
import Image from "/download.jpg";
import Logo from '../../assets/logo.png'

const HeroTop = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [show, setShow] = useState(true)

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        setShow(false)
      } else {
        setShow(true)
      }
      lastScroll = currentScroll
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={`fixed top-0 md:top-2 overflow-hidden z-50 bg-white flex items-center px-15 md:justify-between transition-transform duration-300 w-full py-3
    ${show ? "translate-y-0" : "-translate-y-full"

    }`}>
      <img src={Logo} alt="" 
      className="w-25 md:hidden"/>
      <div className="md:flex items-center gap-2 px-4 py-3 hidden  bg-gray-100 rounded-2xl shadow-sm cursor-pointer">
        <IoLocationOutline className="text-gray-600 text-lg" />
        <span className="hidden md:block text-gray-700 font-medium">
          Delhi, India
        </span>
      </div>

      <div className="md:flex items-center hidden lg:w-[480px] max-w-full px-4 py-3 bg-gray-100 rounded-2xl shadow-sm">
        <MdOutlineSearch className="text-gray-600 text-xl" />

        <input
          type="text"
          placeholder="Search car brands"
          className="w-full ml-2 bg-transparent border-0 outline-none focus:outline-none focus:ring-0"
        />
      </div>

      <div className="flex items-center hidden lg:block justify-center p-3 bg-gray-100 rounded-2xl shadow-sm cursor-pointer">
        <MdOutlineNotifications className="text-gray-600 text-2xl" />
      </div>

        <div className="lg:w-[200px]">
        {isLoggedIn ? (
            <div className="flex items-center gap-3 px-4 py-1 bg-white rounded-2xl shadow-sm cursor-pointer">
            <img
                src={Image}
                alt="user"
                className="w-10 h-10 rounded-full object-cover"
            />

            <div className="hidden lg:block">
                <h3 className="font-semibold text-gray-900">
                Saurav
                </h3>
                <p className="text-sm text-gray-500">
                User
                </p>
            </div>

            <IoLogOut
                className="ml-auto text-gray-600 text-xl hover:text-red-500 transition"
                onClick={() => setIsLoggedIn(false)}
            />
            </div>
        ) : (
            <button
            onClick={() => setIsLoggedIn(true)}
            className="w-full py-3 bg-indigo-950 text-white rounded-2xl shadow-sm cursor-pointer hover:bg-indigo-900 transition"
            >
            Login
            </button>
        )}
        </div>
    </div>
  );
};

export default HeroTop;
  */}