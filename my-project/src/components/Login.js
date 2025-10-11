import React, { useState } from 'react';
import Header from './Header';

const Login = () => {
  const [logged,setLogged]=useState(true);
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <img
        src="/background.jpg"
        alt="Background"
        className="absolute w-full h-full object-cover z-0"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Header */}
      <Header />

      {/* Centered Login Form */}
      <div className="absolute inset-0 flex justify-center items-center z-20 px-4">
        <div className="w-10/12 sm:w-8/12 md:w-5/12 lg:w-3/12 p-6 sm:p-8 bg-black/80 rounded  text-white font-sans">
          <h1 className="text-2xl sm:text-3xl font-bold  mb-6">
            {logged?"Sign In":"Sign Up"}
          </h1>

          <form className="flex flex-col  gap-3">
            {logged&&<input
              type="name"
              placeholder="Name"
              className="w-full p-2 sm:p-3 border border-white/40 bg-gray-800/50 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-white"
            />}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 sm:p-3 border border-white/40 bg-gray-800/50 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-white"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 sm:p-3 border border-white/40 bg-gray-800/50 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-white"
            />
            <button className="w-full p-2 sm:p-3 bg-[#E50914] rounded font-bold hover:bg-red-700 transition-colors mt-4">
              Sign In
            </button>

            <p className="text-xs sm:text-sm text-[#B4B3B3] mt-4 ">
              {logged?"New to Netflix? ":"Already a user? "}
              <span className="text-white font-bold cursor-pointer" onClick={()=>setLogged(!logged)}>
                {logged?"Sign up now.":"Sign in now."}
              </span>
            </p>
            <p className="text-xs sm:text-sm text-[#B4B3B3] mt-2 ">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
