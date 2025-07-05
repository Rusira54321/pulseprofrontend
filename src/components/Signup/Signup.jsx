import React, { useState } from 'react'
import axios from "axios"
import { Bounce, toast } from "react-toastify"
import { Link } from "react-router-dom"
import loginimage from "./login1.jpg"

function Signup() {
  const URL = "http://localhost:5000/auth/addgym"
  const [gymname, setgymname] = useState('')
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(URL, {
      gymname: gymname,
      username: username,
      email: email,
      password: password
    }).then(() => {
      toast.success('Signup successful', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }).catch((error) => {
      toast.warn(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-2">
      <div className="flex flex-col md:flex-row w-full mt-20 max-w-3xl rounded-3xl shadow-2xl overflow-hidden bg-gray-900/80 backdrop-blur-lg border border-gray-700">
        {/* Image Section */}
        <div className="md:w-1/2 w-full h-56  md:h-auto relative">
          <img
            src={loginimage}
            alt="Signup Visual"
            className="w-full h-full object-cover object-center md:rounded-l-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:rounded-l-3xl" />
        </div>
        {/* Form Section */}
        <div className="md:w-1/2 w-full flex flex-col justify-center px-8 py-10 bg-gray-900/90">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-3xl font-extrabold text-green-400 text-center font-mono mb-2 tracking-tight">
              Create Your Gym Account
            </h2>
            <div>
              <label className="block text-gray-300 font-mono mb-1" htmlFor="gymname">
                Gym Name
              </label>
              <input
                id="gymname"
                type="text"
                onChange={e => setgymname(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 font-mono mb-1" htmlFor="username">
                User Name
              </label>
              <input
                id="username"
                type="text"
                onChange={e => setusername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 font-mono mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                onChange={e => setemail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 font-mono mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                onChange={e => setpassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 via-blue-400 to-indigo-400 text-black font-bold text-lg shadow-lg hover:from-green-500 hover:to-blue-500 transition-all duration-300 font-mono mt-2"
            >
              Sign Up
            </button>
            <div className="text-center text-gray-400 font-mono mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-green-400 hover:underline">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup