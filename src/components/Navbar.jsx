import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <div className='flex items-center justify-between bg-side-dark px-3 h-14 text-gray-100'>
      <span className='font-bold text-xl'>LetsTalk</span>
      <div className='flex items-center gap-2'>
        <img src={currentUser.photoURL} alt="" className='rounded-full w-9 h-9 border-2 object-cover' />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)} className='bg-slate-300 text-gray-900 text-sm rounded-md py-1 px-2'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar