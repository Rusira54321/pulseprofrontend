import React from 'react'
import axios from "axios"
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Classes = () => {
    const [classes, setclasses] = useState([])
    const URL = "http://localhost:5000/class/getclassess"

    useEffect(() => {
        const memberUsername = localStorage.getItem("memberkey")
        const getclasses = async () => {
            await axios.post(URL, {
                "memberUsername": memberUsername
            }).then((res) => {
                setclasses(res.data.classesss)
            })
        }
        getclasses()
    }, [])

    return (
        <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-8 text-white">
            <div className="flex justify-center mb-10">
                <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-amber-400 to-pink-400 drop-shadow-lg tracking-tight">Your Classes</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl mx-auto">
                {classes.length > 0 ? (
                    <AnimatePresence>
                    {classes.map((cls, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(59,130,246,0.18)' }}
                            className="relative bg-white/10 rounded-3xl shadow-2xl p-8 flex flex-col gap-3 border-2 border-blue-400/60 hover:border-amber-400/80 hover:bg-white/20 transition-all duration-300 group overflow-hidden"
                        >
                            <h2 className="text-2xl font-bold text-blue-300 mb-2 tracking-wide z-10">{cls.classname}</h2>
                            <div className="flex flex-col gap-1 text-base z-10">
                                <span><span className="font-semibold text-blue-200">Trainer:</span> {cls.trainerusername}</span>
                                <span><span className="font-semibold text-blue-200">Date:</span> {cls.date}</span>
                                <span><span className="font-semibold text-blue-200">Time:</span> {cls.startTime} - {cls.endTime}</span>
                                <span><span className="font-semibold text-blue-200">Members:</span> {cls.memberUsername.join(', ')}</span>
                                <span><span className="font-semibold text-blue-200">Description:</span> {cls.Description}</span>
                            </div>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                ) : (
                    <p className="text-white text-lg col-span-full text-center">No classes found.</p>
                )}
            </div>
        </div>
    )
}

export default Classes
