import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { handleError, handleSuccess } from "../utils";
import logo from "../assets/logo2.png";
import carImage from "../assets/car2.png";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const response = await fetch("https://renterr.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();

      console.log("LOGIN RESPONSE:", result);

      const { success, message, jwtToken, user } = result;

      if (!success) {
        return handleError(message || "Login failed");
      }

      if (!jwtToken) {
        return handleError("Token not received from server");
      }
      localStorage.setItem("token", jwtToken);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({ email })
        );
      }

      handleSuccess(message || "Login successful");

      setTimeout(() => {
        navigate("/home");
      }, 1000);

    } catch (err) {
      console.error(err);
      handleError(err.message || "Something went wrong");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center p-4 lg:p-12 gap-8 overflow-hidden"
    >
      <div className="w-full max-w-md bg-blue-100 rounded-2xl p-6 shadow-xl">
        <img
          src={logo}
          alt="Logo"
          className="w-40 mx-auto mb-8 cursor-pointer"
        />

        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            onChange={handleChange}
            value={loginInfo.email}
            type="email"
            name="email"
            placeholder="Email"
            className="w-full h-12 px-4 rounded-lg bg-sky-200 border border-transparent focus:border-black focus:outline-none"
          />

          <input
            onChange={handleChange}
            value={loginInfo.password}
            type="password"
            name="password"
            placeholder="Password"
            className="w-full h-12 px-4 rounded-lg bg-sky-200 border border-transparent focus:border-black focus:outline-none"
          />

          <button
            type="submit"
            className="w-full h-12 rounded-lg bg-indigo-950 text-white text-lg font-medium"
          >
            Login
          </button>
        </form>

        <ToastContainer />

        <p className="text-center my-6 text-gray-700">
          ---------------- Or ----------------
        </p>

        <p className="text-center">
          Don't have an account?
          <br />
          <Link to="/signup" className="text-blue-700 font-semibold">
            Signup
          </Link>
        </p>
      </div>

      <div className="hidden md:flex justify-center items-center w-full lg:w-2/3">
        <img
          src={carImage}
          alt="Car"
          className="w-full max-w-4xl object-contain"
        />
      </div>
    </motion.div>
  );
};

export default Login;