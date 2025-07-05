import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast, Bounce } from "react-toastify"
import trainer from "../Trainerlogin/trainer.jpg"

const Trainerlogin = () => {
  const navigate = useNavigate()
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = "http://localhost:5000/trainer/login"
    await axios.post(url, {
      username, password
    }).then((res) => {
      if (localStorage.getItem("gymkey")) {
        localStorage.removeItem("gymkey")
      }
      if (localStorage.getItem("memberkey")) {
        localStorage.removeItem("memberkey")
      }
      localStorage.setItem("trainertoken", res.data.token)
      localStorage.setItem("trainerusername", username)
      navigate("/trainer/dashboard")
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
      <div className="flex flex-col md:flex-row w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden bg-gray-900/80 backdrop-blur-lg border border-gray-700 mt-10">
        {/* Image Section */}
        <div className="md:w-1/2 w-full h-56 md:h-auto relative">
          <img
            src={trainer}
            alt="Trainer Login Visual"
            className="w-full h-full object-cover object-center md:rounded-l-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:rounded-l-3xl" />
        </div>
        {/* Form Section */}
        <div className="md:w-1/2 w-full flex flex-col justify-center px-8 py-10 bg-gray-900/90">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-3xl font-extrabold text-indigo-400 text-center font-mono mb-2 tracking-tight">
              Trainer Login
            </h2>
            <div>
              <label className="block text-gray-300 font-mono mb-1" htmlFor="username">
                User Name
              </label>
              <input
                id="username"
                type="text"
                onChange={e => setusername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-400 via-blue-400 to-green-400 text-black font-bold text-lg shadow-lg hover:from-indigo-500 hover:to-green-500 transition-all duration-300 font-mono mt-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Trainerlogin