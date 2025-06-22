import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

const SeeAttendance = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const customFormat = `${day}-${month}-${year}`;

  const [attendance, setattendance] = useState([])
  const [date, setdate] = useState(customFormat)
  const [error, seterror] = useState("")
  const URL = "http://localhost:5000/Attendance/getAttendance"

  const previousAttendance = () => {
    const [day, month, year] = date.split("-").map(Number);
    const prevDate = new Date(year, month - 1, day - 1);
    const newDay = String(prevDate.getDate()).padStart(2, '0');
    const newMonth = String(prevDate.getMonth() + 1).padStart(2, '0');
    const newYear = prevDate.getFullYear();
    const newFormattedDate = `${newDay}-${newMonth}-${newYear}`;
    setdate(newFormattedDate);
  }

  const nextAttendance = () => {
    const [day, month, year] = date.split("-").map(Number);
    const nextDate = new Date(year, month - 1, day + 1);
    const todayDate = new Date();

    // Prevent selecting a future date
    if (nextDate <= todayDate) {
      const newDay = String(nextDate.getDate()).padStart(2, '0');
      const newMonth = String(nextDate.getMonth() + 1).padStart(2, '0');
      const newYear = nextDate.getFullYear();
      const newFormattedDate = `${newDay}-${newMonth}-${newYear}`;
      setdate(newFormattedDate);
    }
  }

  useEffect(() => {
    const getAttendance = async () => {
      await axios.post(URL, {
        "day": date
      }).then((res) => {
        setattendance(res.data.Attendance)
        seterror("")
      }).catch((error) => {
        seterror(error.response?.data?.message || "Attendance not found.")
        setattendance([])
      })
    }
    getAttendance()
  }, [date])

  return (
    <div className='flex justify-center w-full min-h-screen bg-gray-800 px-4'>
      <div className='flex w-full max-w-5xl flex-col mt-20 gap-x-5 gap-y-5 items-center bg-gray-900 p-6 rounded-lg shadow-lg'>
        
        {/* Date Navigation */}
        <motion.div
          className='flex items-center w-full md:w-2/3 justify-between relative'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={previousAttendance}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className='cursor-pointer border-2 rounded-full p-2 transition-all duration-300 hover:bg-green-400'
          >
            <ChevronLeft className='text-white' />
          </motion.button>

          <p className='text-white text-2xl font-semibold'>{date}</p>

          <motion.button
            onClick={nextAttendance}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className='cursor-pointer border-2 rounded-full p-2 transition-all duration-300 hover:bg-green-400'
          >
            <ChevronRight className='text-white' />
          </motion.button>
        </motion.div>

        {/* Attendance Table */}
        <motion.table
          className='w-full md:w-2/3 border-2 border-green-500 rounded-lg overflow-hidden shadow-md'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <thead>
            <tr className='bg-green-400 text-white'>
              <th className='border border-green-500 px-4 py-2'>Member Name</th>
              <th className='border border-green-500 px-4 py-2'>Member Username</th>
              <th className='border border-green-500 px-4 py-2'>Attendance Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length !== 0 ? attendance.map((attendances, index) => (
              <motion.tr
                key={attendances._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-green-100 transition-colors"
              >
                <td>
                  <div className='flex justify-center border border-green-500 bg-green-100 px-4 py-2 text-gray-800'>
                    {attendances.Membername}
                  </div>
                </td>
                <td>
                  <div className='flex justify-center border border-green-500 bg-green-100 px-4 py-2 text-gray-800'>
                    {attendances.Username}
                  </div>
                </td>
                <td>
                  <div className='flex justify-center border border-green-500 bg-green-100 px-4 py-2 text-gray-800'>
                    {attendances.Attendance_Status}
                  </div>
                </td>
              </motion.tr>
            )) : (
              <tr>
                <td colSpan="3">
                  <div className="text-center text-red-400 font-semibold py-4">{error}</div>
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
      </div>
    </div>
  )
}

export default SeeAttendance
