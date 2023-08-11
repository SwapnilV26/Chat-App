import React, { useContext } from 'react'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { BsCameraVideoFill } from 'react-icons/bs'
import { FiMoreHorizontal } from 'react-icons/fi'
import Messeges from './Messeges'
import MsgInput from './MsgInput'
import { ChatContext } from '../context/ChatContext'

const ChatSection = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className='w-[65%]'>
      {/* Chat info  */}
      <div className='flex justify-between items-center h-14 p-3 bg-main'>
        <div className='flex items-center gap-1'>
          <img src={data.user?.photoURL} alt="Profile Pic" className='rounded-full w-9 h-9 object-cover' />
          <span className='font-medium text-white text-lg'>{data.user?.displayName}</span>
        </div>
        <div className='flex gap-3 text-xl'>
          <MdPersonAddAlt1 className='text-slate-100' />
          <BsCameraVideoFill className='text-slate-100' />
          <FiMoreHorizontal className='text-slate-100' />
        </div>
      </div>

      <Messeges />
      <MsgInput />
    </div>
  )
}

export default ChatSection