import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HeroBooking = () => {
  const [bookings, setBookings] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBookings = async () => {
      try {

        const token = localStorage.getItem('token')
        const res = await axios.get(
          "https://renterr.onrender.com/api/car/bookings",
          {
            headers: {
              Authorization:`Bearer ${token}`
            }
          }
        )

        if (res.data.success) {
          setBookings(res.data.bookings.slice(0,3))
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchBookings()
  })
  return (
    <div className="w-full h-fit min-w-0 bg-gray-100 rounded-xl p-3 sm:p-4 mb-6 md:mb-1">
      <h2 className="text-base sm:text-lg font-semibold mb-3">
        Recent Bookings
      </h2>

      <div className="space-y-2">
        {bookings.map((booking) => (
          <div key={booking._id} className="w-full flex items-center gap-2 sm:gap-3 p-2 border border-gray-200 hover:-translate-x-1 transition-all duration-300 bg-white rounded-xl overflow-hidden">
            <img src={booking.car?.images?.[0]} alt="car" className="md:w-35 md:h-20 w-20 h-16 rounded-lg object-cover shrink-0" />

            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-sm sm:text-lg truncate">
                {booking.name}
              </h2>

              <p className="text-gray-500 text-xs sm:text-sm truncate">
                {new Date(booking.date).toLocaleDateString()} • {booking.days} {booking.days > 1 ? "Days ": "Day: "}
              </p>

              <p className="text-gray-600 font-semibold text-xs sm:text-sm">
                ₹ {booking.totalAmount}
              </p>
            </div>

            <div className="shrink-0">
              <span className={`inline-flex justify-center items-center px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs md:text-sm font-medium ${
                booking.status === "accepted" || booking.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "cancelled" || booking.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-orange-100 text-orange-700"
              }`}>
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-3 text-blue-500 text-sm hover:text-blue-600 transition cursor-pointer"
      onClick={()=>navigate('/bookings')}
      >
        View All Bookings...
      </button>
    </div>
  );
};

export default HeroBooking;