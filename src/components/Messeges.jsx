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
    <section className='p-2 h-[85%] md:h-[88%] lg:h-[84%] overflow-y-scroll'>
        {messages.map((msg)=>(
          <Messege msg={msg} key={msg.id} />
        ))}        
    </section>
  )
}

export default Messeges