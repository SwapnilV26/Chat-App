import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';

const Messege = ({ msg }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg])

  return (
    <>
      {
        msg.senderId === currentUser.uid ?
          <div ref={ref} className='flex flex-row-reverse gap-5 mb-5'>
            {/* user logo */}
            <div className='flex flex-col text-gray-400 font-light'>
              <img src={currentUser.photoURL} className='rounded-full w-12 h-12 border-2 object-cover' alt="" />
              <span>just now</span>
            </div>

            {/* msg content  */}
            <div className='flex flex-col items-end max-w-[70%] gap-3'>
              <p className='bg-chat text-white px-5 py-1 rounded-lg rounded-tr-none max-w-max'>{msg.text}</p>
              <img src={msg.img} className='w-[50%]' alt="" />
            </div>
          </div>
          :
          <div ref={ref} className='flex gap-5 mb-5'>
            <div className='flex flex-col text-gray-400 font-light'>
              <img src={data.user.photoURL} className='rounded-full w-12 h-12 border-2 object-cover' alt="" />
              <span>just now</span>
            </div>

            <div className='flex flex-col max-w-[70%] gap-3'>
              <p className='bg-white px-5 py-1 rounded-lg rounded-tl-none max-w-max'>{msg.text}</p>
              <img src={msg.img} className='w-[50%]' alt="" />
            </div>
          </div>
      }
    </>
  )
}

export default Messege