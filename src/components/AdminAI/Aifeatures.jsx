import React from 'react'

const Aifeatures = () => {
  return (
    <div className='flex w-full min-h-full justify-center items-center bg-gray-800'>
        
                <div className='grid grid-cols-2 gap-x-20'>
                    <a href='/AI/Admin/dietplan'>
                    <div className='flex cursor-pointer w-100 justify-center items-center bg-green-300 rounded-2xl h-72 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg animate-fade-in'>
                            <h1 className='text-black font-bold text-3xl'>Generate Diet plan</h1>
                    </div>
                    </a>
                    <a href='/AI/Admin/schedule'>
                    <div className='flex  w-100 cursor-pointer justify-center items-center bg-green-300 h-72 rounded-2xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg animate-fade-in delay-200'>
                         <h1 className='text-black font-bold text-3xl'>Generate schedule</h1>
                    </div>
                    </a>
                </div>
        
    </div>
  )
}

export default Aifeatures
