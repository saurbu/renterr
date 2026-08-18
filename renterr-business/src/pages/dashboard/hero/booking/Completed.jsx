import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Completed = () => {
  const [bookings, setBookings] = useState([])
  const [view, setView] = useState(null)
  const [showImage, setShowImage] = useState(false)
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
        const pending = res.data.bookings.filter((item) => item.status === "completed")
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
        { bookings.length > 0 ? (
        
        bookings.map((booking) => (
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
                <button 
                onClick={()=> setView(booking._id)}
                className="self-start sm:self-auto px-3 py-1.5 rounded-lg text-xs sm:text-sm border border-violet-400 text-violet-600 hover:bg-violet-500 hover:text-white transition-colors cursor-pointer">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))
      ) :(
        <div className='w-full h-full flex justify-center pt-[30vh] col-span-2 md:col-span-3'>
          No Completed Bookings
        </div>
      )
        }
        {view && (

        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 p-6 sm:p-8 text-center">
            {bookings.filter((data) => data._id === view).map((data)=> (
              <div
              key={data._id}
              className='text-black space-y-3 text-left'
              >
                <p className='pb-3 text-3xl font-semibold text-indigo-950 text-center'>Booking Details</p>
                <div className='flex gap-3 '>
                  <p className='shadow-[0_0_6px_rgba(0,0,0,0.2)] p-1 px-3 w-[50%] bg-gray-100 text-gray-700 text-sm rounded'>Booked By: <br /> <span className='text-lg font-semibold'>{data.name}</span></p>
                  <p className='shadow-[0_0_6px_rgba(0,0,0,0.2)] p-1 px-3 w-[50%]  bg-gray-100 text-gray-700 text-sm rounded'>Contact Number: <br /> <span className='text-lg font-semibold'>{data.number}</span></p>
                </div>
                <p className='shadow-[0_0_6px_rgba(0,0,0,0.2)] p-1 px-3 w-full bg-gray-100 text-gray-700 text-sm rounded'>Email: <span className='text-lg font-semibold'>{data.email}</span></p>
                <p className='shadow-[0_0_6px_rgba(0,0,0,0.2)] p-1 px-3 w-full bg-gray-100 text-gray-700 text-sm rounded'>License: <span className='text-lg font-semibold'>{data.licenceNumber}</span></p>
                <p className="text-xs sm:text-sm text-gray-500">
                    Pickup Date: {new Date(data.date).toLocaleDateString()}
                  </p>
                <p className="text-sm sm:text-base mt-1">
                    Amount:
                    <span className="text-lg sm:text-xl font-bold text-red-600 ml-1">
                      ₹{data.totalAmount}
                    </span>
                    <span className="text-xs text-gray-700 ml-1">
                      / {data.days} {data.days > 1 ? "days" : "day"}
                    </span>
                  </p>
                <img
                  src={data.licencePhoto}
                  alt="ID Proof"
                  onClick={() => setShowImage(true)}
                  className="w-32 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80"
                />
                {showImage && (
                  <div
                    onClick={() => setShowImage(false)}
                    className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
                  >
                    <img
                      src={data.licencePhoto}
                      alt="ID Proof Fullscreen"
                      onClick={(e) => e.stopPropagation()}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />

                    <button
                      onClick={() => setShowImage(false)}
                      className="absolute top-5 right-5 text-white text-3xl cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div className="mt-7 flex flex-col-reverse sm:flex-row gap-3 justify-center">
              <button
                onClick={()=> setView(false)}
                className="w-full sm:w-auto cursor-pointer rounded-lg bg-red-500 px-6 py-2.5 font-semibold text-white transition hover:bg-red-600 active:scale-95"
              >
                ok
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Completed