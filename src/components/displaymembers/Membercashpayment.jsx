import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import axios from 'axios'
const Membercashpayment = () => {
    const navigate = useNavigate()
  const location = useLocation();
  const details = location.state?.details || {};
  const totalPrice = details[0].totalprice || 0;
  const [customerPayment, setCustomerPayment] = useState(0);
  const balance = customerPayment - totalPrice;
  const URL = "http://localhost:5000/payment/membercashpay"
  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(customerPayment>=totalPrice)
    {
        await axios.post(URL,{
            "items":details,
            "balance":balance,
            "customerpayment":customerPayment
        }).then((res)=>{
                navigate(`/success/pay`)
        })
    }
  }

  return (
    <div className='flex min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white px-4 py-10 items-center justify-center'>
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="bg-white/90 rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 max-w-md w-full"
      >
        <div className="flex items-center justify-center bg-green-700 rounded-full p-5 shadow-lg">
          <CheckCircle className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">Cash Payment</h1>
        <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-3 text-lg text-gray-800">
          <div className="flex justify-between">
            <span className="font-semibold">Total Price:</span>
            <span>Rs {totalPrice}</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="font-semibold">Customer Payment:</span>
            <input
              type="number"
              min={0}
              required
              onChange={e => setCustomerPayment(Number(e.target.value))}
              className="w-32 px-3 py-1 rounded-md border border-gray-400 bg-gray-100 text-gray-900 focus:ring-2 focus:ring-green-400 outline-none transition"
              placeholder="Enter amount"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Balance:</span>
            <span>Rs {isNaN(balance) ? 0 : balance}</span>
          </div>
        </div>
        {customerPayment >= totalPrice && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full flex flex-col items-center gap-2"
          >
            
            <button
              type='submit'
              className="mt-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
            >
              checkout
            </button>
          </motion.div>
          
        )}
        </form>
      </motion.div>
    </div>
  )
}

export default Membercashpayment