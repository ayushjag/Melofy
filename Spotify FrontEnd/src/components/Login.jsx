import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PlayerContext } from '../context/PlayerContext';
import Navbar from './Navbar'
import axios from 'axios';

const Login = () => {
  const {setToken} = useContext(PlayerContext)
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

  const navigate = useNavigate();
  const onLogin = async (event) => {
    event.preventDefault();
    
    // Construct the full URL dynamically using process.env.BACKEND_URL
    const newUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user/login`; // use the React-specific env variable
  
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
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  
  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   // You can replace this with real backend call
  //   const fakeToken = "123abc";
  //   localStorage.setItem("token", fakeToken);

  //   // After login, redirect to main web player ("/")
  //   navigate("/");
  // };

  return (
    <>
    <Navbar/>
      <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#242424] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Log in to Spotify
        </h2>
        <form onSubmit={onLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email or username
            </label>
            <input
            name = 'email'
              type="email"
              id="email"
              placeholder="Email or username"
              value={data.email}
              onChange={onChangeHandler}
              className="mt-1 block w-full px-4 py-2 bg-[#121212] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
            name = 'password'
              type="password"
              id="password"
              placeholder="Password"
              value={data.password}
              onChange={onChangeHandler}
              className="mt-1 block w-full px-4 py-2 bg-[#121212] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="/signup" className="text-green-500 hover:underline">
            Sign up for Spotify
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
