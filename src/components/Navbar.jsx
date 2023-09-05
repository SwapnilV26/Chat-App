import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import ProfilePic from '../assets/Profile Icon.png'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='flex items-center justify-between bg-side px-3.5 h-14 text-gray-100'>
      <span className='font-bold text-xl'>LetsTalk</span>
      <div className='flex items-center gap-2 md:ml-2'>
        <img src={currentUser?.photoURL ? currentUser.photoURL : ProfilePic} alt="Profile Pic" className='rounded-full w-9 h-9 border-2 object-cover' />
        <span className='font-medium text-white -ml-1 truncate w-20 lg:w-auto'>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}
          className='bg-red-500 border-2 border-white text-white text-sm rounded-md py-1 px-2'>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar