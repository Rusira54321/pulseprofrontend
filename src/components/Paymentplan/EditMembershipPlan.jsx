import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import paymentplan from "../Paymentplan/paymenttype.png"
import { motion } from 'framer-motion';
import { toast, Bounce } from "react-toastify"

const EditMembershipPlan = () => {
    const {id} = useParams()
    const [planID,setplanID] = useState("")
    const [planName,setPlanName] = useState("")
    const [Description,setDesription] = useState("")
    const [price,setprice] = useState(0)
    const [duration,setduration] = useState(0)
    const [durationUnit,setdurationUnit] = useState("")
    const URL = "http://localhost:5000/memberplan/getmembership"
    useEffect(()=>{
        const getplan = async() =>{
            await axios.post(URL,{
                "id":id
            }).then((res)=>{
                setplanID(res.data.membership.PlanID)
                setPlanName(res.data.membership.planName)
                setDesription(res.data.membership.description)
                setprice(res.data.membership.price)
                setduration(res.data.membership.duration)
                setdurationUnit(res.data.membership.durationUnit)
            })
        }
        getplan()
    },[])
    const updatedURL = "http://localhost:5000/memberplan/updatemembership"
    const handleSubmit = async(e) =>{
        e.preventDefault()
        await axios.post(updatedURL,{
            "id":id,
            "planName":planName,
            "Description":Description,
            "price":price,
            "duration":duration,
            "durationUnit":durationUnit
        }).then((res)=>{
            toast.success(res.data.message, {
                          position: "top-right",
                          autoClose: 5000,
                          theme: "dark",
                          transition: Bounce,
                        });
        }).catch((error)=>{
 toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
        })

    }
  return (
    <div className="flex w-full justify-center items-center min-h-screen bg-gradient-to-br from-amber-200 via-gray-900 to-black">
      <motion.div
        className="w-full max-w-5xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
      >
        <motion.div
          className="md:w-1/2 h-72 md:h-auto bg-amber-200 flex items-center justify-center"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
        >
          <img src={paymentplan} className="w-full h-full object-cover rounded-l-3xl" alt="Payment Plan" />
        </motion.div>
        <div className="flex-1 p-8 bg-gray-900 rounded-r-3xl flex flex-col justify-center">
          <motion.form
          onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 tracking-tight">Update Membership Plan</h2>
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <label className="text-white w-40 font-medium">Plan ID</label>
              <input type="text" disabled value={planID} required onChange={(e)=>{setplanID(e.target.value)}} className="flex-1 border border-gray-500 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-amber-400 outline-none transition" />
            </div>
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <label className="text-white w-40 font-medium">Plan Name</label>
              <input type="text" value={planName} required onChange={(e)=>{setPlanName(e.target.value)}} className="flex-1 border border-gray-500 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-amber-400 outline-none transition" />
            </div>
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <label className="text-white w-40 font-medium">Description</label>
              <textarea required rows={2} value={Description} onChange={(e)=>{setDesription(e.target.value)}} className="flex-1 border border-gray-500 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-amber-400 outline-none transition resize-none" />
            </div>
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <label className="text-white w-40 font-medium">Price</label>
              <input type="number" required min={0} value={price} onChange={(e)=>{setprice(e.target.value)}} className="flex-1 border border-gray-500 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-amber-400 outline-none transition" />
            </div>
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <label className="text-white w-40 font-medium">Duration</label>
              <input type="number" value={duration} required min={0} onChange={(e)=>{setduration(e.target.value)}} className="flex-1 border border-gray-500 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-amber-400 outline-none transition" />
            </div>
           <div className="flex flex-col md:flex-row gap-3 items-center">
  <label className="text-white w-40 font-medium">Duration Unit</label>
  <motion.select
    value={durationUnit}
    onChange={(e)=>{setdurationUnit(e.target.value)}}
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
    className="flex-1 border border-gray-500 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-amber-400 outline-none transition appearance-none"
  >
    <option value="">Choose duration unit</option>
    <option value="Day">Day</option>
    <option value="week">Week</option>
    <option value="month">Month</option>
    <option value="year">Year</option>
  </motion.select>
</div>
<motion.button
  type="submit"
  whileHover={{ scale: 1.07, backgroundColor: '#fbbf24' }}
  whileTap={{ scale: 0.97 }}
  className="mt-4 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold rounded-xl shadow-lg transition-all text-lg tracking-wide shadow-amber-200/40"
>
  Add
</motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  )
}

export default EditMembershipPlan
