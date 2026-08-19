import React from 'react'
import HeroTop from './HeroTop'
import HeroMain from './Heromain'

const Hero = ({login,setlogin, sideOpen, setSideOpen, bookCar, setBookCar}) => {
  return (
    <div className="w-full bg-white h-[97vh] md:h-full md:rounded-xl ">
      <HeroTop login={login} setlogin={setlogin} sideOpen={sideOpen} setSideOpen={setSideOpen}/>
      <HeroMain bookCar={bookCar} setBookCar={setBookCar}/> 
    </div>
  )
}

export default Hero
