import React from 'react'
import member from "../Addmember/member.jpg"
const Addmember = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-black'>
        <div className='w-3/4 bg-gray-200 h-3/4 flex rounded-2xl'>
            <div className='w-1/2 h-full bg-amber-200 rounded-l-2xl flex'>
                <img src={member} className='w-full h-full object-cover  rounded-l-2xl'/>
            </div>
            <div className='w-1/2 h-full bg-gray-900 rounded-r-2xl'>
                    <form className='flex flex-col'>
                        <div className='flex justify-center'>
                            <div>
                                <p className='font-mono text-3xl text-white mt-2'>Add Member</p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>Name</p>
                             <input type='text'  required className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>User Name</p>
                             <input type='text' required  className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                       <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>Password</p>
                             <input type='password' required  className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>Height in cm</p>
                             <input type='number' required  className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>Weight in kg</p>
                             <input type='number' required  className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>profile</p>
                             <input
                            type="file" required onChange={(e)=>{setprofile(e.target.files[0])}}
                            className="block mt-4 ml-15 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
/>
                        </div>
                        <div className='flex'>
                            <div className=' mt-7 ml-60 h-6 w-20 bg-gray-300 flex justify-center items-center'>
                                <button type="submit" className='font-mono cursor-pointer'>Add</button>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Addmember
