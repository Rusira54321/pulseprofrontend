import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DisplaySchedule = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const deleturl = "http://localhost:5000/ai/deleteschedule"
  const getWorkoutUrl = "http://localhost:5000/ai/getworkoutplan";

  useEffect(() => {
    const getWorkouts = async () => {
      const username = localStorage.getItem("memberkey");
      try {
        const res = await axios.post(getWorkoutUrl, {
          username,
        });
        setWorkouts(res.data.aischedule || []);
      } catch (err) {
        console.error("Error fetching workout schedule:", err);
      } finally {
        setLoading(false);
      }
    };
    getWorkouts();
  }, []);
  const deleteschedule = async() =>{
    const username = localStorage.getItem("memberkey")
    await axios.post(deleturl,{
        "username":username
    }).then((res)=>{
        alert(res.data.message)
    })
  }
  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-12">
      <motion.h1
        className="text-4xl text-white font-bold text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your AI-Based Workout Schedule
      </motion.h1>

      {loading ? (
        <p className="text-green-400 text-center text-xl">Loading workout schedule...</p>
      ) : workouts.length === 0 ? (
        <p className="text-red-400 text-center text-xl">No schedule found for this user.</p>
      ) : (
        workouts.map((plan, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-3xl p-8 text-white mb-12 border border-green-400 shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="mb-6">
              <p className="text-lg text-green-300">
                <span className="font-semibold">Duration:</span> {plan.duration} {plan.durationUnit}
              </p>
              <p className="text-sm text-gray-400">Generated: {new Date(plan.createddata).toLocaleString()}</p>
            </div>
            {Object.entries(plan.schedule).map(([day, details]) => (
              <div key={day} className="mb-8">
                <h3 className="text-2xl font-bold text-green-400 mb-3">
                  {day}: {details.Title}
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {details.exercises.map((ex, idx) => (
                    <li key={idx} className="text-green-200">
                      <span className="font-medium">{ex.name}</span> -{" "}
                      {ex.duration
                        ? `${ex.duration} ${ex.unit || "minutes"} (${ex.intensity || ""})`
                        : `Sets: ${ex.sets}, Reps: ${ex.reps}, Rest: ${ex.rest} sec`}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 w-full py-3 font-bold text-lg rounded-xl text-white bg-gradient-to-r from-red-500 via-pink-500 to-red-600 shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors duration-300 border border-red-400/40"
              onClick={deleteschedule}
            >
              Delete
            </motion.button>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default DisplaySchedule;
