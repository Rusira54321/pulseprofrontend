import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios  from 'axios';
import { motion } from 'framer-motion';
import { toast, Bounce } from "react-toastify"

import { useState } from 'react';
const UpdateTrainer = () => {
    const [images,setimages] = useState("")
    const [name,setname] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [dob,setDOB] = useState("")
    const [gender,setGender] = useState("")
    const {id} = useParams()
    const URL = "http://localhost:5000/trainer/getTrainerbyid"
    useEffect(()=>{
        const gettrainer = async() =>{
        await axios.post(URL,{
            "id":id
        }).then((res)=>{
            setimages(res.data.Trainer.profileimage)
            setname(res.data.Trainer.name)
            setUsername(res.data.Trainer.username)
            setPassword(res.data.Trainer.password)
            setEmail(res.data.Trainer.email)
            setPhone(res.data.Trainer.phone)
            setGender(res.data.Trainer.gender)
        })
        }
        gettrainer()
    },[])
    const handleSubmit = async(e) =>{
            const URL = "http://localhost:5000/trainer/updateTrainer"
            e.preventDefault()
            await axios.post(URL,{
                "password":password,
                "email":email,
                "phone":phone,
                "id":id
            }).then((res)=>{
toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
            }).catch((error)=>{
                     toast.error(error.response.data.message, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                                transition: Bounce,
                              });
            })
    }
    const inputStyles = "w-1/2 mr-15 mt-4 px-4 py-2 rounded-xl border border-gray-400 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out";

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };
  return (
      <div className='flex justify-center items-center w-full h-screen bg-gray-800'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='w-4/5 bg-gray-200 h-[85%] flex rounded-2xl shadow-2xl'
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className='w-1/2 h-full bg-amber-200 rounded-l-2xl flex'
            >
              <motion.img
                src={`http://localhost:5000/images/${images}`}
                alt="trainer Profile"
                className='w-full h-full object-cover rounded-l-2xl'
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </motion.div>
    
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className='w-3/4 h-full bg-gray-900 rounded-r-2xl p-6 overflow-y-auto'
            >
              <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='flex justify-center mb-6'>
                  <motion.p
                    className='font-mono text-4xl text-white mt-2'
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Update Trainer details
                  </motion.p>
                </div>
    
                {[
                  { label: "Name", value: name,  setter: setname, type: "text",disabled:true },
                  { label: "User Name", value: username, setter:setUsername , type: "text",disabled:true },
                  { label: "Password", value: password, setter:setPassword , type: "password" },
                  { label: "Email", value: email, setter:setEmail , type: "email" },
                  { label: "Phone", value: phone, setter:setPhone, type: "tel" },
                  { label: "DOB", value: dob, setter:setDOB , type: "date",disabled:true },
                ].map((field, index) => (
                  <motion.div
                    key={index}
                    className='flex gap-2'
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={formVariants}
                  >
                    <p className='text-white mt-4 w-1/2'>{field.label}</p>
                    <input
                      type={field.type}
                      value={field.value}
                      disabled={field.disabled}
                      onChange={(e) => field.setter(e.target.value)}
                      required
                        className={`${inputStyles} ${field.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                  </motion.div>
                ))}
    
                <motion.div className='flex gap-2' custom={5} initial="hidden" animate="visible" variants={formVariants}>
                  <p className='text-white mt-4 w-1/2'>Gender</p>
                  <select value={gender} disabled onChange={(e) => setGender(e.target.value)} required className={`${inputStyles} opacity-50 cursor-not-allowed`}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    
                  </select>
                </motion.div>
    
          
    
                <motion.div className='flex gap-2' custom={7} initial="hidden" animate="visible" variants={formVariants}>
                  <p className='text-white mt-4 w-1/2'>Profile</p>
                  <input
                    type="file"
                    disabled
                    
                   
                    required
                    className="mt-4 ml-15 w-full text-sm text-white file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-600 file:text-white
                    hover:file:bg-blue-700 transition-all duration-300 ease-in-out"
                  />
                </motion.div>
    
                <motion.div
                  className='flex'
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    type="submit"
                    className='mt-7 ml-60 h-10 w-24 bg-gradient-to-r cursor-pointer from-green-400 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:from-green-500 hover:to-blue-600 transition-transform duration-300 ease-in-out'
                  >
                    Update
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
  )
}

export default UpdateTrainer
