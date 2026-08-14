import React from 'react'
import HeroTop from './HeroTop'
import HeroMain from './Heromain'

const Hero = ({isLogin,setIsLogin}) => {
  return (
    <div className="w-full bg-white h-[97vh] md:h-full md:rounded-xl ">
      <HeroTop login={isLogin} setlogin={setIsLogin}/>
      <HeroMain />
    </div>
  )
}

export default Hero
