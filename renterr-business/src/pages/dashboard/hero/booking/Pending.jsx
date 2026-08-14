import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Pending = () => {
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    const fetchBookings = async () => {
      try {

        const token = localStorage.getItem('token')
        const res = await axios.get(
          "http://localhost:8000/api/car/bookings",
          {
            headers: {
              Authorization:`Bearer ${token}`
            }
          }
        )
        if (res.data.success) {
        const pending = res.data.bookings.filter((item) => item.status === "pending")
          setBookings(pending)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchBookings()
  })
 
  return (
    <div>
      <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 gap-6 py-5">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="overflow-hidden">
              <img loading="lazy" src={booking.carDetails?.images?.[0]} alt={booking.carDetails?.brand} className="w-full h-32 sm:h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="px-3 sm:px-4 py-3">
              <div className="flex justify-between items-start gap-2 mb-2">
                <div>
                  <p className="capitalize text-sm sm:text-base md:text-lg font-semibold">
                    {booking.carDetails?.brand}, {booking.carDetails?.model}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Booked by: <span className="text-gray-900 font-semibold capitalize">{booking.name}</span>
                  </p>
                </div>
                <span className={`shrink-0 inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium capitalize ${
                  booking.status === "approved" || booking.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : booking.status === "cancelled" || booking.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-orange-100 text-orange-700"
                }`}>
                  {booking.status}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mt-3">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Pickup Date: {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm sm:text-base mt-1">
                    Amount:
                    <span className="text-lg sm:text-xl font-bold text-red-600 ml-1">
                      ₹{booking.totalAmount}
                    </span>
                    <span className="text-xs text-gray-700 ml-1">
                      / {booking.days} {booking.days > 1 ? "days" : "day"}
                    </span>
                  </p>
                </div>
                <button className="self-start sm:self-auto px-3 py-1.5 rounded-lg text-xs sm:text-sm border border-violet-400 text-violet-600 hover:bg-violet-500 hover:text-white transition-colors cursor-pointer">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))

        }
      </div>
    </div>
  )
}

export default Pending