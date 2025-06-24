import React, { useEffect, useState } from 'react'
import axios from "axios"
const WorkoutPlan = () => {
  const URL = "http://localhost:5000/get/getmemberbyTrainer"
  const [members,setmembers] = useState([])
  useEffect(()=>{
    const username = localStorage.getItem("trainerusername")
      const getmembers = async() =>{
          await axios.post(URL,{
              "username":username
          }).then((res)=>{
            setmembers(res.data.members)
          })
      }
      getmembers()
  },[])
  const [form,setform] = useState({
    memberUsername:"",
    planname:"",
    goal:"",
    workouts:[]
  })
  const handleExerciseChange =(dayIndex,exIndex,field,value) =>{
      const updated = [...form.workouts]
      updated[dayIndex].exercises[exIndex][field] = value
      setform({...form,workouts:updated})
  }
  const addDay = (day) =>{
      const exists = form.workouts.find(w=>w.day===day)
      if(!exists)
      {
        setform(prev=>({
          ...prev,
          workouts:[...prev.workouts,{
            day,
            exercises:[{
              name:"",
              sets:"",
              reps:""
            }]
          }]
        }))
      }
  }
  const addExercise = (dayindex) =>{
      const updated = [...form.workouts]
      updated[dayindex].exercises.push({name:"",sets:"",reps:""})
      setform({...form,workouts:updated})
  }
  const handleSubmit = (e) =>{
      e.preventDefault()
      console.log(form)
  }
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
  return (
    <div className='flex flex-col w-full  min-h-screen bg-gray-800'>
      <div className='flex w-full mt-8 mb-4 justify-center'>
          <h2 className='text-2xl text-white  font-bold'>Create Workout plan</h2>
      </div>
      <div className='flex flex-col  items-center'>
        <div className='p-15 bg-blue-300 rounded-2xl' >
      <form onSubmit={handleSubmit} className='space-y-4 '>
          <select onChange={(e)=>setform({...form,
              memberUsername:e.target.value
          })} className='w-full p-2 border text-black border-black rounded' required>
                <option value="" className='bg-white'>Select Member</option>
                {
                  members.length!=0 && members.map((member)=>(
                    <option key={member._id} value={member.username}  className='bg-white'>{member.username}</option>
                  ))
                }
          </select>
          <input  onChange={(e)=>setform({...form,
            planname:e.target.value
          })} className='w-full p-2 border  text-black border-black rounded' type='text' 
          placeholder='Plan Name' required>
          </input>
          <input onChange={(e)=>setform({...form,
            goal:e.target.value
          })} className='w-full p-2 border text-black border-black  rounded' type='text'
          placeholder='Goal (e.g., Muscle Gain)'>
          </input>
          <div className='flex gap-x-2'>
              {days.map(day=>(
                <button key={day} onClick={()=>addDay(day)} type='button' className='bg-blue-500 text-white px-3 py-1 rounded'>+ {day}</button>
              ))}
          </div>
          {
            form.workouts.map((day,dayindex)=>(
              <div key={day.day} className='bg-blue-200 p-4 rounded shadow mt-4'>
                  <h3 className='text-lg font-semibold mb-2'>{day.day}</h3>
                  {
                    day.exercises.map((ex,exIndex)=>(
                      <div key={exIndex} className='grid grid-cols-3 gap-2 mb-2'>
                        <input type='text' placeholder='Exercise' className='p-2 border rounded' value={ex.name} 
                        onChange={(e)=>handleExerciseChange(dayindex,exIndex,'name',e.target.value)} required/>
                        <input type='number' placeholder='Sets' className='p-2 border rounded' value={ex.sets}
                        onChange={(e)=>handleExerciseChange(dayindex,exIndex,'sets',e.target.value)} required/>
                        <input type='number' placeholder='Reps' className='p-2 border rounded' value={ex.reps}
                        onChange={(e)=>handleExerciseChange(dayindex,exIndex,'reps',e.target.value)} required/>
                      </div>
                    ))
                  }
                  <button type='button' onClick={()=>addExercise(dayindex)} className='text-sm text-blue-600 mt-2'>
                      + Add Exercise
                  </button>
              </div>
            ))
          }
          <div className='flex w-full justify-center'>
          <button type='submit' className='bg-blue-700  hover:bg-blue-800 text-white px-6 py-2 rounded mt-6'>
              Create Plan
          </button>
          </div>
      </form>
      </div>
      </div>
    </div>
  )
}

export default WorkoutPlan
