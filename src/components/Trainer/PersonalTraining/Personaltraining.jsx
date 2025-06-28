import React from 'react'
import { motion } from 'framer-motion'

const Personaltraining = () => {
  return (
    <div className="min-h-screen w-full bg-gray-800 flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-10">

        {/* Add Training Sessions Card */}
        <a href='/trainer/addtraining' className="w-full">
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-64 rounded-2xl p-6 flex justify-center items-center text-white bg-gray-600/30 backdrop-blur-lg shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border border-gray-500/40"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-center">
              Add Training Sessions
            </h1>
          </motion.div>
        </a>

        {/* See Training Sessions Card */}
        <a href='/trainer/seetraining' className="w-full">
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-64 rounded-2xl p-6 flex justify-center items-center text-white bg-gray-600/30 backdrop-blur-lg shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border border-gray-500/40"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-center">
              See Training Sessions
            </h1>
          </motion.div>
        </a>

      </div>
    </div>
  )
}

export default Personaltraining

