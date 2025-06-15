import React from 'react'
import {  UserPlus, Dumbbell, LayoutDashboard ,Flame} from 'lucide-react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 shadow-lg">
      {/* Logo */}
      <div className="text-3xl font-bold px-6 py-5 border-b border-gray-700">
        <span className="text-indigo-400">Pulse</span>Pro
      </div>

      {/* Menu */}
      <nav className="mt-6 flex flex-col gap-4 px-4">
        <Link
          to="/admin/dashbaord"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/admin/dashbaord/addmember"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          <UserPlus size={20} />
          <span>Add Member</span>
        </Link>
        <Link
          to="/admin/dashbaord/trainer"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          <Dumbbell size={20} />
          <span>Add Trainer</span>
        </Link>
         <Link
          to="/admin/dashbaord/displayMember"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          <Flame size={20} />
          <span>display Members</span>
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar
