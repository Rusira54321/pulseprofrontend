import React, { useState } from 'react'
import axios from "axios"
import {toast,Bounce} from "react-toastify"
import {Link,useNavigate} from "react-router-dom"
import loginimage from "../Login/login.jpg"
const Login = () => {
    const navigate = useNavigate()
    const URL = "http://localhost:5000/auth/authgym"
    const [username,setusername] = useState('')
    const [password,setPassword] = useState('')
    const handlesubmit = async(e)=>{
        e.preventDefault()
        await axios.post(URL,{
            username:username,
            password:password
        }).then((res)=>{
            navigate("/gymdash")
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("gymkey",username)
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
                <img src={loginimage} className='w-full h-full object-cover object-top rounded-l-2xl'/>
            </div>
            <div className='w-1/2 h-full bg-gray-900 rounded-r-2xl'>
                    <form className='flex flex-col'>
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
                                    <input type='text' value={username} onChange={(e)=>{setusername(e.target.value)}} className='w-full border border-gray-400 rounded px-3 py-2 text-white'/>
                                </div>
                    </div>
                    <div className='flex ml-17 mr-8 font-mono mt-10'>
                                <div className='w-1/4 h-full'>
                                    <p className='text-white mt-2'>Password</p>
                                </div>
                                <div className='w-3/4 h-full'>
                                    <input type='password' onChange={(e)=>{setPassword(e.target.value)}} className='w-full border border-gray-400 rounded px-3 py-2 text-white'/>
                                </div>
                    </div>
                    <div className='flex justify-end'>
                            <div>
                                <p className='font-mono mr-10 mt-2 text-white'><Link to="/email">Forget password</Link></p>
                            </div>
                    </div>
                    <div className='flex justify-center mt-10'>
                        <div className='h-6 w-20 bg-gray-300 flex justify-center items-center'>
                                <button type="submit" className='font-mono cursor-pointer' onClick={handlesubmit}>Login</button>
                        </div>
                    </div>
                    <div className='font-mono flex justify-center mt-1 text-white'>
                        <p>Don't have an account <Link to="/signup">Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login
    