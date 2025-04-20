import React, { useContext, useEffect } from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from '../context/PlayerContext';
import axios from 'axios';
import Navbar from './Navbar'

const SignUp = () => {
  // const {url} = useContext(PlayerContext)
  const {token,setToken} = useContext(PlayerContext)
  const [currState,setCurrState] = useState("Login")
  // const [token, setToken] = useState("")
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event)=>{
    const name =  event.target.name
    const value =  event.target.value
    setData(data=>({...data,[name]:value}))
  }
  // useEffect(() => {
  //   console.log(data);
  // }, [data])

  const navigate = useNavigate();
  const onSignUp = async (event) => {
    event.preventDefault();
  
    const newUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user/register`;
  
    try {
      const response = await axios.post(newUrl, data);
  
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        console.log("Token created");
        navigate("/");
      } else {
        alert(response.data.message);
        console.log("Token not created");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  
  // USE-EFFECT TO SET TOKEN
  useEffect(() => {
    if (token) {
      console.log("This is token from state:", token);
    }
  }, [token]);
  return (
    <>
    
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#242424] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up for Your App</h2>
        <form onSubmit={onSignUp} className="space-y-4">
          <div>
            <label className="block text-gray-300">Name</label>
            <input
            name = 'name'
              type="text"
              className="w-full p-2 rounded bg-[#121212] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300">Email</label>
            <input
            name = 'email'
              type="email"
              className="w-full p-2 rounded bg-[#121212] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={data.email}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300">Password</label>
            <input
            name = 'password'
              type="password"
              className="w-full p-2 rounded bg-[#121212] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={data.password}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300">Confirm Password</label>
            <input
            name = 'password'
              type="password"
              className="w-full p-2 rounded bg-[#121212] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={data.password}
              onChange={onChangeHandler}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
    </>
  )
}

export default SignUp
