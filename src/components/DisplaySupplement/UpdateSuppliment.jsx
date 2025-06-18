import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
const UpdateSuppliment = () => {
    const {id} = useParams()
    useEffect(()=>{
        const getdata = async() =>{
        const URL = "http://localhost:5000/suppliment/getSuppliment"
        await axios.post(URL,{
            "id":id
        }).then((res)=>{
            console.log(res)
        })
    }
    getdata()
    },[])
  return (
    <div className='flex w-full h-screen bg-gray-800'>
        
    </div>
  )
}

export default UpdateSuppliment
