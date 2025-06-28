import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const SeeTraining = () => {
  const [classes, setClasses] = useState([])
  const URL = "http://localhost:5000/class/getclasses"

  useEffect(() => {
    const getclasses = async () => {
      const trainerusername = localStorage.getItem("trainerusername")
      await axios.post(URL, { trainerusername })
        .then((res) => {
          setClasses(res.data.classes)
          console.log(res.data.classes)
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }
    getclasses()
  }, [])

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-4 py-10 text-white">
      <div className="flex justify-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-purple-500 drop-shadow-lg tracking-tight animate-fade-in">
          Your Training Sessions
        </h1>
      </div>
      {classes.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-lg text-gray-300 animate-pulse">No training sessions found.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence>
            {classes.map((session, idx) => (
              <Link to={`/trainer/memberstats/${session._id}`} key={idx} className="block">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.045, boxShadow: '0 8px 32px 0 rgba(251,191,36,0.25)' }}
                  className="relative bg-white/10 rounded-3xl shadow-2xl p-8 flex flex-col gap-5 border-2 border-amber-400/60 hover:border-pink-400/80 hover:bg-white/20 transition-all duration-300 cursor-pointer group overflow-hidden"
                  onClick={e => { if (e.target.closest('button')) e.preventDefault(); }}
                >
                  {/* Delete Button */}
                  <button
                    className="absolute top-4 right-4 z-20 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                    title="Delete Session"
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this session?')) {
                        try {
                          await axios.delete(`http://localhost:5000/class/deleteclass/${session._id}`);
                          setClasses(prev => prev.filter(c => c._id !== session._id));
                        } catch (err) {
                          alert('Failed to delete session.');
                        }
                      }
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  {/* Animated border accent */}
                  <motion.div
                    layoutId={`border-${idx}`}
                    className="absolute -top-1 -left-1 w-[calc(100%+8px)] h-[calc(100%+8px)] rounded-3xl pointer-events-none z-0 border-2 border-gradient-to-r from-amber-400 via-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ borderImage: 'linear-gradient(90deg, #fbbf24, #ec4899, #a78bfa) 1' }}
                  />
                  <h2 className="text-2xl font-bold text-amber-300 mb-2 tracking-wide z-10">
                    {session.classname}
                  </h2>
                  <div className="flex flex-col gap-2 text-base z-10">
                    <span>
                      <span className="font-semibold text-amber-200">Date:</span> {session.date}
                    </span>
                    <span>
                      <span className="font-semibold text-amber-200">Time:</span> {session.startTime} - {session.endTime}
                    </span>
                    <span>
                      <span className="font-semibold text-amber-200">Description:</span> {session.Description || 'No description'}
                    </span>
                    <div>
                      <span className="font-semibold text-amber-200">Members:</span>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {Array.isArray(session.memberUsername) && session.memberUsername.length > 0 ? (
                          session.memberUsername.map((member, i) => (
                            <li key={i} className="text-amber-100">{member}</li>
                          ))
                        ) : (
                          <li className="text-gray-400">No members</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default SeeTraining
