import React, { useState } from 'react'
import axios from "axios"
import {Bounce,toast} from "react-toastify"
import usernameimage from "../Username/username.jpg"
import { useNavigate } from 'react-router-dom'
const Username = () => {
    const navigate = useNavigate()
    const [username,setUsername]  = useState('')
    const URl ="http://localhost:5000/auth/getemail"
    const handleSubmit = async(e) =>{
        e.preventDefault()
        await axios.post(URl,{
            username:username
        }).then((res)=>{
            toast.success(res.data.message, {
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
            localStorage.setItem("preferedemail",res.data.email)
            navigate("/email")
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
                    <img src={usernameimage} className='w-full h-full object-cover  rounded-l-2xl'/>
                </div>
                <div className='w-1/2 h-full bg-gray-900 rounded-r-2xl'>
                        <form onSubmit={handleSubmit} className='flex flex-col'>
                            <div className='flex justify-center mt-40 text-2xl text-white font-mono'>
                                <h1>Enter your username</h1>
                            </div>
                            <div className='flex justify-center'>
                                <input onChange={(e)=>{setUsername(e.target.value)}} className="w-1/2 mt-7 border border-gray-400 rounded px-3 py-2 text-white" type='text'/>
                            </div>
                            <div  className='flex justify-center'>
                                <div className=' mt-5 h-6 w-20 bg-gray-300 flex justify-center items-center'>
                                    <button type="submit" className='font-mono cursor-pointer' >Submit</button>
                                </div>
                            </div>
                        </form>
                </div>
            </div>
        </div>
  )
}

export default Username
