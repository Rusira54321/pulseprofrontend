import React from 'react'
import {Link} from "react-router-dom"
import loginimage from "./login1.jpg"
function Signup() {
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
                            <p className='font-mono text-3xl text-white mt-10'>Sign up</p>
                        </div>
                    </div>
                    <div className='flex ml-17 mr-8 font-mono mt-10'>
                                <div className='w-1/4 h-full'>
                                    <p className='text-white mt-2'>Gym Name</p>
                                </div>
                                <div className='w-3/4 h-full'>
                                    <input type='text' className='w-full border border-gray-400 rounded px-3 py-2 text-white'/>
                                </div>
                    </div>
                    <div className='flex ml-17 mr-8 font-mono mt-10'>
                                <div className='w-1/4 h-full'>
                                    <p className='text-white mt-2'>User Name</p>
                                </div>
                                <div className='w-3/4 h-full'>
                                    <input type='text' className='w-full border border-gray-400 rounded px-3 py-2 text-white'/>
                                </div>
                    </div>
                    <div className='flex ml-17 mr-8 font-mono mt-10'>
                                <div className='w-1/4 h-full'>
                                    <p className='text-white mt-2'>Email</p>
                                </div>
                                <div className='w-3/4 h-full'>
                                    <input type='email' className='w-full border border-gray-400 rounded px-3 py-2 text-white'/>
                                </div>
                    </div>
                    <div className='flex ml-17 mr-8 font-mono mt-10'>
                                <div className='w-1/4 h-full'>
                                    <p className='text-white mt-2'>Password</p>
                                </div>
                                <div className='w-3/4 h-full'>
                                    <input type='password' className='w-full border border-gray-400 rounded px-3 py-2 text-white'/>
                                </div>
                    </div>
                    <div className='flex justify-center mt-10'>
                        <div className='h-6 w-20 bg-gray-300 flex justify-center items-center'>
                                <button type="submit" className='font-mono cursor-pointer'>Sign Up</button>
                        </div>
                    </div>
                    <div className='font-mono flex justify-center mt-2 text-white'>
                        <p>Already have an account <Link to="/">LogIn</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup
