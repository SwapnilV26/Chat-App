import React, { useContext } from 'react'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { BsCameraVideoFill } from 'react-icons/bs'
import { FiArrowLeft, FiMoreHorizontal } from 'react-icons/fi'
import Messeges from './Messeges'
import MsgInput from './MsgInput'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import ProfilePic from '../assets/Profile Icon.png'

const ChatSection = () => {
  const { data } = useContext(ChatContext);
  const { chatWidth, setChatWidth, setSideWidth } = useContext(AuthContext);
  console.log(chatWidth);
  
  return (
    <main className={`w-[${chatWidth}] h-[100%] md:w-[60%] lg:w-[65%] bg-main-light relative`}>
      {/* Chat info  */}
      <section className='flex justify-between items-center h-14 p-3 bg-main'>
        <div className='flex items-center gap-1'>
          <button onClick={()=>{setChatWidth(0); setSideWidth('100%')}} className='md:hidden'>
            <FiArrowLeft size={22} className='text-slate-100'/>
          </button>
          <img src={data.user?.photoURL ? data.user.photoURL : ProfilePic} alt="Profile Pic" className='rounded-full w-9 h-9 object-cover' />
          <span className='font-medium text-white text-lg'>{data.user?.displayName}</span>
        </div>
        <div className='flex gap-3 text-xl'>
          <MdPersonAddAlt1 className='text-slate-100' />
          <BsCameraVideoFill className='text-slate-100' />
          <FiMoreHorizontal className='text-slate-100' />
        </div>
      </section>

      <Messeges />
      <MsgInput />
    </main>
  )
}

export default ChatSection