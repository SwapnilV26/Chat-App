import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
  return (
    <div className='w-[35%] bg-white border-r-2'>
        <Navbar />
        <Search />
        <Chats />
    </div>
  )
}

export default Sidebar