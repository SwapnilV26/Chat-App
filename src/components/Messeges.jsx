import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Messege from './Messege';

const Messeges = () => {
  const [messages, setMessages] = useState([]);

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
    <div className='bg-main-light p-3 h-[82.3%] overflow-y-scroll'>
        {messages.map((msg)=>(
          <Messege msg={msg} key={msg.id} />
        ))}        
    </div>
  )
}

export default Messeges