import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { motion } from "framer-motion"
import { toast, Bounce, ToastContainer } from "react-toastify"

const Updatedietplan = () => {
  const [dietplan, setDietplan] = useState({
    memberUsername: '',
    goal: '',
    duration: '',
    meals: []
  })

  const { id } = useParams()
  const GET_URL = `http://localhost:5000/diet/getdietplanbyid/${id}`
  const updateURL = "http://localhost:5000/diet/updatedietplan"

  useEffect(() => {
    const getdietplan = async () => {
      try {
        const res = await axios.get(GET_URL)
        setDietplan(res.data.dietplan)
      } catch (err) {
        console.error("Error fetching diet plan:", err)
      }
    }
    getdietplan()
  }, [])

  const setvalues = (mealIndex, itemIndex, newValue) => {
    const updatedMeals = [...dietplan.meals]
    updatedMeals[mealIndex].items[itemIndex] = newValue
    setDietplan({ ...dietplan, meals: updatedMeals })
  }

  const addItems = (mealIndex) => {
    const updatedMeals = [...dietplan.meals]
    updatedMeals[mealIndex].items.push('')
    setDietplan({ ...dietplan, meals: updatedMeals })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(updateURL, {
      "goal": dietplan.goal,
      "meals": dietplan.meals,
      "id": dietplan._id
    }).then((res) => {
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    }).catch((error) => {
      toast.error(error.response?.data?.message || "Update failed", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    })
  }

  return (
    <div className='flex flex-col w-full min-h-screen bg-gray-800'>
      <ToastContainer />
      <div className='flex w-full mt-8 mb-4 justify-center'>
        <h2 className='text-2xl text-white font-bold'>Update Diet Plan</h2>
      </div>

      <div className='flex flex-col items-center'>
        <motion.div
          className='p-10 bg-gray-900 rounded-2xl shadow-lg w-full max-w-3xl'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className='space-y-4'>

            <motion.select
              disabled
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              value={dietplan.memberUsername}
              onChange={(e) => setDietplan({ ...dietplan, memberUsername: e.target.value })}
              className='w-full p-2 border border-gray-600 rounded bg-gray-700 text-white'
              required
            >
              <option value={dietplan.memberUsername} className='bg-gray-700'>
                {dietplan.memberUsername}
              </option>
            </motion.select>

            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              value={dietplan.goal}
              onChange={(e) => setDietplan({ ...dietplan, goal: e.target.value })}
              className='w-full p-2 border border-gray-600 rounded bg-gray-700 text-white'
              type='text'
              placeholder='Goal (e.g., Muscle Gain)' required
            />

            <motion.input
              initial={{ opacity: 0 }}
              disabled
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              value={dietplan.duration}
              onChange={(e) => setDietplan({ ...dietplan, duration: e.target.value })}
              className='w-full p-2 border border-gray-600 rounded bg-gray-700 text-white'
              type='number'
              placeholder='Enter duration in weeks' required
            />

            {dietplan.meals && dietplan.meals.map((meal, index) => (
              <motion.div
                key={index}
                className='flex p-4 rounded-xl flex-col gap-y-2 w-full bg-gray-700'
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * (index + 1) }}
              >
                <p className='font-semibold text-white capitalize'>{meal.type}</p>
                {meal.items.map((item, itemindex) => (
                  <div key={itemindex} className='w-full flex flex-col'>
                    <input
                      type='text'
                      value={dietplan.meals[index].items[itemindex]}
                      onChange={(e) => setvalues(index, itemindex, e.target.value)}
                      className='w-full p-2 border border-gray-600 rounded bg-gray-800 text-white'
                      placeholder='Item' required
                    />
                  </div>
                ))}

                <div>
                  <motion.button
                    type='button'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addItems(index)}
                    className='text-sm text-blue-400 mt-2'
                  >
                    + Add Items
                  </motion.button>
                </div>
              </motion.div>
            ))}

            <div className='flex w-full justify-center'>
              <motion.button
                type='submit'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded mt-6'
              >
                Update Plan
              </motion.button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Updatedietplan
