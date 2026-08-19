import React,{ useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const HeroMain = ({bookCar, setBookCar}) => {
  const [cars, setCars] = useState([])
  const navigate = useNavigate()
  useEffect(() =>{
    const fetchCars = async () =>{
      try{
        const res = await axios.get(
          "https://renterr.onrender.com/api/car/allcars")
        if(res.data.success){
          const notBooked = res.data.cars.filter((item) => item.isBooked === false)
          setCars(notBooked)
          
        }
      }catch(err){
        console.log(err)
      }
    }
    fetchCars()
  }, [])

  return (
    <div className="p-6">
      <div 
      
      className="grid md:grid-cols-3 mb-8 lg:grid-cols-3 grid-cols-2 mt-15 md:mb-1 gap-6 overflow-x-auto scrollbar-none">
        {cars.map((car) => (
          <div
          key={car._id}
            className="bg-white rounded-2xl border justify-between flex flex-col  border-gray-200 overflow-hidden hover:-translate-y-1 transition-all duration-300">
            <img
              loading='lazy'
              src={car.images?.[0]}
              alt={car.brand}
              className="w-full md:h-52 h-30 object-cover hover:scale-105 transition-all duration-500"
            />
            <div className="px-4 py-2">
              <h2 className="capitalize md:text-xl text-sm font-bold">
                {car.brand} {car.model}
              </h2>

              <div className="text-[14px] md:space-y-1 text-gray-600">
                <p>
                   {car.gearType} • {car.engineType}
                </p>
                <p>
                   {car.seats} Seats
                </p>
              </div>

                <h3 className="text-2xl font-bold text-red-600">
                  ₹{car.pricePerDay}
                  <span className="text-sm text-gray-500">
                    /day
                  </span>
                </h3>
            </div>
                <button 
                onClick={()=>{ 
                  setBookCar(car._id)
                  navigate("/bookcar")
                }}
                className="px-4 py-2  bg-indigo-950 cursor-pointer text-white  hover:bg-indigo-900">
                  Book Car
                </button>
          </div>
        ))}
      </div>

      {cars.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No Cars Added Yet
        </div>
      )}
    </div>
  )
}

export default HeroMain
