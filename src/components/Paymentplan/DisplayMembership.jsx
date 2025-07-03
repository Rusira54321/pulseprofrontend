import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const DisplayMembership = () => {
  const URL = "http://localhost:5000/memberplan/get"
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const key = localStorage.getItem("gymkey")
      try {
        const res = await axios.post(URL, {
          "key": key
        })
        setData(res.data.membershipPlan || [])
      } catch (err) {
        console.error("Failed to fetch membership plans", err)
      }
    }
    getData()
  }, [])

  const handleEdit = (id) => {
    navigate(`/editmembership/${id}`)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this membership plan?')) {
      try {
        await axios.delete(`http://localhost:5000/memberplan/delete/${id}`)
        setData(data.filter(plan => plan._id !== id))
      } catch (err) {
        alert('Failed to delete plan.')
      }
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-amber-100 via-gray-900 to-black px-6 py-12 justify-center items-start">
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
        {data.length === 0 ? (
          <motion.p
            className="text-white text-2xl font-semibold col-span-full text-center mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            No membership plans available.
          </motion.p>
        ) : (
          data.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="bg-white/80 rounded-3xl shadow-2xl p-8 hover:scale-105 hover:shadow-amber-200/40 transition-all duration-300 flex flex-col gap-4 border border-amber-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight drop-shadow-lg">{plan.planName}</h2>
              <p className="text-sm text-gray-500 mb-1">
                Plan ID: <span className="font-mono text-gray-800">{plan.PlanID}</span>
              </p>
              <p className="text-base text-gray-700 mb-3 min-h-[48px]">{plan.description}</p>
              <div className="flex justify-between items-center mt-auto mb-4">
                <span className="text-xl font-bold text-green-700 drop-shadow">Rs {plan.price}</span>
                <span className="text-md text-gray-600 font-medium">
                  {plan.duration} {plan.durationUnit}{plan.duration > 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => handleEdit(plan._id)}
                  className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition-all duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan._id)}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
 )}
      </div>
    </div>
  )
}

export default DisplayMembership