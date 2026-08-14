import React from 'react'
import Hero from '../components/rightcard/Hero'
import Navbar from '../components/leftcard/Navbar'

const Home = ({isLogin,setIsLogin}) => {
  return (
    <div className='w-full md:py-3'>
      <Hero login={isLogin} setlogin={setIsLogin}/>

    </div>
  )
}

export default Home
