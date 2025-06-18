import React, { useEffect, useState } from 'react'
import axios from "axios"
import {toast,Bounce} from "react-toastify"

const Members = () => {
    const URL = "http://localhost:5000/get/getmembers"
    const [members,setmembers] = useState([])
    const [searchTerm,setsearchTerm] = useState("")
    const delURL = "http://localhost:5000/get/deletemember"
    const memberdelete = async(id) =>{
        await axios.post(delURL,{
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
                                            theme: "light",
                                            transition: Bounce,
                                            });
            setmembers(prevmembers=>prevmembers.filter(member=>member._id!==id))
        }).catch((error)=>{
            alert(error)
        })
        
    }
  useEffect(()=>{
    const key = localStorage.getItem("gymkey")
    const getmembers = async() =>{ 
        await axios.post(URL,{
            "key":key
        }).then((res)=>{
            setmembers(res.data.member)
        })
    }
    getmembers()
  },[])  
  
  const filteredmembers = members.filter(member=>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className='flex-col  min-h-full bg-gray-800'>
        <div className='flex h-30 justify-center w-full'>
            <h1 className='mt-10 text-white text-4xl font-bold'>Members</h1>
        </div>
        <div className='flex h-30 justify-center w-full'>
            <input type='text'  value={searchTerm} onChange={(e)=>{setsearchTerm(e.target.value)}} className='w-1/2 h-1/2 border-2 border-b-black rounded-bl-xl p-2 text-amber-100' placeholder='Search member'></input>
        </div>
        <div className='flex  h-full w-full'>
            <div className='grid ml-16 w-full mb-10 h-full grid-cols-3 gap-x-10 gap-y-12'>
                        {
                            filteredmembers.length!==0 && filteredmembers.map((member)=>(
                                <div key={member._id} className='flex-col bg-gray-700 w-75 h-100 rounded-2xl transform transition-transform duration-500
      hover:scale-105 hover:shadow-2xl hover:shadow-amber-400
      animate-fadeInUp'>
                                        <div className='flex mt-3 text-yellow-200 font-bold text-2xl justify-center'>
                                            <p className='font-serif'>{member.name}</p>
                                        </div>
                                        <div className='flex mt-4 justify-center'>
                                              <div className="absolute w-[120px] h-[120px] rounded-full bg-amber-400 blur-xl opacity-50"></div>
                                            <img src={`http://localhost:5000/images/${member.profileimage}`}  className='w-[120px] h-[120px] rounded-full object-cover bg-amber-100 transition-transform duration-300 hover:scale-110 z-10'></img>
                                        </div>
                                        <div className={`flex mt-3  font-bold text-lg justify-center ${member.trainer==="No Trainer" ? 'text-red-500':'text-yellow-100'}`}>
                                            <p className='font-serif'>Trainer : {member.trainer}</p>
                                        </div>
                                        <div className='flex mt-3 text-yellow-100 font-bold text-lg justify-center'>
                                            <p className='font-serif'>Height : {member.heightincm} CM</p>
                                        </div>
                                        <div className='flex mt-3 text-yellow-100 font-bold text-lg justify-center'>
                                            <p className='font-serif'>Weight : {member.weightinkg} KG</p>
                                        </div>
                                        <div className={`flex mt-3  font-bold text-lg justify-center ${member.paymentStatus==="none" ? 'text-red-500':'text-yellow-100'}`}>
                                            <p className='font-serif'>
                                                Payment Status : {member.paymentStatus=== "none" ? "Not Done":"Done"} 
                                            </p>
                                        </div>
                                        <div className='flex mt-1 justify-center gap-1.5'>
                                                <button className="px-4 py-1.5 cursor-pointer bg-rose-500 text-white rounded-md shadow hover:bg-rose-600 hover:scale-105 transition-all duration-300 ease-in-out" onClick={()=>{
                                                    memberdelete(member._id)
                                                }}>Delete</button>
                                                <button className="px-4 py-1.5 cursor-pointer bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-600 hover:scale-105 transition-all duration-300 ease-in-out">Edit</button>
                                                <button className="px-4 py-1.5 cursor-pointer bg-emerald-500 text-white rounded-md shadow hover:bg-emerald-600 hover:scale-105 transition-all duration-300 ease-in-out">Pay</button>
                                        </div>
                                </div>
                            ))
                        }
                        {filteredmembers.length === 0 && (
          <p className="col-span-full text-center text-gray-400">No Members found</p>
        )}
            </div>
        </div>
    </div>
  )
}

export default Members
