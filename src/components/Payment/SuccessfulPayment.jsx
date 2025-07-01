import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const SuccessfulPayment = () => {
    useEffect(()=>{
        localStorage.removeItem("cartItems");
    },[])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-black">
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="bg-gray-800 rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6"
      >
        <motion.div
          initial={{ rotate: -30, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 180 }}
          className="flex items-center justify-center bg-green-700 rounded-full p-5 shadow-lg"
        >
          <CheckCircle className="w-16 h-16 text-white" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-white text-center"
        >
          Payment Successful!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-300 text-center max-w-md"
        >
          Thank you for your purchase. Your order has been processed and a confirmation has been sent to your email.
        </motion.p>
        <motion.a
          href="/displaysuplliment"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
        >
          Back to Suppliment page
        </motion.a>
      </motion.div>
    </div>
  )
}

export default SuccessfulPayment
