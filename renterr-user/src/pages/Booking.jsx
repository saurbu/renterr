import axios from 'axios'
import React from 'react'
import { TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { useEffect } from 'react'

const Booking = ({bookCar, setBookCar}) => {
  const [cars, setCars] = useState([])
  const [view, setView] = useState(null)
  const [image, setImage] = useState("")
  const [formData, setFormData] = useState({
      date: "",
      days: "",
      totalAmount: ""
    })
    
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const token = localStorage.getItem("token")
        const selectedCar = cars[0]   
        const total = selectedCar.pricePerDay * Number(formData.days)
        
        const res = await axios.post(
          "http://localhost:8000/api/user/bookcar",
          {
            carId: bookCar,
            date: formData.date,
            days: Number(formData.days),
            totalAmount: total
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if(res.data.success) {
    
          setFormData({
            date: "",
            days: "",
            totalAmount: ""
          })
          setView(false)
  
        } else {
          console.log("booking failed");
          
        }
          }catch (error) {
            console.log(error);
            alert("something was wrong")  
          }
    }
    
  useEffect(() =>{
    const fetchCars = async () =>{
      try{
        const res = await axios.get(
          "http://localhost:8000/api/car/allcars")
        if(res.data.success){
          const selectCar = res.data.cars.filter((item) => item._id === bookCar)
          setCars(selectCar)
          if (selectCar.length > 0 && selectCar[0].images?.length > 0) {
            setImage(selectCar[0].images[0])
          }
          
        }
      }catch(err){
        console.log(err)
      }
    }
    fetchCars()
  }, [bookCar])

  return (
    <div>
      <div>
        {cars.map((car) => (
          <div
          key={car._id}
          className='p-5'
          >
            <div className='grid md:grid-cols-5'>
              <div className='col-span-3'>
                <img
                loading='lazy'
                src={image}
                alt={car.brand}
                className="md:w-full  md:h-[60vh] h-50 w-full object-cover rounded-3xl transition-all duration-500"
                />
                <div className="flex md:gap-3 gap-1 mt-4 overflow-x-auto">
                  {car.images?.map((img, index) => (
                    <img
                    loading='lazy'
                    src={img}
                    key={index}
                    alt={`${car.brand}-${index}`}
                    onClick={()=> setImage(img)}
                    className={`w-20 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                      image === img
                        ? "border-indigo-950"
                        : "border-transparent"
                    }`}
                    />
                  ))}
                </div>
                
              </div>
                  <div 
                  className="md:p-5 md:px-10 col-span-2">
                    <h2 className="capitalize md:text-3xl text-2xl font-bold">
                      {car.brand}, {car.model}
                    </h2>

                    <div className="text-[18px] md:space-y-1 text-gray-600">
                      <p>
                        {car.gearType} • {car.engineType}
                      </p>
                      <p>
                        {car.seats} Seats
                      </p>
                    </div>

                    <div className=" ">
                      <h3 className="text-3xl font-bold text-red-600">
                        ₹{car.pricePerDay}
                        <span className="text-sm text-gray-500">
                          /day
                        </span>
                      </h3>

                    </div>
                    <div className="my-3 h-fit rounded-2xl bg-amber-50 p-4 shadow-[0_0_10px_rgba(0,0,0,0.3)] shadow-amber-700">
                      <p className="flex items-center gap-2 text-xl font-semibold text-amber-500">
                        <TriangleAlert size={20} />
                        Note
                      </p>

                      <div className="mt-2 space-y-1 text-sm md:text-base text-gray-700">
                        <p>
                          • Take pictures of the car from all angles, including the interior,
                          before pickup.
                        </p>

                        <p>
                          • If you find any dents, scratches, or other issues with the car,
                          inform the dealer before pickup.
                        </p>

                        <p>
                          • Carry the required vehicle documents during pickup, such as the
                          Pollution Certificate, Insurance, RC, and Driving License.
                        </p>

                        <p>
                          • Only the person who made the booking can pick up the car and must
                          provide the original ID proof for verification. The car will not be
                          handed over to anyone else.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={()=> setView(true)}
                      className="px-4 py-2 w-full rounded-3xl  bg-indigo-950 cursor-pointer text-white  hover:bg-indigo-900">
                        Book Now
                      </button>
                  </div>
              </div>
          </div>
        ))}
      </div>
      {view && (

        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 p-6 sm:p-8 text-center">
              <p className='font-semibold text-2xl'>Fill the details</p>
            <div className="mt-7 flex flex-col-reverse sm:flex-row gap-3 justify-center">
              <form
                onSubmit={handleSubmit}
              >
                <div className="bg-gray-50 rounded-xl p-5">
                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder=""
                    className="border p-3 rounded-lg"
                    required
                  />
                  <input
                    type="number"
                    name="days"
                    value={formData.days}
                    onChange={handleChange}
                    placeholder="Days"
                    className="border p-3 rounded-lg"
                    required
                  />

                  <input
                    type="text"
                    name="totalAmount"
                    disabled
                    value={cars[0]
                    ? cars[0].pricePerDay * Number(formData.days || 0)
                    : ""}
                    onChange={handleChange}
                    placeholder="Total Amount"
                    className="border p-3 rounded-lg"
                    required
                  />
                </div>
                </div>
                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={()=> setView(false)}
                    className="px-6 py-3 rounded-lg border cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-red-500 text-white cursor-pointer"
                  >
                    Book Car
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Booking
