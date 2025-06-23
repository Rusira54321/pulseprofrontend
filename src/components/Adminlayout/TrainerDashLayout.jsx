import React from 'react'
import Sidebar from "../sidebar/TrainerSidebar"
import { Outlet } from 'react-router-dom'
const TrainerDashLayout = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <main className='ml-64 w-full min-h-screen bg-gray-100'>
                <Outlet/>
        </main>
    </div>
  )
}

export default TrainerDashLayout
