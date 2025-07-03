import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell } from 'lucide-react'
const Gymdashboard = () => {
  const URL = "http://localhost:5000/auth/getgym"
  const [gymdata,setgymdata] = useState({})
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
      <div className='grid w-full sm:grid-cols-1 py-5  px-5 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-5'>
            <div className='flex flex-col bg-amber-300 h-[200px] rounded-2xl'>
                        <div className='flex justify-center p-2'>
                              <h2>Total Members</h2>
                        </div>
                        <div className='flex justify-center items-center'>

                        </div>
            </div>
            <div className='flex flex-col bg-green-500 h-[200px] rounded-2xl'>
                        <div className='flex justify-center p-2'>
                              <h2>Total trainers</h2>
                        </div>
                        <div className='flex justify-center items-center'>

                        </div>
            </div>
            <div className='flex flex-col bg-red-500 h-[200px] rounded-2xl'>
                    <div className='flex justify-center p-2'>
                              <h2>Total revenue</h2>
                              <div className='flex justify-center items-center'>
                                  
                              </div>
                    </div>
            </div>
      </div>
    </div>
  )
}

export default Gymdashboard
