import React from 'react'
import { LayoutDashboard,Flame,Dumbbell,Activity,EarthLock,Accessibility} from 'lucide-react';
import { Link } from 'react-router-dom';

const TrainerSidebar = () => {
  return (
 <div className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 shadow-lg">
       {/* Logo */}
       <div className="text-3xl font-bold px-6 py-5 border-b border-gray-700">
         <span className="text-indigo-400">Pulse</span>Pro
       </div>
 
       {/* Menu */}
       <nav className="mt-6 flex flex-col gap-4 px-4">
         <Link
           to="/trainer/dashboard"
           className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
         >
           <LayoutDashboard size={20} />
           <span>Dashboard</span>
         </Link>
         <Link
           to="/trainer/dashboard/displaymembers"
           className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
         >
           <Flame size={20} />
           <span>Members</span>
         </Link>
           <Link
           to="/trainer/dashboard/workoutplan"
           className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
         >
           <Dumbbell size={20} />
           <span>create Workout plan</span>
         </Link>
         <Link
           to="/trainer/dashboard/dietplan"
           className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
         >
           <Dumbbell size={20} />
           <span>create Diet plan</span>
         </Link>
         <Link
           to="/trainer/dashboard/displayworkoutplan"
           className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
         >
           <Activity size={20} />
           <span>See workoutplans</span>
         </Link>
         <Link
           to="/trainer/dashboard/displayDietplan"
           className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
         >
           <Activity size={20} />
           <span>See Diet plans</span>
         </Link>
          <Link
           to="/trainer/dashboard/genai"
           className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
         >
           <EarthLock size={20} />
           <span>Generate with AI</span>
         </Link>
         <Link
           to="/trainer/dashboard/personaltrainer"
           className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
         >
           <Accessibility size={20} />
           <span>Personal training management</span>
         </Link>
        </nav>
     </div>
  )
}

export default TrainerSidebar
