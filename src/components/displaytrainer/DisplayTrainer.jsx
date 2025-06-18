import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast, Bounce } from "react-toastify"
import { motion } from "framer-motion"

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: 5, scale: 0.9 },
  visible: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.05, rotate: 2, boxShadow: "0 15px 25px rgba(72, 211, 153, 0.7)" },
}

const DisplayTrainer = () => {
  const [trainers, settrainers] = useState([])
  const [searchTerm, setsearchTerm] = useState("")
  const url = "http://localhost:5000/trainer/deletetrainer"

  const handledelete = async (id, username) => {
    await axios.post(url, {
      "id": id,
      "username": username
    }).then((res) => {
      toast.success(res.data.message, {
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
      settrainers(prevtrainer => prevtrainer.filter(trainer => trainer._id !== id))
    }).catch((error) => {
      alert(error)
    })
  }

  useEffect(() => {
    const key = localStorage.getItem("gymkey")
    const URL = "http://localhost:5000/trainer/gettrainer"
    const gettrainerdata = async () => {
      await axios.post(URL, {
        "key": key
      }).then((res) => {
        settrainers(res.data.trainers)
      }).catch((error) => {
        alert(error)
      })
    }
    gettrainerdata()
  }, [])

  const filteredtrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='flex-col w-full min-h-full bg-gray-800'>
      <div className='flex justify-center '>
        <h1 className='text-white mt-5 font-bold text-4xl'>Trainers</h1>
      </div>
      <div className='flex mt-10 h-30 justify-center w-full'>
        <input type='text' value={searchTerm} onChange={(e) => { setsearchTerm(e.target.value) }} className='w-1/2 h-1/2 border-2 border-b-black rounded-bl-xl p-2 text-amber-100' placeholder='Search member'></input>
      </div>
      <div className='flex h-full w-full'>
        <div className='grid ml-16 w-full mb-10 h-full grid-cols-3 gap-x-10 gap-y-12'>
          {
            filteredtrainers.length !== 0 && filteredtrainers.map((trainer) => (
              <motion.div
                key={trainer._id}
                className='flex-col bg-gray-700 w-72 h-96 rounded-tl-3xl rounded-br-3xl rounded-tr-xl rounded-bl-xl
                           border-4 border-green-400 shadow-lg'
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <div className='flex mt-3 text-green-400 font-bold text-2xl justify-center'>
                  <p className='font-serif'>{trainer.name}</p>
                </div>
                <div className='flex mt-4 justify-center relative'>
                  <div className="absolute w-[130px] h-[130px] rounded-full bg-green-400 blur-xl opacity-40 -top-2 -left-3"></div>
                  <img src={`http://localhost:5000/images/${trainer.profileimage}`} className='w-[130px] h-[130px] rounded-full object-cover bg-green-100 transition-transform duration-300 hover:scale-110 z-10'></img>
                </div>
                <div className='flex mt-4 text-green-400 font-semibold text-lg justify-center'>
                  <p className='font-serif'>Gender : {trainer.gender}</p>
                </div>
                <div className='flex mt-3 text-green-400 font-semibold text-lg justify-center'>
                  <p className='font-serif'>No of students : {trainer.noOfstudents}</p>
                </div>
                <div className='flex mt-3 text-green-400 font-semibold text-lg justify-center'>
                  <p className='font-serif'>Phone : {trainer.phone}</p>
                </div>
                
                <div className='flex mt-4 justify-center gap-3'>
                  <button onClick={() => {
                    handledelete(trainer._id, trainer.username)
                  }} className="px-5 py-2 cursor-pointer bg-rose-600 text-white rounded-md shadow hover:bg-rose-700 hover:scale-110 transition-all duration-300 ease-in-out">Delete</button>
                  <button className="px-5 py-2 cursor-pointer bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 hover:scale-110 transition-all duration-300 ease-in-out">Edit</button>
                </div>
              </motion.div>
            ))
          }
           {filteredtrainers.length === 0 && (
          <p className="col-span-full text-center text-gray-400">No Trainers found</p>
        )}
        </div>
      </div>
    </div>
  )
}

export default DisplayTrainer
