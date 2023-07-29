import React from 'react'
import {BsSearch} from 'react-icons/bs'

const Search = () => {
  return (
    <div className='border-b-2'>
      {/* searchForm */}
      <div className="m-3 relative bg-transparent opacity-75 rounded-md">
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <BsSearch className='text-gray-400' />
        </div> 
        <input type="text" placeholder='Find a user' className='placeholder:text-gray-400 rounded p-1.5 outline-none pl-10 w-full text-sm' />
      </div>
      {/* userChat */}
      <div className="flex items-center gap-2 text-white pl-3 py-1.5 cursor-pointer hover:bg-side-dark">
        <img src="https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=600" className='rounded-full w-12 h-12 border-2 object-cover' alt="" />
        <div>
          <span>Swapnil</span>
        </div>
      </div>
    </div>
  )
}

export default Search