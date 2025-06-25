import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
const UpdateWorkout = () => {
    const [workout,setworkout] = useState({})
    const {id} = useParams()
    useEffect(()=>{
            const URL = "http://localhost:5000/workout/getworkoutplanbyid"
            const getworkout = async() =>{
                await axios.post(URL,{
                    "id":id
                }).then((res)=>{
                    setworkout(res.data.workout)
                })
            }
            getworkout()
    },[])
  return (
    <div className='flex w-full min-h-screen bg-gray-800'>
      
    </div>
  )
}

export default UpdateWorkout
