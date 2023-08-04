import React from 'react'
import {IoMdAttach} from 'react-icons/io'
import {BiImageAdd} from 'react-icons/bi'

const MsgInput = () => {
  return (
    <div className='bg-white h-14 p-3 flex justify-between items-center'>
      <input type="text" placeholder='Type something...' className='w-full mr-5 outline-none' />
      <div className='flex gap-3 items-center'>
        <IoMdAttach className='text-xl text-gray-500' />
        <input type="file" name="" id="file" className='hidden' />
        <label htmlFor="file">
          <BiImageAdd className='text-2xl text-gray-500 cursor-pointer' />
        </label>
        <button type="button" className='bg-red-500 px-3 py-1 rounded'>Send</button>
      </div>
    </div>
  )
}

export default MsgInput;