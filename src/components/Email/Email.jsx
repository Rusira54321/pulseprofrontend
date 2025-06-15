import React from 'react'
import axios from "axios"
import {toast,Bounce} from "react-toastify"
import image12 from "../Email/email.jpg"
import { useState } from 'react'
import {useNavigate} from "react-router-dom"
const Email = () => {
    const navigate = useNavigate()
    const URL = "http://localhost:5000/auth/email"
    const [email,setEmail] = useState('')
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const emails = localStorage.getItem("preferedemail")
        if(emails!=email)
        {
             toast.warn("the email is not correct", {
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
        }
        else{
        await axios.post(URL,{
            email:email
        }).then(()=>{
                toast.success('OTP is send to your email', {
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
                localStorage.setItem("email",email)
                navigate("/otp")
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
    }
  return (
    <div className='flex justify-center items-center h-screen bg-black'>
        <div className='w-3/4 bg-gray-200 h-3/4 flex rounded-2xl'>
            <div className='w-1/2 h-full bg-amber-200 rounded-l-2xl flex'>
                <img src={image12} className='w-full h-full object-cover  rounded-l-2xl'/>
            </div>
            <div className='w-1/2 h-full bg-gray-900 rounded-r-2xl'>
                    <form className='flex flex-col'>
                        <div className='flex justify-center mt-40 text-2xl text-white font-mono'>
                            <h1>Enter your email</h1>
                        </div>
                        <div className='flex justify-center'>
                            <input onChange={(e)=>{setEmail(e.target.value)}} className="w-1/2 mt-7 border border-gray-400 rounded px-3 py-2 text-white" type='email'/>
                        </div>
                        <div  className='flex justify-center'>
                            <div className=' mt-5 h-6 w-20 bg-gray-300 flex justify-center items-center'>
                                <button type="submit" className='font-mono cursor-pointer' onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </form>
            </div>
        </div>
    </div>
  )
}

export default Email
