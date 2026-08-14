import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import carImage from "../assets/car2.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utils";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [signupInfo, setSignupInfo] = useState({
    mobile: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [verificationInfo, setVerificationInfo] = useState({
    name: "",
    profileImage: null,
    idType: "",
    idNumber: "",
    document: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };

  const handleVerificationChange = (e) => {
    const { name, value } = e.target;

    setVerificationInfo({
      ...verificationInfo,
      [name]: value,
    });
  };

  const nextStep = (e) => {
    e.preventDefault();

    const { mobile, email, password, repassword } = signupInfo;

    if (!mobile || !email || !password || !repassword) {
      return handleError("All fields are required");
    }

    if (password !== repassword) {
      return handleError("Passwords do not match");
    }

    setStep(2);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:8000/api/auth/signup";
      if (
        !verificationInfo.name ||
        !verificationInfo.idType ||
        !verificationInfo.idNumber
      ) {
        return handleError("Please fill all verification fields");
      }

      const formData = new FormData();

      formData.append("mobile", signupInfo.mobile);
      formData.append("email", signupInfo.email);
      formData.append("password", signupInfo.password);
      formData.append("repassword", signupInfo.repassword);
      formData.append("name", verificationInfo.name);
      formData.append("idType", verificationInfo.idType);
      formData.append("idNumber", verificationInfo.idNumber);

      if (verificationInfo.profileImage) {
        formData.append("profileImage", verificationInfo.profileImage);
      }

      if (verificationInfo.document) {
        formData.append("idProofImage", verificationInfo.document);
      }

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      const { success, message } = result;

      if (success) {
        handleSuccess(message);

        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.error(err);
      handleError(err.message);
    }
  };

  return (
    <>
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center p-4 lg:p-12 gap-8 overflow-hidden"
        >
          <div className="hidden md:flex justify-center items-center w-full lg:w-2/3">
            <img
              src={carImage}
              alt="Car"
              className="w-full max-w-4xl object-contain"
            />
          </div>

          <div className="w-full max-w-md bg-blue-100 rounded-2xl p-6 shadow-xl">
            <img
              src={logo}
              alt="Logo"
              className="w-40 mx-auto mb-8 cursor-pointer"
            />

            <form className="space-y-5" onSubmit={nextStep}>
              <input
                type="tel"
                placeholder="Mobile Number"
                name="mobile"
                onChange={handleChange}
                value={signupInfo.mobile}
                className="w-full h-12 px-4 rounded-lg bg-sky-200 border border-transparent focus:border-black focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={signupInfo.email}
                className="w-full h-12 px-4 rounded-lg bg-sky-200 border border-transparent focus:border-black focus:outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={signupInfo.password}
                className="w-full h-12 px-4 rounded-lg bg-sky-200 border border-transparent focus:border-black focus:outline-none"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                name="repassword"
                onChange={handleChange}
                value={signupInfo.repassword}
                className="w-full h-12 px-4 rounded-lg bg-sky-200 border border-transparent focus:border-black focus:outline-none"
              />

              <button
                type="submit"
                className="w-full h-12 rounded-lg bg-indigo-950 text-white text-lg font-medium transition-all cursor-pointer duration-300 hover:bg-yellow-100 hover:text-black hover:border hover:border-black"
              >
                Next
              </button>
            </form>

            <p className="text-center my-6 text-gray-700">
              ---------------- Or ----------------
            </p>

            <p className="text-center">
              Already have an account?
              <br />
              <Link
                to="/login"
                className="text-blue-700 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-white px-4 py-8"
        >
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Logo" className="w-44" />
          </div>

          <div className="max-w-3xl mx-auto bg-blue-100 rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-center mb-8">
              Complete Your Profile
            </h2>

            <form onSubmit={handleSignup} className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <label className="block font-medium">Profile Photo</label>

                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-950 bg-gray-200 flex items-center justify-center">
                  {verificationInfo.profileImage ? (
                    <img
                      src={URL.createObjectURL(verificationInfo.profileImage)}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">No Image</span>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  id="profileImage"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setVerificationInfo({
                      ...verificationInfo,
                      profileImage: file,
                    });
                  }}
                />

                <label
                  htmlFor="profileImage"
                  className="cursor-pointer px-5 py-2 bg-indigo-950 text-white rounded-lg hover:bg-indigo-800 transition"
                >
                  Upload Profile
                </label>
              </div>
              <div>
                <label className="block font-medium mb-2">Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={verificationInfo.name}
                  onChange={handleVerificationChange}
                  placeholder="Enter Full Name"
                  className="w-full h-12 px-4 rounded-lg bg-sky-200 border border-transparent focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  ID Proof Type
                </label>

                <select
                  name="idType"
                  value={verificationInfo.idType}
                  onChange={handleVerificationChange}
                  className="w-full h-12 px-5 rounded-lg bg-sky-200 border border-transparent focus:border-black focus:outline-none"
                >
                  <option value="" disabled>
                    Select id proof
                  </option>
                  <option value="Aadhaar">Aadhaar</option>
                  <option value="PAN">PAN</option>
                  <option value="Driving Licence">Driving Licence</option>
                  <option value="Passport">Passport</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2">ID Number</label>

                <input
                  type="text"
                  name="idNumber"
                  value={verificationInfo.idNumber}
                  onChange={handleVerificationChange}
                  placeholder="Enter ID Number"
                  className="w-full h-12 px-4 rounded-lg bg-sky-200 border border-transparent focus:border-black focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">
                  Upload ID Proof
                </label>

                <input
                  type="file"
                  id="idProofImage"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setVerificationInfo({
                      ...verificationInfo,
                      document: file,
                    });
                  }}
                  className="hidden"
                />

                <label
                  htmlFor="idProofImage"
                  className="cursor-pointer px-5 py-2 bg-indigo-950 text-white rounded-lg hover:bg-indigo-800 transition"
                >
                  Upload Image
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/2 h-12 rounded-lg bg-gray-500 text-white cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="w-1/2 h-12 rounded-lg bg-indigo-950 text-white cursor-pointer"
                >
                  Complete Signup
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      <ToastContainer />
    </>
  );
};

export default Signup;