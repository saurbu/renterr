import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"

const Complete = () => {
  const [licencePreview, setLicencePreview] = useState(null)
  const navigate = useNavigate()
  const [cmpData, setCmpData] = useState({
    name: "",
    number: "",
    licenceNumber: "",
    licencePhoto: null
  })
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCmpData({
      ...cmpData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) =>{
    e.preventDefault()

    try{

      const token = localStorage.getItem('token')
      const formData = new FormData()

      formData.append("name", cmpData.name)
      formData.append("number", cmpData.number)
      formData.append("licenceNumber", cmpData.licenceNumber)
      formData.append("licencePhoto", cmpData.licencePhoto)
      const res = await axios.put("http://localhost:8000/api/user/profilecomplete",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if(res.data.success){
        localStorage.setItem("loggedInUser", JSON.stringify(res.data.user))
        navigate('/')
      }else{
        console.log("profile complition failed");
        
      }
    }catch(err){
      console.log(err);
      
    }
  }

  return (
    <div className='w-full flex justify-center items-center h-screen '>
      <div className='w-full h-fit bg-white/85 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.8)] p-5'>
        <div className=' pb-5'>
          <h2 className='font-bold text-indigo-950 md:text-3xl text-2xl'>Complete Your Profile</h2>
        </div>
        <form 
        onSubmit={handleSubmit}
        className='flex flex-col  gap-3'>
          <label className='font-semibold text-lg'>Full Name</label>
          <input 
          required
          onChange={handleChange}
          placeholder='saurav sharma'
          className='capitalize bg-indigo-950/30 w-full h-10 rounded-xl px-2 outline-none focus:border-2 flex items-center border-indigo-950'
          type="text"
          name='name' 
          value={cmpData.name}
          />
          <label className="text-lg font-semibold">Mobile Number</label>
          <input 
          onChange={handleChange}
          required
          placeholder='9874563219'
          className='capitalize bg-indigo-950/30 w-full h-10 rounded-xl px-2 outline-none focus:border-2 flex items-center border-indigo-950'
          type="tel"
          maxLength={10}
          name='number' 
          value={cmpData.number}
          />
          <label className="text-lg font-semibold">Licence Number</label>
          <input 
          onChange={handleChange}
          required
          maxLength={15}
          placeholder='DL0220261548963'
          className='uppercase bg-indigo-950/30 w-full h-10 rounded-xl px-2 outline-none focus:border-2 flex items-center border-indigo-950'
          type="text"
          name='licenceNumber' 
          value={cmpData.licenceNumber}
          />
          <label className="text-lg font-semibold">
            Driving Licence
          </label>
          <div className="flex gap-4 items-center w-full">
            <div className="flex-1">
              <label
                htmlFor="licencePhoto"
                className="flex flex-col justify-center items-center w-full h-32 rounded-xl border-2 border-dashed border-indigo-950/50 bg-indigo-950/10 cursor-pointer hover:bg-indigo-950/20 transition"
              >
                <span className="text-indigo-950 font-semibold">
                  Choose Licence Photo
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  JPEG, JPG, WEBP
                </span>
                <input
                  id="licencePhoto"
                  required
                  type="file"
                  name="licencePhoto"
                  accept=".jpeg,.jpg,.webp,image/jpeg,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    setCmpData({
                      ...cmpData,
                      licencePhoto: file,
                    })
                    setLicencePreview(URL.createObjectURL(file))
                  }}
                  className="hidden"
                />
              </label>
            </div>
            <div className="w-32 h-32 rounded-xl border-2 border-indigo-950/30 bg-gray-100 overflow-hidden flex items-center justify-center">
              {licencePreview ? (
                <img
                  src={licencePreview}
                  alt="Licence Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400 text-center px-2">
                  Preview
                </span>
              )}

            </div>
          </div>
          <button className='bg-blue-600 p-2 rounded-xl cursor-pointer font-semibold text-white'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Complete
