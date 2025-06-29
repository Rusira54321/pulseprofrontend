import React from 'react'
import { Link } from 'react-router-dom';
import { LayoutDashboard,Flame,Dumbbell,Apple} from 'lucide-react';

const MemberSidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 shadow-lg">
           {/* Logo */}
           <div className="text-3xl font-bold px-6 py-5 border-b border-gray-700">
             <span className="text-indigo-400">Pulse</span>Pro
           </div>
     
           {/* Menu */}
           <nav className="mt-6 flex flex-col gap-4 px-4">
             <Link
               to="/member"
               className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
             >
               <LayoutDashboard size={20} />
               <span>Dashboard</span>
             </Link>
             <Link
               to="/member/workoutplan"
               className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
             >
               <Flame size={20} />
               <span>Workout plan</span>
             </Link>
               <Link
               to="/member/dietplan"
               className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
             >
               <Apple size={20} />
               <span>Diet plan</span>
             </Link>
             <Link
               to="/member/classes"
               className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
             >
               <Dumbbell size={20} />
               <span>Classes</span>
             </Link>            
            </nav>
         </div>
  )
}

export default MemberSidebar
