import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
const Trainerdashboard = () => {
  const [trainer,settrainer] = useState("")
  const [numberofmembers,setnumberofmembers] = useState(0)
  const [numberofclasses,setnumberofclasses] = useState(0)
  const URL = "http://localhost:5000/trainer/gettrainername"
  const numberofclassesurl = "http://localhost:5000/class/numberoftrainingsessions"
  const numberofmemberurl = "http://localhost:5000/get/getnumberofmembers"
  useEffect(()=>{
    const username = localStorage.getItem("trainerusername")
    const gettrainerdetails = async() =>{
        await axios.post(URL,{
          "username":username
        }).then((res)=>{
          settrainer(res.data.name)
        })
    }
    gettrainerdetails()
    const getnumberofmembers = async() =>{
      await axios.post(numberofmemberurl,{
        "username":username
      }).then((res)=>{
        setnumberofmembers(res.data.numberofmembers)
      })
    }
    getnumberofmembers()
    const getnumberofclasses = async(req,res) =>{
        await axios.post(numberofclassesurl,{
          "username":username
        }).then((res)=>{
          setnumberofclasses(res.data.numberofclasses)
        })
    }
    getnumberofclasses()
  },[])
  return (
    <div className='flex flex-col w-full min-h-screen  bg-gray-800'>
      <div className='flex justify-center mt-20 w-full'>
        <motion.h1
          className='text-3xl md:text-4xl font-extrabold drop-shadow-lg bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent px-4 py-2 rounded-lg text-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          {trainer && (
            <span className='mr-2'>👋</span>
          )}
          {trainer ? `Welcome, ${trainer}!` : 'Welcome!'}
        </motion.h1>
      </div>
      <div className='flex w-full justify-center mt-10'>
        <div className='grid gap-x-8 gap-y-8 w-full px-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center justify-center max-w-5xl'>
          <div className='bg-gradient-to-br from-green-300 via-emerald-400 to-green-500/90 flex min-w-[260px] min-h-[180px] w-full max-w-md mx-auto rounded-3xl shadow-2xl border border-green-200/40 backdrop-blur-md hover:scale-105 transition-transform duration-300'>
            <div className='flex flex-col w-full'>
              <div className='flex justify-center mt-8'>
                <h2 className='text-lg md:text-2xl font-bold text-gray-900 tracking-wide flex items-center gap-3'>
                  <span className="text-3xl md:text-4xl">👥</span> Total Members
                </h2>
              </div>
              <div className='flex justify-center mt-10'>
                <h3 className='text-3xl md:text-5xl font-extrabold text-green-800 drop-shadow-lg'>{numberofmembers}</h3>
              </div>
            </div>
          </div>
          <div className='bg-gradient-to-br from-pink-300 via-red-400 to-pink-500/90 flex min-w-[260px] min-h-[180px] w-full max-w-md mx-auto rounded-3xl shadow-2xl border border-pink-200/40 backdrop-blur-md hover:scale-105 transition-transform duration-300'>
            <div className='flex flex-col w-full'>
              <div className='flex justify-center mt-8'>
                <h2 className='text-lg md:text-2xl font-bold text-gray-900 tracking-wide flex items-center gap-3'>
                  <span className="text-3xl md:text-4xl">🏋️‍♂️</span> Total Training Sessions
                </h2>
              </div>
              <div className='flex justify-center mt-10'>
                <h3 className='text-3xl md:text-5xl font-extrabold text-red-800 drop-shadow-lg'>{numberofclasses}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-10'>
        <div className='grid w-full px-2 gap-x-6 gap-y-6 max-w-5xl sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
          >
            <Link to="/trainer/dashboard/workoutplan">
              <div className='flex flex-col items-center justify-center h-40 w-full max-w-xs mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-green-300 via-emerald-400 to-green-500/90 border border-green-200/40 backdrop-blur-md hover:shadow-green-400/40 transition-all duration-300'>
                <span className="text-3xl md:text-4xl mb-2">💪</span>
                <p className='text-base md:text-lg font-bold text-gray-900'>Create Workout Plan</p>
                <span className='text-xs md:text-sm text-gray-700 mt-1'>Design custom routines</span>
              </div>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
          >
            <Link to="/trainer/dashboard/dietplan">
              <div className='flex flex-col items-center justify-center h-40 w-full max-w-xs mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-400/90 border border-yellow-200/40 backdrop-blur-md hover:shadow-yellow-400/40 transition-all duration-300'>
                <span className="text-3xl md:text-4xl mb-2">🥗</span>
                <p className='text-base md:text-lg font-bold text-gray-900'>Create Diet Plan</p>
                <span className='text-xs md:text-sm text-gray-700 mt-1'>Personalize nutrition</span>
              </div>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
          >
            <Link to="/trainer/addtraining">
              <div className='flex flex-col items-center justify-center h-40 w-full max-w-xs mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-pink-300 via-red-400 to-pink-500/90 border border-pink-200/40 backdrop-blur-md hover:shadow-pink-400/40 transition-all duration-300'>
                <span className="text-3xl md:text-4xl mb-2">📅</span>
                <p className='text-base md:text-lg font-bold text-gray-900'>Create Training Session</p>
                <span className='text-xs md:text-sm text-gray-700 mt-1'>Schedule new classes</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Trainerdashboard
