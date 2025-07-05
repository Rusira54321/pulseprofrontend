import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

const gridItemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.12, duration: 0.6, type: "spring" }
  })
}

const MemberDashboard = () => {
  const [name, setname] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    const key = localStorage.getItem("memberkey")
    const getmembername = async () => {
      await axios.post("http://localhost:5000/get/getmembername",
        {
          "username": key
        }
      ).then((res) => {
        setname(res.data.name)
      })
    }
    getmembername()
  }, [])

  const quickLinks = [
    {
      to: "/member/workoutplan",
      bg: "from-green-400/90 to-green-600/90 border-green-300/30",
      icon: "🏋️‍♂️",
      title: "Workout Plans",
      hover: "group-hover:text-green-900",
      desc: "View and follow your custom workout routines.",
      text: "text-green-100"
    },
    {
      to: "/member/dietplan",
      bg: "from-yellow-400/90 to-yellow-600/90 border-yellow-300/30",
      icon: "🥗",
      title: "Diet Plans",
      hover: "group-hover:text-yellow-900",
      desc: "Check your meal plans and nutrition advice.",
      text: "text-yellow-100"
    },
    {
      to: "/member/classes",
      bg: "from-red-400/90 to-red-600/90 border-red-300/30",
      icon: "📅",
      title: "Classes",
      hover: "group-hover:text-red-900",
      desc: "See your upcoming and past class schedules.",
      text: "text-red-100"
    },
    {
      to: "/member/seenotification",
      bg: "from-amber-400/90 to-amber-600/90 border-amber-300/30",
      icon: "🔔",
      title: "Notifications",
      hover: "group-hover:text-amber-900",
      desc: "Stay updated with the latest alerts and news.",
      text: "text-amber-100"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 relative">
      {/* Back Arrow Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute cursor-pointer top-6 left-6 z-30 bg-gray-900/80 hover:bg-gray-800 text-green-400 rounded-full p-3 shadow-lg transition-all duration-200"
        aria-label="Go Back"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Greeting Card */}
      <div className="flex w-full justify-center mt-16">
        <motion.div
          className="bg-gradient-to-br from-green-900/70 via-gray-900/80 to-green-800/60 px-10 py-12 rounded-3xl shadow-2xl border border-green-400/30 flex flex-col items-center max-w-2xl w-full"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-green-300 font-mono mb-3 text-center drop-shadow-lg flex items-center gap-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span className="text-4xl md:text-5xl">👋</span>
            Welcome, <span className="text-white">{name}</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-emerald-100 text-center font-mono mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            Glad to see you back at <span className="text-green-400 font-bold">PulsePro</span>!
          </motion.p>
          <motion.p
            className="text-base md:text-lg text-gray-300 text-center font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Explore your personalized dashboard and make the most of your fitness journey.
          </motion.p>
        </motion.div>
      </div>

      {/* Dashboard Quick Links */}
      <div className="flex w-full justify-center">
        <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 px-6 mt-16">
          {quickLinks.map((item, i) => (
            <Link to={item.to} key={item.title}>
              <motion.div
                className={`group flex flex-col items-center justify-center w-full h-44 bg-gradient-to-br ${item.bg} rounded-2xl shadow-xl border-2 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                custom={i}
                variants={gridItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="text-4xl mb-2">{item.icon}</span>
                <h2 className={`text-xl font-bold text-white font-mono mb-1 transition ${item.hover}`}>{item.title}</h2>
                <p className={`text-sm font-mono text-center ${item.text}`}>{item.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MemberDashboard