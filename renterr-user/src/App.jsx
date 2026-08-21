import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import DashboardLayout from "./components/DashboardLayout";
// import axios from "axios";

const App = () => {
  const [isLogin , setIsLogin] = useState(false)
  const [sideOpen, setSideOpen] =useState(true)
  const [bookCar, setBookCar] = useState(null)
  // const [cars, setCars] = useState([])
  
  //   useEffect(() =>{
  //     const fetchCars = async () =>{
  //       try{
  //         const res = await axios.get(
  //           "https://renterr.onrender.com/api/car/allcars")
  //         if(res.data.success){
  //           const cardtl = res.data.cars.filter((item) => item._id === bookCar)
  //           setCars(cardtl)
            
  //         }
  //       }catch(err){
  //         console.log(err)
  //       }
  //     }
  //     fetchCars()
  //   }, [bookCar])

  useEffect(()=>{
    const user = localStorage.getItem("loggedInUser")
    if(user){
      setIsLogin(true)
    }
  },[])
  return (
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<Login />} />
      {/* Dashboard Layout */}
      <Route path="/" element={<DashboardLayout login={isLogin} setlogin={setIsLogin} sideOpen={sideOpen} setSideOpen={setSideOpen} bookCar={bookCar} setBookCar={setBookCar}/>}>
        <Route path="home" element={<Home login={isLogin} setlogin={setIsLogin} sideOpen={sideOpen} setSideOpen={setSideOpen} bookCar={bookCar} setBookCar={setBookCar}/>} />
        <Route path="bookings" element={<Bookings bookCar={bookCar} setBookCar={setBookCar}/>} />
        <Route path="bookcar" element={<Booking bookCar={bookCar} setBookCar={setBookCar} login={isLogin}/>} />
        <Route path="profile" element={<Profile login={isLogin} setlogin={setIsLogin}/>} />
      </Route>
    </Routes>
  );
};

export default App;