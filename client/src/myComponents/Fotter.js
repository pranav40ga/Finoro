import React from 'react'
import { Link } from 'react-router-dom'
const Fotter = () => {
  return (
    <div className='flex justify-between items-center bg-gray-200 px-3 dark:bg-gray-900 text-gray-900 dark:text-white'>
        
        <div className=' flex  flex-col font-semibold '>
            <h3>Made by Pranav ⚡</h3>
            <h5>Data provided by Finnhub</h5>
        </div>
      <div className=' flex flex-col ml-auto py-2 mx-4'>
            <h2 className='font-serif text-lg'>Team :</h2>
             <ul className="flex flex-col">
          <li>
            <Link to="/about" className="font-serif text-lg text-blue-800 dark:text-slate-200">About us</Link>
          </li>
          <li>
            <Link to="/support" className="font-serif text-lg text-blue-800 dark:text-slate-200">Support</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Fotter
