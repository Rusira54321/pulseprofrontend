import React, { useEffect, useState } from 'react'
import axios from "axios"
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'

const Members = () => {
  const URL = "http://localhost:5000/get/getmemberbyTrainer"
  const navigate = useNavigate()
  const [members, getmemberss] = useState([])
  const [message, setmessage] = useState("")
  const editmember = (id,gym) =>{
    const URL = `/trainer/memberUpdate/${id}/${gym}`
    navigate(URL)
  }
  useEffect(() => {
    const username = localStorage.getItem("trainerusername")
    const getmembers = async () => {
      await axios.post(URL, {
        "username": username
      }).then((res) => {
        getmemberss(res.data.members)
      }).catch((error) => {
        setmessage(error.response.data.message)
      })
    }
    getmembers()
  }, [])

  return (
    <div className='flex flex-col min-h-screen w-full bg-gray-800'>
      <div className='flex w-full mt-5 mb-10 justify-center'>
        <p className='text-4xl font-extrabold text-white tracking-wide'>Members</p>
      </div>
      <div className='flex h-full w-full'>
        <div className='grid  w-full mb-10 h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12'>
          {
            members.length !== 0 ? members.map((member, index) => (
              <motion.div
                key={member._id}
                className='bg-gradient-to-br ml-16 from-yellow-200 to-yellow-100 rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl'
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className='flex justify-center mt-6'>
                  <img
                    src={`http://localhost:5000/images/${member.profileimage}`}
                    alt={member.name}
                    className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg'
                  />
                </div>
                <div className='p-6 text-center'>
                  <p className='text-xl font-bold text-gray-900 mb-2'>{member.name}</p>
                  <p className='text-md text-gray-700 mb-1'>📏 Height: <span className="font-medium">{member.heightincm} cm</span></p>
                  <p className='text-md text-gray-700'>⚖️ Weight: <span className="font-medium">{member.weightinkg} kg</span></p>
                </div>
                <div>
                    <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={()=>{editmember(member._id,member.gym)}}
  className='mx-auto mb-4 block rounded-xl bg-amber-500 px-6 py-2 text-white font-semibold shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-all duration-300'
>
  Edit
</motion.button>
                </div>
              </motion.div>
            )) : (
              <motion.div
                className='col-span-full text-center  text-gray-400'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p>{message}</p>
              </motion.div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Members
