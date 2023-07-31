import React from 'react'

const Chats = () => {
  return (
    <>
      <div className="flex items-center gap-2 text-white pl-3 py-1.5 cursor-pointer hover:bg-side-dark">
        <img src="https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=600" className='rounded-full w-12 h-12 border-2 object-cover' alt="" />
        <div>
          <span className='text-lg font-medium'>Swapnil</span>
          <p className='text-sm text-gray-900'>Hello, how r u ?</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-white pl-3 py-1.5 cursor-pointer hover:bg-side-dark">
        <img src="https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=600" className='rounded-full w-12 h-12 border-2 object-cover' alt="" />
        <div>
          <span className='text-lg font-medium'>Swapnil</span>
          <p className='text-sm text-gray-900'>Hello, how r u ?</p>
        </div>
      </div>
    </>
  )
}

export default Chats