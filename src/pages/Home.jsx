import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatSection from '../components/ChatSection'
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { show } = useContext(AuthContext);
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='flex border-white md:hidden border-2 w-[100%] h-[100%] md:w-[90%] md:h-[90%] md:rounded-lg overflow-hidden'>
            { show ? <Sidebar /> : <ChatSection />}
        </div>
        <div className='border-white hidden md:flex border-2 w-[100%] h-[100%] md:w-[90%] md:h-[90%] md:rounded-lg overflow-hidden'>
            <Sidebar /> 
            <ChatSection />
        </div>
    </div>
  )
}

export default Home