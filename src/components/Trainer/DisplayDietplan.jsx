import React, { useEffect, useState } from 'react'
import axios from "axios"
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const DisplayDietplan = () => {
  const URL = "http://localhost:5000/diet/getdietplan"
  const DELETE_URL = "http://localhost:5000/diet/deletedietplan"
  const [plans, setPlans] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const trainerusername = localStorage.getItem("trainerusername")
    const getPlans = async () => {
      try {
        const res = await axios.post(URL, { trainerusername })
        setPlans(res.data.plans)
      } catch (error) {
        console.error("Error fetching diet plans:", error)
      }
    }
    getPlans()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${DELETE_URL}/${id}`)
      setPlans(plans.filter(plan => plan._id !== id))
    } catch (error) {
      console.error("Error deleting diet plan:", error)
    }
  }

  const handleEdit = (plan) => {
    const id = plan._id
    navigate(`/trainer/updatedietplan/${id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='flex flex-col w-full min-h-screen bg-gray-800 px-6 py-10'
    >
      <motion.h2
        className='text-white text-3xl font-bold mb-10 text-center tracking-wide'
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        🥗 Diet Plans Overview
      </motion.h2>

      {plans.length === 0 ? (
        <p className='text-center text-gray-300 text-md mt-2'>
           No diet plans found
        </p>
      ) : (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className='bg-gray-700 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-600'
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <h3 className='text-2xl font-bold mb-2 text-teal-300'>{plan.memberUsername}</h3>
              <p className='text-sm text-gray-300 mb-1'><span className='font-semibold text-gray-200'>🎯 Goal:</span> {plan.goal}</p>
              <p className='text-sm text-gray-300 mb-1'><span className='font-semibold text-gray-200'>📅 Duration:</span> {plan.duration} weeks</p>
              <p className='text-sm text-gray-300 mb-1'><span className='font-semibold text-gray-200'>🕒 Created:</span> {new Date(plan.createdAt).toLocaleDateString()}</p>
              <p className='text-sm text-gray-300 mb-3'><span className='font-semibold text-gray-200'>🕒 Expired:</span> {new Date(plan.expiredAt).toLocaleDateString()}</p>

              <div className='space-y-4 mt-4'>
                {plan.meals.map((meal, i) => (
                  <motion.div
                    key={i}
                    className='bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-inner'
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className='font-semibold capitalize text-blue-400 mb-2 tracking-wide'>
                      🍽️ {meal.type}
                    </p>
                    <ul className='list-disc list-inside text-sm text-gray-300 space-y-1'>
                      {meal.items.map((item, j) => (
                        <li key={j}>• {item}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className='flex justify-between mt-6'>
                <button
                  onClick={() => handleEdit(plan)}
                  className='bg-yellow-500 text-black px-4 py-1 rounded hover:bg-yellow-400 transition-all text-sm font-semibold'
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(plan._id)}
                  className='bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-all text-sm font-semibold'
                >
                  🗑️ Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default DisplayDietplan
