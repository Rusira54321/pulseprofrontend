import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Workoutplan = () => {
    const [workoutplan,setworkoutplan] = useState([])
    const URL = "http://localhost:5000/workout/getworkoutplanbymember"
    useEffect(()=>{
        const memberUsername = localStorage.getItem("memberkey")
        const getworkoutplan = async() =>{
            await axios.post(URL,{
                "memberUsername":memberUsername
            }).then((res)=>{
                console.log(res.data.workouts)
                setworkoutplan(res.data.workouts)
            })
        }
        getworkoutplan()
    },[])
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white px-4 py-10">
      <div className="flex mt-6 justify-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-purple-500 drop-shadow-lg tracking-tight animate-fade-in">
          Workout Plan
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4 w-full max-w-7xl mx-auto">
        {workoutplan.length === 0 ? (
          <p className="text-center text-gray-300 text-lg animate-pulse col-span-full">No workout plans available.</p>
        ) : (
          <AnimatePresence>
            {workoutplan.map((workout, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(251,191,36,0.25)' }}
                className="relative bg-white/10 rounded-3xl shadow-2xl p-8 flex flex-col gap-4 border-2 border-amber-400/60 hover:border-pink-400/80 hover:bg-white/20 transition-all duration-300 group overflow-hidden"
              >
                <h2 className="text-2xl font-bold text-amber-300 mb-2 tracking-wide z-10">{workout.planName}</h2>
                <div className="flex flex-col gap-1 text-base z-10">
                  <span><span className="font-semibold text-amber-200">Duration:</span> {workout.duration} weeks</span>
                  <span><span className="font-semibold text-amber-200">Created:</span> {new Date(workout.createdAt).getDate().toString().padStart(2, '0')}-{(new Date(workout.createdAt).getMonth() + 1).toString().padStart(2, '0')}-{new Date(workout.createdAt).getFullYear()}</span>
                  <span><span className="font-semibold text-amber-200">End:</span> {new Date(workout.expiredAt).getDate().toString().padStart(2, '0')}-{(new Date(workout.expiredAt).getMonth() + 1).toString().padStart(2, '0')}-{new Date(workout.expiredAt).getFullYear()}</span>
                  <span><span className="font-semibold text-amber-200">Goal:</span> {workout.goal}</span>
                  <span><span className="font-semibold text-amber-200">Trainer:</span> {workout.trainerUsername}</span>
                </div>
                <div className="flex flex-col gap-y-4 mt-2">
                  {workout.workouts.length !== 0 && workout.workouts.map((workoutsss, idx) => (
                    <div key={idx} className="flex flex-col bg-gray-700/70 rounded-xl shadow-inner p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block bg-gradient-to-r from-amber-400 via-pink-400 to-purple-500 text-gray-900 font-bold px-3 py-1 rounded-full text-sm shadow">{workoutsss.day}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {workoutsss.exercises.map((exercise, exIdx) => (
                          <span key={exIdx} className="text-gray-100 pl-2 text-sm">
                            <span className="font-semibold text-amber-200">{exercise.name}</span> - {exercise.sets} sets of {exercise.reps} reps
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default Workoutplan
