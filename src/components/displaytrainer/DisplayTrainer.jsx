import React, { useEffect, useState } from 'react'
import axios from "axios"
import {toast,Bounce} from "react-toastify"

const DisplayTrainer = () => {
    const [trainers,settrainers] = useState([])
    const [searchTerm,setsearchTerm] = useState("")
    const url = "http://localhost:5000/trainer/deletetrainer"
   const handledelete = async(id,username)=>{
     await axios.post(url,{
        "id":id,
        "username":username
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
        settrainers(prevtrainer=>prevtrainer.filter(trainer=>trainer._id!==id))
     }).catch((error)=>{
            alert(error)
     })
   }
    useEffect(()=>{
        const key = localStorage.getItem("gymkey")
        const URL = "http://localhost:5000/trainer/gettrainer"
        const gettrainerdata = async() =>{
                await axios.post(URL,{
                        "key":key
                }).then((res)=>{
                        settrainers(res.data.trainers)
                }).catch((error)=>{
                    alert(error)
                })
        }
        gettrainerdata()
    },[])
    const filteredtrainers = trainers.filter(trainer=>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className='flex-col w-full min-h-full bg-gray-800'>
        <div className='flex justify-center '>
                <h1 className='text-white mt-5 font-bold text-4xl'>Trainers</h1>
        </div>
        <div className='flex mt-10 h-30 justify-center w-full'>
            <input type='text'  value={searchTerm} onChange={(e)=>{setsearchTerm(e.target.value)}} className='w-1/2 h-1/2 border-2 border-b-black rounded-bl-xl p-2 text-amber-100' placeholder='Search member'></input>
        </div>
           <div className='flex  h-full w-full'>
            <div className='grid ml-16 w-full mb-10 h-full grid-cols-3 gap-x-10 gap-y-12'>
                        {
                            filteredtrainers.length!==0 && filteredtrainers.map((trainer)=>(
                                <div key={trainer._id} className='flex-col bg-gray-700 w-75 h-100 rounded-2xl transform transition-transform duration-500
      hover:scale-105 hover:shadow-2xl hover:shadow-green-400
      animate-fadeInUp'>
                                        <div className='flex mt-3 text-green-400 font-bold text-2xl justify-center'>
                                            <p className='font-serif'>{trainer.name}</p>
                                        </div>
                                        <div className='flex mt-4 justify-center'>
                                              <div className="absolute w-[120px] h-[120px] rounded-full bg-green-400 blur-xl opacity-50"></div>
                                            <img src={`http://localhost:5000/images/${trainer.profileimage}`}  className='w-[120px] h-[120px] rounded-full object-cover bg-green-100 transition-transform duration-300 hover:scale-110 z-10'></img>
                                        </div>
                                        <div className='flex mt-3 text-green-400 font-bold text-lg justify-center'>
                                            <p className='font-serif'>Gender : {trainer.gender}</p>
                                        </div>
                                        <div className='flex mt-3 text-green-400 font-bold text-lg justify-center'>
                                            <p className='font-serif'>No of students : {trainer.noOfstudents}</p>
                                        </div>
                                        <div className='flex mt-3 text-green-400 font-bold text-lg justify-center'>
                                            <p className='font-serif'>Phone : {trainer.phone}</p>
                                        </div>
                                        <div className='flex mt-3 text-green-400 font-bold text-lg justify-center'>
                                            <p className='font-serif'>Email : {trainer.email}</p>
                                        </div>
                                        <div className='flex mt-1 justify-center gap-1.5'>
                                                <button onClick={()=>{
                                                    handledelete(trainer._id,trainer.username)
                                                }} className="px-4 py-1.5 cursor-pointer bg-rose-500 text-white rounded-md shadow hover:bg-rose-600 hover:scale-105 transition-all duration-300 ease-in-out">Delete</button>
                                                <button className="px-4 py-1.5 cursor-pointer bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-600 hover:scale-105 transition-all duration-300 ease-in-out">Edit</button>
                                        </div>
                                </div>
                            ))
                        }
            </div>
        </div>
    </div>
  )
}

export default DisplayTrainer
