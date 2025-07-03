import React from 'react'
import { motion } from 'framer-motion';

const Paymentplan = () => {
  return (
    <div className="flex w-full min-h-screen justify-center items-center bg-gradient-to-br from-green-200 via-gray-900 to-black py-12">
      <motion.div
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
      >
        <a href='/addmembership' className="block">
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(34,197,94,0.25)' }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col justify-center items-center bg-gradient-to-tr from-green-400 via-green-300 to-emerald-200 rounded-3xl h-72 shadow-xl transition-all duration-300 cursor-pointer border-2 border-green-200 hover:border-green-500"
          >
            <motion.h1
              className="text-gray-900 font-extrabold text-3xl md:text-4xl text-center drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Add Membership Types
            </motion.h1>
          </motion.div>
        </a>
        <a href='/displaymembership' className="block">
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(34,197,94,0.25)' }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col justify-center items-center bg-gradient-to-tr from-emerald-300 via-green-200 to-green-400 rounded-3xl h-72 shadow-xl transition-all duration-300 cursor-pointer border-2 border-green-200 hover:border-green-500"
          >
            <motion.h1
              className="text-gray-900 font-extrabold text-3xl md:text-4xl text-center drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Display Membership Types
            </motion.h1>
          </motion.div>
        </a>
      </motion.div>
    </div>
  )
}

export default Paymentplan