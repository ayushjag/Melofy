import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'

const Navbar = () => {

  const navigate = useNavigate()
  const { token } = useContext(PlayerContext)

  return (
    <>
      {/* THIS IS NAVBAR */}
      <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex items-center gap-2'>
          <img onClick={() => navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="arrowLeft image" />
          <img onClick={() => navigate(1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="arrowRight image" />
        </div>
        <div className='flex items-center gap-4'>
        <a href="https://admin-melofy.vercel.app/" target="_blank" rel="noopener noreferrer" className='bg-black text-white text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-gray-800'>Admin Panel</a>

          <p onClick={() => navigate("/")} className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-gray-200'>Home</p>
          <p onClick={() => navigate("/Contact")} className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:bg-gray-800'>Contact Me</p>          <p onClick={() => navigate("/Signup")} className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-gray-200'>Sign Up</p>
          <p onClick={() => navigate("/Login")} className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:bg-gray-800'>Log In</p>
          {token ? (
            <p className='bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center'>A</p>
          ) : (
            <p className='bg-white text-black w-7 h-7 rounded-full flex items-center  hover:bg-gray-200 justify-center'>B</p>
          )}
        </div>
      </div>
      <div className='flex items-center gap-2 my-4'>
        <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-gray-200'>All</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-gray-800'>Music</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-gray-800'>Podcasts</p>
      </div>
    </>
  )
}

export default Navbar
