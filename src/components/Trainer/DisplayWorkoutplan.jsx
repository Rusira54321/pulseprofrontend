import React, { useEffect, useState } from 'react'
import axios from "axios"
import { motion } from 'framer-motion'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const DisplayWorkoutplan = () => {
    const navigate = useNavigate()
  const [workouts, setWorkouts] = useState([])
  const URL = "http://localhost:5000/workout/getworkoutplan"

  useEffect(() => {
    const trainerusername = localStorage.getItem("trainerusername")
    const getworkouts = async () => {
      try {
        const res = await axios.post(URL, {
          trainerusername
        })
        setWorkouts(res.data.workouts)
      } catch (err) {
        console.error("Failed to fetch workout plans:", err)
      }
    }
    getworkouts()
  }, [])

  const deletePlan = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this workout plan?")
    if (!confirm) return

    try {
      await axios.delete(`http://localhost:5000/workout/delete/${id}`)
      setWorkouts(prev => prev.filter(plan => plan._id !== id))
    } catch (err) {
      console.error("Error deleting plan:", err)
      alert("Failed to delete plan.")
    }
  }

  const handleEdit = (id) => {
    navigate(`/update/workout/${id}`)
  }

  return (
    <div className='flex flex-col w-full min-h-screen bg-gray-800 p-6 text-white'>
      <h2 className='text-3xl font-bold mb-8 text-center text-lime-400'>Workout Plans</h2>

      {
        workouts.length === 0 ? (
          <p className='text-center text-gray-300'>No workout plans found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((plan, idx) => (
              <motion.div
                key={idx}
                className='bg-gradient-to-br from-slate-700 to-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-700 transition-all relative'
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h3 className='text-xl font-bold text-lime-300 mb-2'>{plan.planName}</h3>
                <p><span className='font-semibold text-gray-300'>Member:</span> {plan.memberUsername}</p>
                <p><span className='font-semibold text-gray-300'>Goal:</span> {plan.goal}</p>
                <p><span className='font-semibold text-gray-300'>Duration:</span> {plan.duration} weeks</p>

                <div className='mt-4 space-y-3'>
                  {plan.workouts.map((workout, i) => (
                    <div key={i} className='bg-gray-700 p-3 rounded-lg border border-gray-600'>
                      <p className='font-semibold mb-1 text-white'>Day: {workout.day}</p>
                      <ul className='list-disc list-inside text-sm text-gray-200'>
                        {workout.exercises.map((exercise, j) => (
                          <li key={j}>
                            {exercise.name} - {exercise.sets} sets x {exercise.reps} reps
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className='flex justify-end mt-4 gap-3'>
                  <button
                    onClick={() => handleEdit(plan._id)}
                    className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2'
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => deletePlan(plan._id)}
                    className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2'
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default DisplayWorkoutplan
