import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import Logo from '../assets/logo.png'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='flex items-center justify-between bg-side px-3 h-14 text-gray-100'>
      <span className='font-bold text-xl'>LetsTalk</span>
      {/* <img src={Logo} width={130} alt="logo" /> */}
      <div className='flex items-center gap-2'>
        <img src={currentUser.photoURL} alt="" className='rounded-full w-9 h-9 border-2 object-cover' />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}
          className='bg-green-500 border-2 border-white text-white text-sm rounded-md py-1 px-2'>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar