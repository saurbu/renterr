import React from "react"
import {
  IndianRupee,
  CalendarDays,
  ReceiptText
} from "lucide-react"

const Earning = ({ earning = [], totalErn = 0, bookings = [] }) => {
  const today = new Date()
    .toISOString()
    .split("T")[0]
  const todayEarning =
    earning.find(item => item.date === today)?.earning || 0
  return (
    <div className="w-full min-h-full bg-gray-50 p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-950">
          Earning Details
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          View your completed bookings and earnings
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold text-green-600 mt-1">₹{Number(totalErn).toLocaleString("en-IN")}</p>
            </div>
            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
              <IndianRupee />
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Today's Earnings</p>
              <p className="text-2xl font-bold text-indigo-600 mt-1">₹{Number(todayEarning).toLocaleString("en-IN")}</p>
            </div>
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <CalendarDays />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-gray-100 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <CalendarDays
                size={20}
                className="text-indigo-600"
              />
              <h2 className="text-lg font-bold text-indigo-950">Earnings by Date</h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">Total earnings for each completed date</p>
          </div>
          <div className="h-[400px] overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {earning.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400">No earnings available</div>
            ) : (
              earning.map((item) => {
                const date = new Date(item.date)
                const formattedDate =
                  date.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })
                const day =
                  date.toLocaleDateString("en-IN", {
                    weekday: "short"
                  })
                return (
                  <div
                    key={item.date}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-indigo-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600"><CalendarDays size={18} /></div>
                      <div>
                        <p className="font-semibold text-gray-800">{formattedDate}</p>
                        <p className="text-xs text-gray-500">{day}</p>
                      </div>
                    </div>
                    <p className="font-bold text-green-600">₹{Number(item.earning).toLocaleString("en-IN")}</p>
                  </div>
                )
              })
            )}
          </div>
        </div>

        <div className="bg-gray-100 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <ReceiptText
                size={20}
                className="text-green-600"
              />
              <h2 className="text-lg font-bold text-indigo-950">Completed Bookings</h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">Earnings from every completed booking</p>
          </div>

          <div className="h-[400px] overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {bookings.length === 0 ? (
              <h2 className="h-full flex items-center justify-center text-gray-400">No completed bookings</h2>
            ) : (
              bookings.map((booking) => {
                const completedDate =
                  new Date(booking.updatedAt)
                return (
                  <div
                    key={booking._id}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-green-50 transition"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <p className="font-semibold text-gray-800">{booking.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{booking.email}</p>
                      </div>
                      <p className="font-bold text-green-600 whitespace-nowrap">
                        ₹{Number(
                          booking.totalAmount || 0
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500">Completed</p>
                      <p className="text-xs font-medium text-gray-600">
                        {completedDate.toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          }
                        )}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Earning