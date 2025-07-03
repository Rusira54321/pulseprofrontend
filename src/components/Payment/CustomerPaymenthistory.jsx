import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

const CustomerPaymenthistory = () => {
  const URL = "http://localhost:5000/payment/getpayments"
  const [paymenthistory, setPaymenthistory] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const gym = localStorage.getItem("gymkey")
    const getpayments = async () => {
      try {
        const res = await axios.post(URL, { key: gym })
        setPaymenthistory(res.data.payments)
      } catch (err) {
        console.error("Error fetching payment history:", err)
      }
    }
    getpayments()
  }, [])

  // Filtered payment history based on search
  const filteredPayments = paymenthistory.filter(payment =>
    payment.customerusername.toLowerCase().includes(search.toLowerCase()) ||
    payment.paymentType.toLowerCase().includes(search.toLowerCase()) ||
    (payment.purchaseitems && payment.purchaseitems.some(item => item.toLowerCase().includes(search.toLowerCase())))
  )

  return (
    <div className='flex w-full min-h-screen bg-gradient-to-br from-amber-100 via-gray-900 to-black p-6 text-white'>
      <motion.div
        className='w-full max-w-6xl mx-auto'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
      >
        <motion.h1
          className='text-3xl font-bold mb-6 text-center text-amber-400 drop-shadow-lg'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Customer Payment History
        </motion.h1>
        <motion.div
          className='flex justify-end mb-4'
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by username, payment type, or item..."
            className="px-4 py-2 rounded-lg border border-amber-400 text-gray-900 focus:ring-2 focus:ring-amber-400 outline-none transition w-full max-w-xs shadow placeholder-gray-600 placeholder:font-semibold bg-white/90"
          />
        </motion.div>
        <motion.div
          className='overflow-x-auto'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <table className='min-w-full bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden shadow-xl'>
            <thead>
              <tr className='bg-amber-400 text-gray-900'>
                <th className='py-3 px-4 text-left'>Username</th>
                <th className='py-3 px-4 text-left'>Payment Type</th>
                <th className='py-3 px-4 text-left'>Total</th>
                <th className='py-3 px-4 text-left'>Paid</th>
                <th className='py-3 px-4 text-left'>Balance</th>
                <th className='py-3 px-4 text-left'>Date</th>
                <th className='py-3 px-4 text-left'>Items</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-400">
                    No payment history found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment, index) => (
                  <motion.tr
                    key={index}
                    className='border-b border-amber-200 hover:bg-amber-100/20 transition'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <td className='py-3 px-4'>{payment.customerusername}</td>
                    <td className='py-3 px-4 capitalize'>{payment.paymentType}</td>
                    <td className='py-3 px-4 text-green-400 font-semibold'>Rs. {payment.totalAmount}</td>
                    <td className='py-3 px-4 text-blue-400 font-semibold'>Rs. {payment.customer_payment}</td>
                    <td className='py-3 px-4 text-red-400 font-semibold'>Rs. {payment.balance}</td>
                    <td className='py-3 px-4'>{new Date(payment.paymentDate).toLocaleString()}</td>
                    <td className='py-3 px-4'>
                      <ul className='list-disc ml-5'>
                        {payment.purchaseitems.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CustomerPaymenthistory