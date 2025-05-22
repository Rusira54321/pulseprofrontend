import React, { useState } from 'react'
import axios from "axios"
import {toast,Bounce} from "react-toastify"
import gymtrainer from "../addtrainer/gymtrainer.jpg"
const Addtrainer = () => {
  const [name,setname]  = useState('')
  const [username,setusername] = useState("")
  const [password,setpassword] = useState("")
  const [email,setemail] =useState("")
  const [phone,setphone] = useState("")
  const [gender,setgender] = useState("")
  const [dob,setdob] = useState("")
  const [profile,setprofile] = useState(null)
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("profile",profile)
    formdata.append("name",name)
    formdata.append("username",username)
    formdata.append("password",password)
    formdata.append("email",email)
    formdata.append("phone",phone)
    formdata.append("gender",gender)
    formdata.append("dob",dob)
    const url = "http://localhost:5000/multer/upload"
    await axios.post(url,formdata).then(()=>{
        toast.success('Trainer added successfully', {
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
                <img src={gymtrainer} className='w-full h-full object-cover object-top rounded-l-2xl'/>
            </div>
            <div className='w-1/2 h-full bg-gray-900 rounded-r-2xl'>
                    <form className='flex flex-col'>
                        <div className='flex justify-center'>
                            <div>
                                <p className='font-mono text-3xl text-white mt-2'>Add Trainer</p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>Name</p>
                             <input type='text' onChange={(e)=>{setname(e.target.value)}} required className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>User Name</p>
                             <input type='text' required onChange={(e)=>{setusername(e.target.value)}} className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>Password</p>
                             <input type='password'  required onChange={(e)=>{setpassword(e.target.value)}} className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>Email</p>
                             <input type='email' required onChange={(e)=>{setemail(e.target.value)}} className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>Phone</p>
                             <input type='tel' required onChange={(e)=>{setphone(e.target.value)}} className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>Gender</p>
                             <select required onChange={(e)=>{setgender(e.target.value)}} className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'>
                                 <option value="" disabled className='bg-gray-800'>Select gender</option>
                                <option value="Male" className='bg-gray-800'>Male</option>
                                <option value="Female" className='bg-gray-800'>Female</option>
                                <option value="Other" className='bg-gray-800'>Other</option>
                             </select>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>DOB</p>
                             <input type='date' onChange={(e)=>{setdob(e.target.value)}}required  className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
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
                                <button type="submit" className='font-mono cursor-pointer' onClick={handleSubmit}>Add</button>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Addtrainer
