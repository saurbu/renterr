import React, { useEffect, useRef, useState } from 'react'
import { Send, ShieldCheck, IndianRupee, Headset } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Complete from './Complete'

const Login = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef([])
  const [count, setCount] = useState(30)
  const [resend, setResend] = useState(false)
  const [step, setStep] = useState("login")
  const [sendOTP, setSendOTP] = useState({
    email:""
  })
  const [otpsend, setotpSend] = useState(false)
  const [verifyOTP, setVerifyOTP] = useState({
    email:""
    })
  const navigate = useNavigate()

  const handleSendOtp = async (e) => {
    e.preventDefault()

    try{
      const res = await axios.post("http://localhost:8000/api/auth/sendOtp", {
        email: sendOTP.email
      })

      if(res.data.success){
        setVerifyOTP({
          email: sendOTP.email,
          otp: ""
        })
        setResend(true)
        setotpSend(true)
      } else {
        alert(res.data.message || "Failed to send OTP");
      }
    }catch(err){
      console.log(err);
      
    }
  }

  const handleResendOtp = async (e) => {
    e.preventDefault()

    try{
      const res = await axios.post("http://localhost:8000/api/auth/sendOtp", {
        email: verifyOTP.email
      })

      if(res.data.success){
        setOtp(["", "", "", "", "", ""])
        setResend(true)
        setCount(30)
      } else {
        alert(res.data.message || "Failed to Resend OTP");
      }
    }catch(err){
      console.log(err);
      
    }
  }
  const handleVerifyOtp = async (e) => {
    e.preventDefault()

    try{

      const enteredotp = otp.join("")
      const res = await axios.post("http://localhost:8000/api/auth/verifyOtp", {
        email: verifyOTP.email,
        otp: enteredotp
      })

      if(res.data.success){
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("loggedInUser", JSON.stringify(res.data.user))
        setOtp(["", "", "", "", "", ""])
        if(res.data.isProfileCompleted === false){
          setStep("completeprofile")
        }else{
          navigate("/")
        }

      } else {
        alert(res.data.message || "Ivalid OTP")
      }
    }catch(err){
      console.log(err);
      
    }
  }

    const handleChange = (e) => {
    setSendOTP({
      ...sendOTP,
      [e.target.name]: e.target.value,
    })
  }
  useEffect(() => {
    if (!resend || count === 0) return;

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resend, count])

  return (
    <div className='flex h-screen bg-cover '
    style={{ backgroundImage: 'url("https://ik.imagekit.io/flmrntctj/thyler-voss-xFgL8xGIGpk-unsplash.jpg")'}}
    >
      <div className='flex bg-black/20 w-full'>
        <div className='w-[70%]  hidden md:block '>
          <img src="https://ik.imagekit.io/flmrntctj/logo2.png" alt="Renterr" className='w-40 m-5'/>
          <div className='flex flex-col py-10 justify-between px-15 '>
            <div className=''>
              <h1 className='text-5xl font-semibold text-[#7950e9]'>Drive Beyond Limits, <br />Explore Without Boundaries.</h1>
              <p className='text-2xl font-semibold text-[#dce0e6]'>Rent the perfect Car for you'r journey</p>
            </div>
            <div className='flex flex-col gap-8 mt-60'>
              <p className='flex gap-3 text-gray-200 text-xl font-semibold'><ShieldCheck size={35}/> Verified Cars</p>
              <p className='flex gap-3 text-gray-200 text-xl font-semibold'><IndianRupee size={35} /> Best price</p>
              <p className='flex gap-3 text-gray-200 text-xl font-semibold'><Headset size={35}/>24/7 Support</p>
            </div>
          </div>
        </div>
        {step === "login" ? (
          <div className='md:w-[30%] md:m-15 m-5 w-full flex flex-col justify-center items-center'>
            <img src="https://ik.imagekit.io/flmrntctj/logo2.png" alt="Renterr" className='w-30 md:hidden top-5 absolute'/>
            <div className='w-full h-fit bg-white/85 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.8)] p-5'>
              <div className=' pb-5'>
                <h2 className='font-bold text-indigo-950 md:text-3xl text-2xl'>Welcome to Renterr</h2>
                <p className='text-xl text-gray-500'>Login to continue</p>
              </div>
              <form 
              onSubmit={handleSendOtp}
              className='flex flex-col gap-3'>
                <label className='text-xl font-semibold'>Email</label>
                <input type="email" 
                name='email'
                onChange={handleChange}
                value={sendOTP.email}
                required
                placeholder='xyz@gmail.com'
                className='bg-indigo-950/30 w-full h-10 rounded-xl px-2 outline-none focus:border-2 flex items-center border-indigo-950'
                />
                {!otpsend ? (
                  <button 
                  className='flex bg-blue-600 w-full p-2 rounded-xl cursor-pointer font-semibold gap-1 text-white justify-center items-center'
                  ><Send size={22}/>Send OTP</button>
                ):(
                  <button 
                  disabled
                  className='flex bg-green-600 w-full p-2 rounded-xl cursor-pointer font-semibold gap-1 text-white justify-center items-center'
                  ><Send size={22}/>OTP sended</button>
                )}
                  <p className='text-center py-3 hidden md:block'>---------------- OR ----------------</p>
              </form>
              <form 
              onSubmit={handleVerifyOtp}
              className='flex flex-col gap-3'>
                <label className='text-xl font-semibold'>Enter OTP</label>
                <div className="flex justify-center gap-2 sm:gap-3">
                  {otp.map((value, index) => (
                    <input
                    key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      required
                      maxLength={1}
                      value={value}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "")
                        
                        if (!val) return;
                        
                        const newOtp = [...otp]
                        newOtp[index] = val
                        setOtp(newOtp)

                        if (index < 5) {
                          inputRefs.current[index + 1]?.focus()
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          e.preventDefault()
                          const newOtp = [...otp]
                          if (otp[index]) {
                            newOtp[index] = ""
                            setOtp(newOtp);
                          } else if (index > 0) {
                            newOtp[index - 1] = ""
                            setOtp(newOtp);
                            inputRefs.current[index - 1]?.focus()
                          }
                        }
                      }}
                      className="w-8 h-10 sm:w-12 sm:h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg outline-none focus:border-indigo-950 transition-all bg-indigo-950/30"
                      />
                  ))}
                </div>
                { resend && (
                  <div className='text-center font-semibold'>
                    {count > 0 ? (
                    <span>Resend OTP in <span className='text-blue-700'>00:{count}</span></span>
                  ):(
                    <button 
                    type='button'
                    onClick={handleResendOtp}
                    className='text-blue-700'>Resend OTP</button>
                    )}
                  </div> 
                )}
                <div className='flex gap-2 items-center'>
                  <input type="checkbox" 
                  className='w-3'
                  required/>
                  <span>Are you agree with our <a href="" className='text-blue-600 font-semibold'>Term & Condition</a></span>
                </div>
                <button className='bg-blue-600 w-full p-2 rounded-xl cursor-pointer font-semibold text-white'>Verify OTP</button>
              </form>
            </div>
          </div>
        ) : (
          <div className='md:w-[30%] md:m-15 m-5 w-full flex flex-col justify-center items-center'>
            <Complete />
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
