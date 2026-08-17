import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Bookings = ({onBack}) => {
  const [cars, setCars] = useState([])
  const [view, setView] = useState(null)
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
        const data = new FormData()
  
        data.append("brand", formData.brand)
        data.append("model", formData.model)
        data.append("totalAmount", formData.pricePerDay)
  
        const res = await axios.post(
          "http://localhost:8000/api/user/bookcar",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: data,
          }
        );
  
        const result = await res.json();
  
        if (result.success) {
    
          setFormData({
            date: "",
            days: "",
            totalAmount: ""
          })
  
          onBack()
        } else {
          alert(result.message || "Failed to add car");
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
    <div>
      <div>

      </div>
      {view && (

        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 p-6 sm:p-8 text-center">
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
                    name="pricePerDay"
                    disabled
                    value={formData.totalAmount}
                    onChange={handleChange}
                    placeholder="totalAmount"
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

export default Bookings
