import React from 'react'
import home from "../Home/home.jpg"
import home2 from "../Home/home2.jpg"
import home3 from "../Home/home3.jpg"
const Home = () => {
  return (
    <div className='flex-col bg-gray-900  w-full'>
        <div className='flex-row'>
            <img  className="w-full h-170" src={home}/>
        </div>
        <div className='flex w-full justify-center'>
                <p className='font-mono text-3xl font-bold mt-10 mb-10 text-white'><span className='text-blue-400'>Pulse</span>Pro</p>
        </div>
        <div className='flex w-full gap-10'>
                <img src={home2} className=' ml-8 w-1/2 rounded-2xl mb-5'></img>
                
                    <p className='w-1/2 mt-10 mr-10 text-amber-50  font-mono'>PulsePro Gym Management System is an all-in-one solution designed to streamline and automate fitness center operations. Built with modern technology, PulsePro offers an intuitive interface for managing memberships, scheduling classes, handling billing, and tracking attendance. The system includes powerful features such as inventory and supplier management, employee oversight, customer engagement tools, and a comprehensive loyalty program.

Whether you're running a boutique studio or a large fitness chain, PulsePro empowers gym owners and staff to deliver exceptional service, improve operational efficiency, and grow their business with data-driven insights. With PulsePro, managing your gym has never been easier, faster, or more effective.</p>
                
        </div>
        <div className='flex w-full gap-10'>
            <p className='w-1/2 ml-8 mt-40 mb-50 text-amber-50 font-mono'>PulsePro is a comprehensive gym management platform built to optimize the day-to-day operations of fitness centers. From member registration and automated billing to inventory tracking and staff management, PulsePro centralizes all essential functions into one powerful dashboard. Designed for scalability and ease of use, it's the perfect tool for gym owners looking to reduce manual workload and enhance business growth.</p>
            <img src={home3} className='w-1/2 mt-20 rounded-2xl mb-40 mr-10'></img>
        </div>
    </div>
  )
}

export default Home
