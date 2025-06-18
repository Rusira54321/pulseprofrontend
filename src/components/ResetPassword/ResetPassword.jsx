import React from 'react'
import image12 from "../ResetPassword/reset.jpg"
import { useState } from 'react'
import { toast,Bounce } from 'react-toastify'
import {useNavigate} from "react-router-dom"
import axios from "axios"
const ResetPassword = () => {
    const navigate = useNavigate()
    const URL = "http://localhost:5000/auth/reset"
    const email = localStorage.getItem("email")
    const [newpassword,setnewpassword] = useState('')
    const handleSubmit = async(e) =>{
        e.preventDefault()
        await axios.post(URL,{
                email:email,
                password:newpassword
        }).then(()=>{
                toast.success('Password reset successfully', {
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
                navigate("/login")  
                localStorage.removeItem("email")
                localStorage.removeItem("preferedemail")
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
                        <img src={image12} className='w-full h-full object-cover object-left rounded-l-2xl'/>
                    </div>
                    <div className='w-1/2 h-full bg-gray-900 rounded-r-2xl'>
                            <form onSubmit={handleSubmit} className='flex flex-col'>
                                <div className='flex justify-center mt-40 text-2xl text-white font-mono'>
                                    <h1>Enter the new password</h1>
                                </div>
                                <div className='flex justify-center'>
                                    <input onChange={(e)=>{setnewpassword(e.target.value)}} className="w-1/2 mt-7 border border-gray-400 rounded px-3 py-2 text-white" type='password'/>
                                </div>
                                <div  className='flex justify-center'>
                                    <div className=' mt-5 h-6 w-20 bg-gray-300 flex justify-center items-center'>
                                        <button type="submit"  className='font-mono cursor-pointer'>Submit</button>
                                    </div>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
  )
}

export default ResetPassword
