import React, { useEffect, useState } from 'react'
import axios from "axios"
import { motion } from 'framer-motion';

const MarkAttendance = () => {
  const URL = "http://localhost:5000/get/getmembers"
  const key = localStorage.getItem("gymkey")
  const [users, setusers] = useState([])
  const [attendanceStatus, setAttendanceStatus] = useState({}) // 👈 track each user's selected button

  useEffect(() => {
    const getusers = async () => {
      await axios.post(URL, {
        key: key
      }).then((res) => {
        console.log(res.data.member)
        setusers(res.data.member)
      })
    }
    getusers()
  }, [])
  useEffect(() => {
  console.log(attendanceStatus);
}, [attendanceStatus]);
  const handle = (userId, status) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [userId]: status
    }))
    
  }

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 }
    })
  }

  return (
    <div className='flex flex-col w-full min-h-screen bg-gray-800'>
      <div className='flex mt-8 justify-center'>
        <motion.h1 className='font-bold text-2xl text-white'
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}>Mark Attendance</motion.h1>
      </div>
      <div className='flex mt-5 justify-center'>
        <motion.table className='border-2 border-white w-3/4' initial="hidden" animate="visible" variants={tableVariants}>
          <thead>
            <tr>
              <th className='border-1 border-white text-white w-4/16'>id</th>
              <th className='border-1 border-white text-white w-3/16'>Member Name</th>
              <th className='border-1 border-white text-white w-3/16'>User name</th>
              <th className='border-1 border-white text-white w-6/16'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr key={user._id} custom={index} initial="hidden" animate="visible" variants={rowVariants}>
                <td className='border-1 border-white text-white w-4/16'>
                  <div className='flex justify-center'>{user._id}</div>
                </td>
                <td className='border-1 border-white text-white w-3/16'>
                  <div className='flex justify-center'>{user.name}</div>
                </td>
                <td className='border-1 border-white text-white w-3/16'>
                  <div className='flex justify-center'>{user.username}</div>
                </td>
                <td className='border-1 border-white text-white w-6/16'>
                  <div className='flex my-2 gap-x-6 justify-center'>
                    {/* Conditionally render only selected or all buttons */}
                    {attendanceStatus[user._id] === 'Present' &&
                      <motion.button className='border-1 px-2 border-green-400 bg-green-700 text-white'>Present</motion.button>}
                    {attendanceStatus[user._id] === 'Absent' &&
                      <motion.button className='border-1 px-2 border-red-400 bg-red-700 text-white'>Absent</motion.button>}
                    {attendanceStatus[user._id] === 'Sick' &&
                      <motion.button className='border-1 px-2 border-gray-400 bg-gray-700 text-white'>Sick</motion.button>}
                    {attendanceStatus[user._id] === 'Leave' &&
                      <motion.button className='border-1 px-2 border-yellow-400 bg-yellow-700 text-white'>Leave</motion.button>}

                    {!attendanceStatus[user._id] && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handle(user._id, 'Present')}
                          className='border-1 px-2 cursor-pointer border-green-400 bg-green-700 text-white'>Present</motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handle(user._id, 'Absent')}
                          className='border-1 px-2 cursor-pointer border-red-400 bg-red-700 text-white'>Absent</motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handle(user._id, 'Sick')}
                          className='border-1 px-2 cursor-pointer border-gray-400 bg-gray-700 text-white'>Sick</motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handle(user._id, 'Leave')}
                          className='border-1 px-2 cursor-pointer border-yellow-400 bg-yellow-700 text-white'>Leave</motion.button>
                      </>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  )
}

export default MarkAttendance
