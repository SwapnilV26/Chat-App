import React from 'react'
import Logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between bg-side-dark px-3 h-14 text-gray-100'>
      <span className='font-bold text-xl'>LetsTalk</span>
      <div className='flex items-center gap-2'>
        <img src="https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='rounded-full w-9 h-9 border-2 object-cover' />
        <span>Swapnil</span>
        <button className='bg-slate-300 text-gray-900 text-sm rounded-md py-1 px-2'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar