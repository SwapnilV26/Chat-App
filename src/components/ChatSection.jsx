import React, { useContext } from 'react'
import {MdPersonAddAlt1} from 'react-icons/md'
import {BsCameraVideoFill} from 'react-icons/bs'
import {FiMoreHorizontal} from 'react-icons/fi'
import Messeges from './Messeges'
import MsgInput from './MsgInput'
import { ChatContext } from '../context/ChatContext'

const ChatSection = () => {
  const {data} = useContext(ChatContext);
  return (
    <div className='w-[65%]'>
      {/* Chat info  */}
      <div className='flex justify-between items-center h-14 p-3 bg-main'>
        <span className='font-medium'>{data.user?.displayName}</span>
        <div className='flex gap-3 text-xl'>
          <MdPersonAddAlt1 />
          <BsCameraVideoFill />
          <FiMoreHorizontal />
        </div>
      </div>

      <Messeges />
      <MsgInput />
    </div>
  )
}

export default ChatSection