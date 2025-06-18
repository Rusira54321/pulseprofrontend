import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {toast,Bounce} from "react-toastify"
import trainer from "../Trainerlogin/trainer.jpg"
const Trainerlogin = () => {
    const navigate = useNavigate()
  const [username,setusername] = useState("")
  const [password,setpassword] = useState("")
  const handleSubmit = async(e) =>{
        e.preventDefault()
        const url = "http://localhost:5000/trainer/login"
        await axios.post(url,{
            username,password
        }).then((res)=>{
                localStorage.setItem("trainertoken",res.data.token)
                navigate("/trainer/dashboard")
        }).catch((error)=>{
                 toast.warn(error.response.data.message, {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                        transition: Bounce,
                                        });
        })
  }
  return (
    <div className='flex justify-center items-center h-screen bg-black'>
        <div className='w-3/4 bg-gray-200 h-3/4 flex rounded-2xl'>
            <div className='w-1/2 h-full bg-amber-200 rounded-l-2xl flex'>
                <img src={trainer} className='w-full h-full object-cover object-top rounded-l-2xl'/>
            </div>
            <div className='w-1/2 h-full bg-gray-900 rounded-r-2xl'>
                    <form  onSubmit={handleSubmit} className='flex flex-col'>
                    <div className='flex justify-center'>
                        <div>
                            <p className='font-mono text-3xl text-white mt-35'>Login</p>
                        </div>
                    </div>
                    <div className='flex ml-17 mr-8 font-mono mt-10'>
                                <div className='w-1/4 h-full'>
                                    <p className='text-white mt-2'>User Name</p>
                                </div>
                                <div className='w-3/4 h-full'>
                                    <input type='text' onChange={(e)=>{setusername(e.target.value)}} className='w-full border border-gray-400 rounded px-3 py-2 text-white'/>
                                </div>
                    </div>
                    <div className='flex ml-17 mr-8 font-mono mt-10'>
                                <div className='w-1/4 h-full'>
                                    <p className='text-white mt-2'>Password</p>
                                </div>
                                <div className='w-3/4 h-full'>
                                    <input type='password' onChange={(e)=>{setpassword(e.target.value)}} className='w-full border border-gray-400 rounded px-3 py-2 text-white'/>
                                </div>
                    </div>
                   
                    <div className='flex justify-center mt-10'>
                        <div className='h-6 w-20 bg-gray-300 flex justify-center items-center'>
                                <button type="submit" className='font-mono cursor-pointer'>Login</button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default Trainerlogin
