import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatSection from '../components/ChatSection'

const Home = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='flex border-white border-2 w-[100%] h-[100%] md:w-[90%] md:h-[90%] md:rounded-lg overflow-hidden'>
            <Sidebar />
            <ChatSection />
        </div>
    </div>
  )
}

export default Home