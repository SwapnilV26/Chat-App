import React from 'react'

const Messege = () => {
  return (
    <>
      <div className='flex gap-5 mb-5'>
        {/* msg info */}
        <div className='flex flex-col text-gray-400 font-light'>
          <img src="https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=600" className='rounded-full w-12 h-12 border-2 object-cover' alt="" />
          <span>just now</span>
        </div>

        {/* msg content  */}
        <div className='flex flex-col max-w-[80%] gap-3'>
          <p className='bg-white px-5 py-2 rounded-lg rounded-tl-none max-w-max'>hello</p>
          <img src="https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=600" className='w-[50%]' alt="" />
        </div>
      </div>
      
      <div className='flex flex-row-reverse gap-5 mb-5'>
        {/* msg info */}
        <div className='flex flex-col text-gray-400 font-light'>
          <img src="https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=600" className='rounded-full w-12 h-12 border-2 object-cover' alt="" />
          <span>just now</span>
        </div>

        {/* msg content  */}
        <div className='flex flex-col items-end max-w-[80%] gap-3'>
          <p className='bg-main px-5 py-2 rounded-lg rounded-tr-none max-w-max'>hello</p>
          <img src="https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=600" className='w-[50%]' alt="" />
        </div>
      </div>
    </>
  )
}

export default Messege