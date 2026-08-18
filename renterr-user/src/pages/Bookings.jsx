import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [statusBookingId, setStatusBookingId] = useState(null)
  const [bookingId, setBookingId] = useState(null)
  const [status, setStatus] = useState(null)

  const handleStaus= (e)=> {
    const newstatus = e.currentTarget.dataset.value
      setStatus(newstatus)
      updateStatus(newstatus)
    }

  const updateStatus = async (newStatus) => {
    if(
      ["accepted", "completed", "cancelled", "rejected"].includes(status)
      ) {
        return
      }
    try {

      const token = localStorage.getItem('token')
      const res = await axios.patch(
        `https://renterr.onrender.com/api/car/bookings/${bookingId}/status`,
        {
          status: newStatus
        },
        {
          headers: {
            Authorization:`Bearer ${token}`
          }
        }
      )

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                status: newStatus
              }
            : booking
        )
      )

      setStatusBookingId(null)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
      const fetchBookings = async () => {
        try {
  
          const token = localStorage.getItem('token')
          const res = await axios.get(
            "https://renterr.onrender.com/api/car/mybookings",
            {
              headers: {
                Authorization:`Bearer ${token}`
              }
            }
          )
  
          if (res.data.success) {
            setBookings(res.data.bookings)
          }
        } catch (err) {
          console.log(err)
        }
      }
      fetchBookings()
    },[])

  return (
    <div className='p-5'>
      <p className='p-2 text-3xl font-bold' >My Bookings</p>
      <div 
      className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 gap-6 py-5">
        
        { bookings.length > 0 ? (
        
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-2xl border border-gray-200 overflow-visible hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="overflow-hidden rounded-t-2xl">
              <img
                loading="lazy"
                src={booking.carDetails?.images?.[0]}
                alt={booking.carDetails?.brand}
                className="w-full h-32 sm:h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="px-3 sm:px-4 py-3 sm:py-4">
                  <div className="flex justify-between items-start gap-3">
                      <div className="min-w-0 flex-1">
                  <p className="capitalize text-sm sm:text-base md:text-lg font-semibold truncate">
                    {booking.carDetails?.brand}, {booking.carDetails?.model}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Booked by:{" "}
                    <span className="text-gray-900 font-semibold capitalize">
                      {booking.name}
                    </span>
                  </p>
                </div>
                <div className="relative shrink-0">
                  <span
                    onClick={() => {
                      setBookingId(booking._id)

                      if (booking.status === "pending" || booking.status === "accepted") {
                        setStatusBookingId(
                          statusBookingId === booking._id
                            ? null
                            : booking._id
                        )
                      }
                    }}
                    className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium capitalize whitespace-nowrap ${
                      booking.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "completed"
                        ? "bg-green-200 text-green-700 border border-green-300"
                        : booking.status === "cancelled" ||
                          booking.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    } ${
                      booking.status === "pending"
                        ? "cursor-pointer"
                        : "cursor-default"
                    }`}
                  >
                    {booking.status}
                  </span>
                  {statusBookingId === booking._id && (
                    <div className="absolute right-0 top-full mt-1 w-20 sm:w-24 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                      <p
                        data-value="cancelled"
                        onClick={handleStaus}
                        className="px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        Cancel
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex flex-col gap-3">
                  <div>
                    <p className="text-[11px] sm:text-xs text-gray-500">
                      Pickup Date
                    </p>

                    <p className="text-xs sm:text-sm font-medium text-gray-800 mt-0.5">
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                  </div>

                <div className='flex justify-between'>
                  <div>
                    <p className="text-[11px] sm:text-xs text-gray-500">
                      Amount
                    </p>

                    <p className="text-sm sm:text-base mt-0.5">
                      <span className="text-lg sm:text-xl font-bold text-red-600">
                        ₹{booking.totalAmount}
                      </span>

                      <span className="text-[10px] sm:text-xs text-gray-700 ml-1">
                        / {booking.days}{" "}
                        {booking.days > 1 ? "days" : "day"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))
          ) :(
            <div className='w-full h-full flex justify-center pt-[30vh] col-span-2 md:col-span-3'>
              No Bookings, Book a Car
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Bookings
