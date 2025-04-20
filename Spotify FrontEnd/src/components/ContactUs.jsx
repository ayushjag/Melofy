import React from 'react';
import Navbar from './Navbar';
import { Mail, Linkedin, Twitter } from 'lucide-react';
import { assets } from '../assets/assets';

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="relative flex items-center justify-center h-screen">
        
        {/* Background Image */}
        <img 
          src={assets.Background} 
          alt="background" 
          className="absolute top-10 left-0 w-full h-full object-cover -z-10" 
        />

        {/* Content Card */}
        <div className="max-w-3xl bg-white rounded-2xl shadow-lg p-8 opacity-90 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Ayush Jagwan</h2>
          <div className="flex justify-center gap-6 mt-6">
            
            {/* Mail */}
            <a href="mailto:ayushjag30@gmail.com" target="_blank" rel="noopener noreferrer">
              <Mail className="w-7 h-7 text-gray-800 hover:text-blue-600 transition duration-200" />
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/ayush-jagwan6/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-7 h-7 text-gray-800 hover:text-blue-700 transition duration-200" />
            </a>

            {/* Twitter */}
            <a href="https://x.com/ayushjagwan6" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-7 h-7 text-gray-800 hover:text-sky-500 transition duration-200" />
            </a>

            {/* Leetcode */}
            <a href="https://leetcode.com/u/ayushjag30/" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://i0.wp.com/turingplanet.org/wp-content/uploads/2020/05/LeetCode_logo.png?resize=400%2C400&ssl=1" 
                alt="Leetcode" 
                className="w-7 h-7 hover:opacity-80 transition duration-200" 
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
