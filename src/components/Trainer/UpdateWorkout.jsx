import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { motion } from "framer-motion"
import { toast, Bounce } from "react-toastify"

const UpdateWorkout = () => {
  const [workout, setworkout] = useState(null)
  const { id } = useParams()
  const updateURL = "http://localhost:5000/workout/updateworkoutplan"
  useEffect(() => {
    const URL = "http://localhost:5000/workout/getworkoutplanbyid"
    const getworkout = async () => {
      try {
        const res = await axios.post(URL, { id })
        setworkout(res.data.workout)
      } catch (error) {
        console.error("Failed to fetch workout:", error)
      }
    }
    getworkout()
  }, [id])

  const handleExerciseChange = (dayIndex, exIndex, field, value) => {
    if (!workout?.workouts) return
    const updated = [...workout.workouts]
    updated[dayIndex].exercises[exIndex][field] = value
    setworkout({ ...workout, workouts: updated })
  }

  const addDay = (day) => {
    if (!workout?.workouts) return
    const exists = workout.workouts.find(w => w.day === day)
    if (!exists) {
      setworkout(prev => ({
        ...prev,
        workouts: [...prev.workouts, {
          day,
          exercises: [{ name: "", sets: "", reps: "" }]
        }]
      }))
    }
  }

  const addExercise = (dayIndex) => {
    if (!workout?.workouts) return
    const updated = [...workout.workouts]
    updated[dayIndex].exercises.push({ name: "", sets: "", reps: "" })
    setworkout({ ...workout, workouts: updated })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const id = workout._id
    await axios.post(`${updateURL}/${id}`,{
      workout
    }).then((res)=>{
toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    }).catch((error)=>{
toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    })
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  if (!workout) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full min-h-screen bg-gray-800'>
      <div className='flex w-full mt-8 mb-4 justify-center'>
        <h2 className='text-2xl text-white font-bold'>Update Workout Plan</h2>
      </div>

      <div className='flex flex-col items-center'>
        <motion.div
          className='p-6 bg-gray-700 rounded-2xl max-w-4xl w-full shadow-lg'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className='space-y-4'>
            <select
              disabled
              value={workout.memberUsername || ""}
              onChange={(e) => setworkout({
                ...workout,
                memberUsername: e.target.value
              })}
              className='w-full p-2 border border-gray-600 bg-gray-800 text-white rounded'
              required
            >
              <option value={workout.memberUsername} className='bg-gray-800 text-white'>
                {workout.memberUsername}
              </option>
            </select>

            <input
              value={workout.planName || ""}
              onChange={(e) => setworkout({
                ...workout,
                planName: e.target.value
              })}
              className='w-full p-2 border border-gray-600 bg-gray-800 text-white rounded'
              type='text'
              placeholder='Plan Name'
              required
            />

            <input
              value={workout.goal || ""}
              onChange={(e) => setworkout({
                ...workout,
                goal: e.target.value
              })}
              className='w-full p-2 border border-gray-600 bg-gray-800 text-white rounded'
              type='text'
              placeholder='Goal (e.g., Muscle Gain)'
              required
            />

            <input
              disabled
              value={workout.duration || ""}
              onChange={(e) => setworkout({
                ...workout,
                duration: e.target.value
              })}
              className='w-full p-2 border border-gray-600 bg-gray-800 text-white rounded'
              type='number'
              placeholder='Enter the number of Duration weeks'
              required
            />

            <div className='flex gap-x-2 flex-wrap'>
              {days.map(day => (
                <motion.button
                  key={day}
                  type='button'
                  whileHover={{ scale: 1.05 }}
                  onClick={() => addDay(day)}
                  className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow-sm'
                >
                  + {day}
                </motion.button>
              ))}
            </div>

            {(workout.workouts || []).map((day, dayindex) => (
              <motion.div
                key={day.day}
                className='bg-gray-700 p-4 rounded shadow mt-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: dayindex * 0.15 }}
              >
                <h3 className='text-lg font-semibold mb-2 text-white'>{day.day}</h3>
                {day.exercises.map((ex, exIndex) => (
                  <div key={exIndex} className='grid grid-cols-3 gap-2 mb-2'>
                    <input
                      type='text'
                      placeholder='Exercise'
                      className='p-2 border border-gray-600 rounded bg-gray-800 text-white'
                      value={ex.name}
                      onChange={(e) => handleExerciseChange(dayindex, exIndex, 'name', e.target.value)}
                      required
                    />
                    <input
                      type='number'
                      placeholder='Sets'
                      className='p-2 border border-gray-600 rounded bg-gray-800 text-white'
                      value={ex.sets}
                      onChange={(e) => handleExerciseChange(dayindex, exIndex, 'sets', e.target.value)}
                      required
                    />
                    <input
                      type='number'
                      placeholder='Reps'
                      className='p-2 border border-gray-600 rounded bg-gray-800 text-white'
                      value={ex.reps}
                      onChange={(e) => handleExerciseChange(dayindex, exIndex, 'reps', e.target.value)}
                      required
                    />
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() => addExercise(dayindex)}
                  className='text-sm text-blue-400 hover:text-blue-500 mt-2'
                >
                  + Add Exercise
                </button>
              </motion.div>
            ))}

            <div className='flex w-full justify-center'>
              <motion.button
                type='submit'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded mt-6 shadow-md'
              >
                Update Plan
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default UpdateWorkout
