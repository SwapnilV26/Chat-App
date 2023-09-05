import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { MdDelete } from 'react-icons/md';

const Messege = ({ msg }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [msgTime, setMsgTime] = useState(""); 

  const ref = useRef();
  useEffect(() => {
    const time = msg.date.toDate().toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    setMsgTime(time);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg, msgTime])

  const handleDelete = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayRemove(msg)
    });
  }

  return (
    <>
      {
        msg.senderId === currentUser.uid ?
          <div ref={ref} className='flex flex-row-reverse gap-2 mb-3'>
            {/* user logo */}
            <div className='flex flex-col items-center text-gray-400 font-light -mt-1'>
              <img src={currentUser.photoURL} className='rounded-full w-12 h-12 border-2 object-cover' alt="" />
            </div>

            {/* msg content  */}
            <div className='flex flex-col items-end max-w-[70%] gap-3 relative group'>
              <button onClick={handleDelete} className='absolute pt-[2px] hidden group-hover:block text-gray-200 hover:text-red-500'>
                <MdDelete size={18} />
              </button>
              { msg?.file && <img src={msg?.file} className='w-[85%] lg:w-[60%] -mb-2' alt="sent file" /> }
              { msg?.text && <p className='bg-chat text-white px-5 group-hover:pr-7 py-1 rounded-lg rounded-tr-none max-w-max'>{msg.text}</p> }
              { msg?.date && <span className='text-[12px] text-gray-500 -mt-3'>{msgTime}</span> }
            </div>
          </div>
          :
          <div ref={ref} className='flex gap-2 mb-3'>
            <div className='flex flex-col items-center text-gray-400 font-light -mt-1'>
              <img src={data.user.photoURL} className='rounded-full w-12 h-12 border-2 object-cover' alt="" />
            </div>

            <div className='flex flex-col max-w-[70%] gap-3 relative group'>
              <button onClick={handleDelete} className='absolute pt-[2px] items-end hidden group-hover:block text-gray-400 hover:text-red-500'>
                <MdDelete size={18}/>
              </button>
              { msg?.file && <img src={msg.file} className='w-[85%] lg:w-[60%] -mb-2' alt="received file" /> }
              { msg?.text && <p className='bg-white px-5 group-hover:pl-7 py-1 rounded-lg rounded-tl-none max-w-max'>{msg.text}</p> }
              { msg?.date && <span className={`text-[12px] text-gray-500 ${msg?.text ? '-mt-3' : '-mt-1'}`}>{msgTime}</span> }
            </div>
          </div>
      }
    </>
  )
}

export default Messege