import React, { useEffect, useState } from 'react'
import axios from "axios"
import {toast,Bounce} from "react-toastify"
import member from "../Addmember/member.jpg"
const Addmember = () => {
    const getUrl = "http://localhost:5000/trainer/gettrainername"
 
    const [name,setName] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [height,setheight] = useState("")
    const [weight,setweight] = useState("")
    const [trainer,setTrainer] = useState("")
    const [data,setdata] = useState([])
    const [profile,setprofile] = useState(null)
      
    useEffect(()=>{
        const key = localStorage.getItem("gymkey")
        const getdetails = async() =>{
        const URL = "http://localhost:5000/trainer/gettrainer"
            await axios.post(URL,{
                "key":key
            }).then((res)=>{
                setdata(res.data.trainers)
            }).catch((error)=>{
                console.log(error)
            })
        }
        getdetails()
    },[])
    const handleSubmit = async (e) => {
    e.preventDefault();
    const key = localStorage.getItem("gymkey");

    try {
        // Get trainer's name based on username
        const res = await axios.post(getUrl, { username: trainer });
        const trainerNameFromServer = res.data.name;

        const formdata = new FormData();
        formdata.append("trainername", trainerNameFromServer); // ✅ Correct usage here
        formdata.append("name", name);
        formdata.append("username", username);
        formdata.append("password", password);
        formdata.append("height", height);
        formdata.append("weight", weight);
        formdata.append("trainer", trainer);
        formdata.append("profile", profile);
        formdata.append("key", key);

        const urls = "http://localhost:5000/multer/addmember";

        await axios.post(urls, formdata);
        toast.success("Member added successfully", {
            position: "top-right",
            autoClose: 5000,
            theme: "light",
            transition: Bounce,
        });

    } catch (error) {
        toast.warn(error.response?.data?.message || "Error adding member", {
            position: "top-right",
            autoClose: 5000,
            theme: "light",
            transition: Bounce,
        });
    }
};
  return (
    <div className='flex w-full justify-center items-center h-screen bg-black'>
        <div className='w-3/4 bg-gray-200 h-3/4 flex rounded-2xl'>
            <div className='w-1/2 h-full bg-amber-200 rounded-l-2xl flex'>
                <img src={member} className='w-full h-full object-cover  rounded-l-2xl'/>
            </div>
            <div className='w-3/4 h-full bg-gray-900 rounded-r-2xl'>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <div className='flex justify-center'>
                            <div>
                                <p className='font-mono text-3xl text-white mt-2'>Add Member</p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>Name</p>
                             <input type='text' onChange={(e)=>{setName(e.target.value)}} required className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>User Name</p>
                             <input type='text' required onChange={(e)=>{setUsername(e.target.value)}} className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                       <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>Password</p>
                             <input type='password' required  onChange={(e)=>{setPassword(e.target.value)}} className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>Height in cm</p>
                             <input type='number' required  onChange={(e)=>{setheight(e.target.value)}} className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>Weight in kg</p>
                             <input type='number' required  onChange={(e)=>{setweight(e.target.value)}} className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'></input>
                        </div>
                        <div className='flex gap-2'>
                             <p className='text-white ml-25 mt-4 w-1/2'>Trainer</p>
                             <select required  onChange={(e)=>{setTrainer(e.target.value)}}className='w-1/2 mr-15 mt-4 border border-gray-400 rounded px-3 py-2 text-white'>
                                <option value="" className='bg-gray-800'>Select trainer</option>
                                {data.map((data)=>(
                                    <option key={data._id} value={data.username} className='bg-gray-800'>
                                            {data.name}
                                    </option>
                                ))}
                             </select>
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
                                <button type="submit" className='font-mono cursor-pointer' >Add</button>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Addmember
