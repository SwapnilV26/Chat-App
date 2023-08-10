import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatSection from '../components/ChatSection'

const Home = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='flex border-black border-2 w-[70%] h-[85%] rounded-lg overflow-hidden'>
            <Sidebar />
            <ChatSection />
        </div>
    </div>
  )
}

export default Home