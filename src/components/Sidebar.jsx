import React, { useContext } from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import { AuthContext } from '../context/AuthContext'

const Sidebar = () => {
  const { sideWidth } = useContext(AuthContext);
  console.log(sideWidth)

  return (
    <div className={`w-[${sideWidth}] md:w-[40%] lg:w-[35%] bg-white md:border-r-2`}>
        <Navbar />
        <Search />
        <Chats />
    </div>
  )
}

export default Sidebar