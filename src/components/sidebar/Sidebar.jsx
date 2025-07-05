import React from 'react';
import {
  UserPlus,
  Dumbbell,
  LayoutDashboard,
  Flame,
  ShoppingBasket,
  EarthLock,
  Contact,
  ContactRound,
  CircleDollarSign,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 shadow-lg overflow-y-auto">
      {/* Logo */}
      <div className="text-3xl font-bold px-6 py-5 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
        <span className="text-indigo-400">Pulse</span>Pro
      </div>

      {/* Menu */}
      <nav className="mt-4 flex flex-col gap-2 px-4 pb-6">
        <SidebarLink to="/admin/dashbaord" icon={<LayoutDashboard size={20} />} text="Dashboard" />
        <SidebarLink to="/admin/dashbaord/addmember" icon={<UserPlus size={20} />} text="Add Member" />
        <SidebarLink to="/admin/dashbaord/trainer" icon={<Dumbbell size={20} />} text="Add Trainer" />
        <SidebarLink to="/admin/dashbaord/displayMember" icon={<Flame size={20} />} text="Display Members" />
        <SidebarLink to="/admin/dashbaord/displaytrainer" icon={<Dumbbell size={20} />} text="Display Trainer" />
        <SidebarLink to="/admin/dashbaord/supplement" icon={<ShoppingBasket size={20} />} text="Supplements" />
        <SidebarLink to="/admin/dashbaord/AI/Admin" icon={<EarthLock size={20} />} text="Generate with AI" />
        <SidebarLink to="/admin/dashbaord/markAttendance" icon={<Contact size={20} />} text="Mark Attendance" />
        <SidebarLink to="/admin/dashbaord/seeAtendance" icon={<ContactRound size={20} />} text="Attendance Report" />
        <SidebarLink to="/admin/dashbaord/paymentplan" icon={<Dumbbell size={20} />} text="Membership" />
        <SidebarLink to="/admin/dashbaord/paymenthistory" icon={<CircleDollarSign size={20} />} text="Customer Payment History" />
        <SidebarLink to="/admin/dashbaord/seenotification" icon={<Bell size={20}/>} text="See notifications"/>
        <SidebarLink to="/admin/dashbaord/sendnotification" icon={<Bell size={20}/>} text="Send notifications"/>
      </nav>
    </div>
  );
};

const SidebarLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition text-sm md:text-base"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Sidebar;
