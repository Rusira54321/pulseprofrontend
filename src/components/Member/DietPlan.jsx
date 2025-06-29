import React, { useEffect, useState } from 'react'
import axios from "axios"
import { motion, AnimatePresence } from 'framer-motion'

const DietPlan = () => {
    const [dietplan, setdietplan] = useState([])
    const URL = "http://localhost:5000/diet/getdietplanbymember"
    useEffect(()=>{
        const memberUsername = localStorage.getItem("memberkey")
        const getdietplan = async () => {
            await axios.post(URL,{
                "memberUsername":memberUsername
            }).then((res)=>{
                console.log(res.data.dietplans)
                setdietplan(res.data.dietplans)
            })
        }
        getdietplan()
    },[])
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white px-4 py-10">
       <div className="flex justify-center mt-5 mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-amber-400 to-pink-400 drop-shadow-lg tracking-tight animate-fade-in">Diet Plan</h2>
       </div>
       <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-10 p-6 w-full max-w-7xl mx-auto">
                {dietplan.length === 0 ? (
                  <p className="text-white text-lg col-span-full text-center">No diet plans found.</p>
                ) : (
                <AnimatePresence>
                  <>
                    {dietplan.map((diet, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(163,230,53,0.18)' }}
                        className="flex flex-col gap-3 text-base z-10 bg-white/10 rounded-3xl shadow-2xl p-8 border-2 border-lime-400/60 hover:border-amber-400/80 hover:bg-white/20 transition-all duration-300 group overflow-hidden"
                      >
                        <span><span className="font-semibold text-amber-200">Goal:</span> {diet.goal}</span>
                        <span><span className="font-semibold text-amber-200">Start Date:</span> {new Date(diet.createdAt).getDate().toString().padStart(2, '0')}-{(new Date(diet.createdAt).getMonth() + 1).toString().padStart(2, '0')}-{new Date(diet.createdAt).getFullYear()}</span>
                        <span><span className="font-semibold text-amber-200">End Date:</span> {new Date(diet.expiredAt).getDate().toString().padStart(2, '0')}-{(new Date(diet.expiredAt).getMonth() + 1).toString().padStart(2, '0')}-{new Date(diet.expiredAt).getFullYear()}</span>
                        <span><span className="font-semibold text-amber-200">Duration:</span> {diet.duration} weeks</span>
                        <span className="font-semibold text-lime-300 mt-2 mb-1">Meals</span>
                        {diet.meals.length !== 0 && diet.meals.map((meal, idx) => (
                          <div key={idx} className="flex flex-col gap-1 text-base z-10 bg-gray-700/80 p-3 rounded-xl shadow-inner mt-2">
                            <span className="text-amber-200 font-semibold mb-1">{meal.type}</span>
                            {meal.items.length !== 0 && meal.items.map((item, itemIdx) => (
                              <span key={itemIdx} className="text-gray-100 pl-2 text-sm">
                                {item}
                              </span>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    ))}
                  </>
                </AnimatePresence>
                )}
       </div>
    </div>
  )
}

export default DietPlan
