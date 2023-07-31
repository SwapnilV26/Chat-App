import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatSection from '../components/ChatSection'

const Home = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-slate-300'>
        <div className='flex border-white border-2 w-[70%] h-[85%] rounded-lg overflow-hidden'>
            <Sidebar />
            <ChatSection />
        </div>
    </div>
  )
}

export default Home