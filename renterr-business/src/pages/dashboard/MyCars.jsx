import React,{ useEffect, useState} from 'react'
import axios from 'axios'

const MyCars = () => {
  const [cars, setCars] = useState([])
  const [deleteCars, setDeleteCars] = useState(null)

  useEffect(() =>{
    fetchCars()
  }, [])

  const fetchCars = async () =>{
    try{
      const token = localStorage.getItem("token")

      const res = await axios.get(
        "http://localhost:8000/api/car/mycars",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if(res.data.success){
        setCars(res.data.cars);
      }

    }catch(err){
      console.log(err);
      
    }
  }

  const removeCar = async () => {
    if(!deleteCars) return

    try{
      const token = localStorage.getItem('token')

      const res = await axios.delete(`http://localhost:8000/api/car/mycars/${deleteCars}`,
        {
          headers:{
            Authorization : `Bearer ${token}`
          }
        }
      )

      if(res.data.success){
        setCars((prevCars) => prevCars.filter((car) => car._id !== deleteCars))
      }else {
        console.log(`error ${res.data.message}`);
        
      }
      window.location.reload()
    }catch(err){
      console.log(`error: ${err}`);
      

    } finally {
      setDeleteCars(null)
    }

  }

  return (
    <div className="p-6  mb-5">
      <h1 className="text-3xl font-bold mb-6">
        My Cars
      </h1>

      <div 
      className="grid md:grid-cols-3 mb-8 lg:grid-cols-3 grid-cols-2 mt-10 md:mb-1 gap-6 overflow-x-auto scrollbar-none">
        {cars.map((car) => (
          <div
          key={cars._id}
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

              <div className=" flex flex-row flex-wrap md:justify-between justify-center items-center ">
                <h3 className="text-2xl font-bold text-red-600">
                  ₹{car.pricePerDay}
                  <span className="text-sm text-gray-500">
                    /day
                  </span>
                </h3>

                </div>
            </div>
                <button 
                onClick={()=> setDeleteCars(car._id)}
                className=" py-2 w-full bg-indigo-950 cursor-pointer text-white  hover:bg-indigo-900">
                  Remove Car
                </button>
          </div>
        ))}
      </div>

      {cars.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No Cars Added Yet
        </div>
      )}

      {deleteCars && (

        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Remove Car?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Are you sure you want to remove this car?
            </p>
            <div className="mt-7 flex flex-col-reverse sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setDeleteCars(null)}
                className="w-full sm:w-auto cursor-pointer rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={removeCar}
                className="w-full sm:w-auto cursor-pointer rounded-lg bg-red-500 px-6 py-2.5 font-semibold text-white transition hover:bg-red-600 active:scale-95"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyCars
