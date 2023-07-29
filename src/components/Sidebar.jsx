import React from 'react'
import Navbar from './Navbar'
import Search from './Search'

const Sidebar = () => {
  return (
    <div className='w-[35%] bg-side'>
        <Navbar />
        <Search />
    </div>
  )
}

export default Sidebar