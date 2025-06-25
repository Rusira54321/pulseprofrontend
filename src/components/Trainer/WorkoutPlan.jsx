import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast, Bounce } from "react-toastify"
import { motion } from "framer-motion"

const WorkoutPlan = () => {
  const URL = "http://localhost:5000/get/getmemberbyTrainer"
  const workoutURL = "http://localhost:5000/workout/addWorkoutPlan"
  const [members, setmembers] = useState([])

  useEffect(() => {
    const username = localStorage.getItem("trainerusername")
    const getmembers = async () => {
      await axios.post(URL, {
        "username": username
      }).then((res) => {
        setmembers(res.data.members)
      })
    }
    getmembers()
  }, [])

  const [form, setform] = useState({
    memberUsername: "",
    planname: "",
    goal: "",
    duration: 0,
    workouts: []
  })

  const handleExerciseChange = (dayIndex, exIndex, field, value) => {
    const updated = [...form.workouts]
    updated[dayIndex].exercises[exIndex][field] = value
    setform({ ...form, workouts: updated })
  }

  const addDay = (day) => {
    const exists = form.workouts.find(w => w.day === day)
    if (!exists) {
      setform(prev => ({
        ...prev,
        workouts: [...prev.workouts, {
          day,
          exercises: [{
            name: "",
            sets: "",
            reps: ""
          }]
        }]
      }))
    }
  }

  const addExercise = (dayindex) => {
    const updated = [...form.workouts]
    updated[dayindex].exercises.push({ name: "", sets: "", reps: "" })
    setform({ ...form, workouts: updated })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trainerusername = localStorage.getItem("trainerusername")
    const { memberUsername, goal, planname, workouts, duration } = form
    const addworkout = async () => {
      await axios.post(workoutURL, {
        "goal": goal,
        "duration": duration,
        "memberUsername": memberUsername,
        "planname": planname,
        "workouts": workouts,
        "trainerusername": trainerusername
      }).then((res) => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
        setform({
          memberUsername: "",
          planname: "",
          goal: "",
          duration: 0,
          workouts: []
        })
      }).catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      })
    }
    addworkout()
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div className='flex flex-col w-full min-h-screen bg-gray-800'>
      <div className='flex w-full mt-8 mb-4 justify-center'>
        <h2 className='text-2xl text-white font-bold'>Create Workout Plan</h2>
      </div>

      <div className='flex flex-col items-center'>
        <motion.div
          className='p-15 bg-blue-300 rounded-2xl'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className='space-y-4'>
            <select value={form.memberUsername} onChange={(e) => setform({
              ...form,
              memberUsername: e.target.value
            })} className='w-full p-2 border text-black border-black rounded' required>
              <option value="" className='bg-white'>Select Member</option>
              {
                members.length !== 0 && members.map((member) => (
                  <option key={member._id} value={member.username} className='bg-white'>{member.username}</option>
                ))
              }
            </select>

            <input value={form.planname} onChange={(e) => setform({
              ...form,
              planname: e.target.value
            })} className='w-full p-2 border text-black border-black rounded' type='text'
              placeholder='Plan Name' required />

            <input value={form.goal} onChange={(e) => setform({
              ...form,
              goal: e.target.value
            })} className='w-full p-2 border text-black border-black rounded' type='text'
              placeholder='Goal (e.g., Muscle Gain)' required />

            <input value={form.duration} onChange={(e) => setform({
              ...form,
              duration: e.target.value
            })} className='w-full p-2 border text-black border-black rounded' type='number'
              placeholder='Enter the number of Duration weeks' required />

            <div className='flex gap-x-2 flex-wrap'>
              {days.map(day => (
                <motion.button
                  key={day}
                  type='button'
                  whileHover={{ scale: 1.05 }}
                  onClick={() => addDay(day)}
                  className='bg-blue-500 text-white px-3 py-1 rounded'
                >
                  + {day}
                </motion.button>
              ))}
            </div>

            {form.workouts.map((day, dayindex) => (
              <motion.div
                key={day.day}
                className='bg-blue-200 p-4 rounded shadow mt-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: dayindex * 0.15 }}
              >
                <h3 className='text-lg font-semibold mb-2'>{day.day}</h3>
                {
                  day.exercises.map((ex, exIndex) => (
                    <div key={exIndex} className='grid grid-cols-3 gap-2 mb-2'>
                      <input type='text' placeholder='Exercise' className='p-2 border rounded' value={ex.name}
                        onChange={(e) => handleExerciseChange(dayindex, exIndex, 'name', e.target.value)} required />
                      <input type='number' placeholder='Sets' className='p-2 border rounded' value={ex.sets}
                        onChange={(e) => handleExerciseChange(dayindex, exIndex, 'sets', e.target.value)} required />
                      <input type='number' placeholder='Reps' className='p-2 border rounded' value={ex.reps}
                        onChange={(e) => handleExerciseChange(dayindex, exIndex, 'reps', e.target.value)} required />
                    </div>
                  ))
                }
                <button type='button' onClick={() => addExercise(dayindex)} className='text-sm text-blue-600 mt-2'>
                  + Add Exercise
                </button>
              </motion.div>
            ))}

            <div className='flex w-full justify-center'>
              <motion.button
                type='submit'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded mt-6'
              >
                Create Plan
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default WorkoutPlan
