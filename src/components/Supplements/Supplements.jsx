
import { Link } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion';

const Supplements = () => {
  return (
    <div className='flex w-full min-h-full justify-center items-center bg-gray-800'>
        
                <div className='grid grid-cols-2 gap-x-20'>
                    <a href='/addsuplliment'>
                    <motion.div initial={{ y: -700, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }} className='flex cursor-pointer w-100 justify-center items-center bg-green-300 rounded-2xl h-72 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg animate-fade-in'>
                            <h1 className='text-black font-bold text-3xl'>Add Supplements</h1>
                    </motion.div>
                    </a>
                    <a href='/displaysuplliment'>
                    <motion.div initial={{ y: -700, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }} className='flex  w-100 cursor-pointer justify-center items-center bg-green-300 h-72 rounded-2xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg animate-fade-in delay-200'>
                         <h1 className='text-black font-bold text-3xl'>Display Supplements</h1>
                    </motion.div>
                    </a>
                </div>
        
    </div>
  )
}

export default Supplements
