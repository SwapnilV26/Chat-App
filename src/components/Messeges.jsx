import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Messeges = () => {
  const [messages, setMessages] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages);
    })

    return ()=>{  //callback function
      unSub()
    }; 
  }, [data.chatId]);

  return (
    <div className='bg-sky-100 p-3 h-[82.3%] overflow-y-scroll'>
        {messages.map((msg)=>(
          <>
          {
            msg.senderId === currentUser.uid ?
              <div className='flex flex-row-reverse gap-5 mb-5'>
                {/* user logo */}
                <div className='flex flex-col text-gray-400 font-light'>
                  <img src={currentUser.photoURL} className='rounded-full w-12 h-12 border-2 object-cover' alt="" />
                  <span>just now</span>
                </div>
    
                {/* msg content  */}
                <div className='flex flex-col items-end max-w-[70%] gap-3'>
                  <p className='bg-main px-5 py-2 rounded-lg rounded-tr-none max-w-max'>{msg.text}</p>
                  <img src={msg.img} className='w-[50%]' alt="" />
                </div>
              </div>
            :
              <div className='flex gap-5 mb-5'>
                <div className='flex flex-col text-gray-400 font-light'>
                  <img src={data.user.photoURL}
                    className='rounded-full w-12 h-12 border-2 object-cover' alt="" />
                  <span>just now</span>
                </div>
    
                <div className='flex flex-col max-w-[70%] gap-3'>
                  <p className='bg-white px-5 py-2 rounded-lg rounded-tl-none max-w-max'>{msg.text}</p>
                  <img src={msg.img} className='w-[50%]' alt="" />
                </div>
              </div>
          }
          </>
        ))}        
    </div>
  )
}

export default Messeges