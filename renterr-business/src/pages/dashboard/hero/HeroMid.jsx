import React, { useEffect, useState } from "react";
import { CarFront, BookCheck, IndianRupee, Clock3 } from "lucide-react";
import axios from "axios";

const HeroMid = ({totalErn}) => {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([])
  const [pending, setPending] = useState([])

    

    const getCars = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await axios.get("http://localhost:8000/api/car/mycars", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setCars(res.data.cars);
        }
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    const getBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await axios.get("http://localhost:8000/api/car/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setBookings(res.data.bookings);
        }
        if (res.data.success) {
        const pending = res.data.bookings.filter((item) => item.status === "pending")
          setPending(pending)
        }
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };
  useEffect(() => {
        getCars()
        getBookings()
  }, [])



  const stats = [
    {
      title: "Total Cars",
      value: cars.length,
      icon: CarFront,
    },
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: BookCheck,
    },
    {
      title: "Total Earning",
      value: totalErn,
      icon: IndianRupee,
    },
    {
      title: "Pending Request",
      value: pending.length,
      icon: Clock3,
    },
  ];

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:pr-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div key={index} className="bg-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 shrink-0" />

                <h1 className="text-xs sm:text-sm md:text-lg font-semibold truncate">
                  {stat.title}
                </h1>
              </div>

              <h1 className="mt-2 px-1 sm:px-2 sm:text-4xl max-text-5xl font-semibold truncate">
                {stat.value}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroMid;