// components/MonthlyRevenueChart.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const MonthlyRevenueChart = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchRevenue = async () => {
      const gym = localStorage.getItem('gymkey')
      try {
        const res = await axios.post(`http://localhost:5000/payment/getmonthlyrevenue`,{
            "key":gym
        })

        const raw = res.data.revenue
        const chartData = Array(12).fill(0).map((_, i) => ({
          month: new Date(0, i).toLocaleString('default', { month: 'short' }),
          revenue: 0
        }))

        raw.forEach(item => {
          chartData[item._id.month - 1].revenue = item.totalRevenue
        })

        setData(chartData)
      } catch (err) {
        console.error("Failed to fetch revenue:", err)
      }
    }

    fetchRevenue()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative w-full h-[400px] p-6 rounded-2xl shadow-xl bg-white/30 dark:bg-gray-900/40 backdrop-blur-md border border-white/20"
    >
      <div className="flex items-center justify-center mb-4 gap-2">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="text-3xl"
        >
          📊
        </motion.span>
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
          Monthly Revenue
        </h2>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ef" />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: 'rgba(255,255,255,0.95)', borderRadius: 12, border: '1px solid #f59e0b', boxShadow: '0 2px 12px #0001' }}
            itemStyle={{ color: '#f59e0b', fontWeight: 700 }}
            labelStyle={{ color: '#6366f1', fontWeight: 700 }}
            cursor={{ fill: 'rgba(245,158,11,0.08)' }}
          />
          <Bar
            dataKey="revenue"
            radius={[12, 12, 0, 0]}
            fill="url(#revenueGradient)"
            isAnimationActive={true}
            animationDuration={1200}
            barSize={32}
            style={{ filter: 'drop-shadow(0 2px 8px #f59e0b33)' }}
          />
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.95} />
              <stop offset="80%" stopColor="#fbbf24" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.3} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
      {/* Animated accent at the bottom */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 0.5, duration: 1, type: 'spring' }}
        className="absolute left-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-500 shadow-lg"
      />
    </motion.div>
  )
}

export default MonthlyRevenueChart
