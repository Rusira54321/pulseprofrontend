import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell } from 'lucide-react'
import MonthlyRevenueChart from '../charts/MonthlyRevenueChart'
import MonthlyAttendanceChart from '../charts/MonthlyAttendanceChart '
const Gymdashboard = () => {
  const numberofmemberURL = "http://localhost:5000/auth/sumtotalmembers"
  const URL = "http://localhost:5000/auth/getgym"
  const revenueURL = "http://localhost:5000/auth/totalrevenue"
  const numberofTrainerURL = "http://localhost:5000/auth/sumtotaltrainers"
  const [numberofMembers,setNumberofmembers] = useState()
  const [totalrevenue,settotalrevenue] = useState()
  const [gymdata,setgymdata] = useState({})
  const [numberofTrainers,setnumberOfTrainers] = useState()
  useEffect(()=>{
    const gymkey = localStorage.getItem("gymkey")
    const getgymdata = async() =>{
        await axios.post(URL,{
          "key":gymkey
        }).then((res)=>{
          setgymdata(res.data.gym)
        })
    }
    getgymdata()
    const getnumberofmembers = async() =>{
        await axios.post(numberofmemberURL,{
          "key":gymkey
        }).then((res)=>{
            setNumberofmembers(res.data.numberofmembers)
        }).catch((error)=>{
          console.log(error)
        })
    }
    getnumberofmembers()
    const getnumberofTrainers = async() =>{
      await axios.post(numberofTrainerURL,{
        "key":gymkey
      }).then((res)=>{
          setnumberOfTrainers(res.data.numberoftrainers)
      }).catch((error)=>{
        console.log(error)
      })
    }
    getnumberofTrainers()
    const gettotalrevenue = async() =>{
        await axios.post(revenueURL,{
          "key":gymkey
        }).then((res)=>{
            settotalrevenue(res.data.totalrevenue)
        }).catch((error)=>{
          console.log(error)
        })
    }
    gettotalrevenue()
  },[])
  return (
    <div className='flex flex-col w-full min-h-screen bg-gray-800 items-center'>
      <div className='flex flex-row items-center justify-center w-full mt-10 mb-8'>
        <motion.h1
          className='flex items-center gap-4 text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg bg-gradient-to-r from-amber-400 via-yellow-200 to-white bg-clip-text'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.span
            initial={{ rotate: -20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 180 }}
            className='flex items-center justify-center bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full p-3 shadow-lg'
          >
            <Dumbbell className='w-12 h-12 text-white drop-shadow-lg' />
          </motion.span>
          {gymdata.gymname}
        </motion.h1>
      </div>
      <div className='grid w-full sm:grid-cols-1 py-5 px-5 md:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-8'>
        <motion.div
          className='flex flex-col bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 h-[200px] rounded-2xl shadow-xl border-2 border-amber-300 hover:scale-105 transition-transform duration-300'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
        >
          <div className='flex justify-center p-4'>
            <h2 className='text-xl font-bold text-amber-900 tracking-wide'>Total Members</h2>
          </div>
          <div className='flex flex-1 justify-center items-center'>
            <span className='text-4xl font-extrabold text-amber-700 drop-shadow-lg'>{numberofMembers}</span>
          </div>
        </motion.div>
        <motion.div
          className='flex flex-col bg-gradient-to-br from-green-200 via-green-400 to-emerald-400 h-[200px] rounded-2xl shadow-xl border-2 border-green-300 hover:scale-105 transition-transform duration-300'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
        >
          <div className='flex justify-center p-4'>
            <h2 className='text-xl font-bold text-green-900 tracking-wide'>Total Trainers</h2>
          </div>
          <div className='flex flex-1 justify-center items-center'>
            <span className='text-4xl font-extrabold text-green-700 drop-shadow-lg'>{numberofTrainers}</span>
          </div>
        </motion.div>
        <motion.div
          className='flex flex-col bg-gradient-to-br from-red-200 via-red-400 to-pink-400 h-[200px] rounded-2xl shadow-xl border-2 border-red-300 hover:scale-105 transition-transform duration-300'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
        >
          <div className='flex justify-center p-4'>
            <h2 className='text-xl font-bold text-red-900 tracking-wide'>Total Revenue</h2>
          </div>
          <div className='flex flex-1 justify-center items-center'>
            <span className='text-3xl font-extrabold text-red-700 drop-shadow-lg'>Rs {totalrevenue}</span>
          </div>
        </motion.div>
      </div>
      <div className="w-full mb-5 max-w-5xl mx-auto mt-8 px-2">
        <MonthlyRevenueChart />
      </div>
      <div className="w-full max-w-6xl mx-auto mt-8 px-2 mb-5">
        <MonthlyAttendanceChart />
      </div>
    </div>
  )
}

export default Gymdashboard
