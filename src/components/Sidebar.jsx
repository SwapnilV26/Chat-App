import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
  return (
    <div className={`w-[100%] md:w-[40%] lg:w-[35%] bg-white md:border-r-2`}>
        <Navbar />
        <Search />
        <Chats />
    </div>
  )
}

export default Sidebar