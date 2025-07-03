import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from "framer-motion"
import { toast, Bounce } from "react-toastify"

const Dietplan = () => {
  const URL = "http://localhost:5000/get/getmemberbyTrainer"
  const addplanURL = "http://localhost:5000/diet/addDietPlan"
  const [members, setmembers] = useState([])
  const [form, setform] = useState({
    memberUsername: "",
    goal: "",
    duration: 0,
    meals: [{
      type: "breakfast",
      items: [""]
    }, {
      type: "lunch",
      items: [""]
    }, {
      type: "dinner",
      items: [""]
    }, {
      type: "snack",
      items: [""]
    }]
  })

  useEffect(() => {
    const getmembers = async () => {
      const username = localStorage.getItem("trainerusername")
      await axios.post(URL, {
        "username": username
      }).then((res) => {
        console.log(res.data.members)
        setmembers(res.data.members)
      })
    }
    getmembers()
  }, [])

  const addItems = (index) => {
    var item = ""
    const mealss = form.meals
    mealss[index].items.push(item)
    setform(prev => ({
      ...prev,
      meals: mealss
    }))
  }

  const setvalues = (index, itemindex, value) => {
    const mealss = form.meals
    mealss[index].items[itemindex] = value
    setform(prev => ({
      ...prev,
      meals: mealss
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const gym = members[0].gym
    const usernames = localStorage.getItem("trainerusername")
    await axios.post(addplanURL, {
      "memberUsername": form.memberUsername,
      "trainerUsername": usernames,
      "goal": form.goal,
      "duration": form.duration,
      "meals": form.meals,
      "gym":gym
    }).then((res) => {
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
      setform({
        memberUsername: "",
        goal: "",
        duration: 0,
        meals: [{
          type: "breakfast",
          items: [""]
        }, {
          type: "lunch",
          items: [""]
        }, {
          type: "dinner",
          items: [""]
        }, {
          type: "snack",
          items: [""]
        }]
      })
    }).catch((error) => {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    })
  }

  return (
    <div className='flex flex-col w-full min-h-screen bg-gray-800'>
      <div className='flex w-full mt-8 mb-4 justify-center'>
        <h2 className='text-2xl text-white font-bold'>Create Diet Plan</h2>
      </div>

      <div className='flex flex-col items-center'>
        <motion.div
          className='p-15 bg-blue-300 rounded-2xl'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className='space-y-4'>

            <motion.select
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              value={form.memberUsername}
              onChange={(e) => setform({
                ...form,
                memberUsername: e.target.value
              })}
              className='w-full p-2 border text-black border-black rounded' required
            >
              <option value="" className='bg-white'>Select Member</option>
              {
                members.length !== 0 && members.map((member) => (
                  <option key={member._id} value={member.username} className='bg-white'>{member.username}</option>
                ))
              }
            </motion.select>

            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              value={form.goal}
              onChange={(e) => setform({
                ...form,
                goal: e.target.value
              })}
              className='w-full p-2 border text-black border-black rounded' type='text'
              placeholder='Goal (e.g., Muscle Gain)' required
            />

            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              value={form.duration}
              onChange={(e) => setform({
                ...form,
                duration: e.target.value
              })}
              className='w-full p-2 border text-black border-black rounded' type='number'
              placeholder='Enter the number of Duration weeks' required
            />

            {
              form.meals.map((meal, index) => (
                <motion.div
                  key={index}
                  className='flex p-5 rounded-2xl flex-col gap-y-2 w-full bg-blue-200'
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * (index + 1) }}
                >
                  <p className='font-semibold text-gray-700 capitalize'>{meal.type}</p>
                  {
                    meal.items.map((item, itemindex) => (
                      <div key={itemindex} className='w-full flex flex-col align-center'>
                        <input type='text' value={form.meals[index].items[itemindex]} onChange={(e) => setvalues(index, itemindex, e.target.value)} className='w-full  p-2 border text-black border-black rounded'
                          placeholder='Items' required></input>
                      </div>
                    ))
                  }

                  <div>
                    <motion.button
                      type='button'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addItems(index)}
                      className='text-sm text-blue-600 mt-2'
                    >
                      + Add Items
                    </motion.button>
                  </div>
                </motion.div>
              ))
            }

            <div className='flex w-full justify-center'>
              <motion.button
                type='submit'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded mt-6'
              >
                Create Plan
              </motion.button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Dietplan
