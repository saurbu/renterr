import React from 'react'
import Hero from '../components/rightcard/Hero'
import Navbar from '../components/leftcard/Navbar'

const Home = ({login,setlogin,  sideOpen, setSideOpen}) => {
  
  return (
    <div className='w-full md:py-3'>
      <Hero login={login} setlogin={setlogin} sideOpen={sideOpen} setSideOpen={setSideOpen}/>

    </div>
  )
}

export default Home
